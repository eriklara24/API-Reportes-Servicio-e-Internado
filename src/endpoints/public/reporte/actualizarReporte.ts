/* eslint-disable linebreak-style */
/* eslint-disable no-await-in-loop */
/* eslint-disable max-len */
import baseDatos from '../../../database';
import ActividadesDeUsuario from '../../../resources/interfaces/ActividadesDeUsuario';
import ActividadesRealizadas from '../../../resources/interfaces/ActividadesRealizadas';
import AtencionesRealizadas from '../../../resources/interfaces/AtencionesRealizadas';
import ReporteParcial from '../../../resources/interfaces/ReporteParcial';

function obtenerFecha(): string {
  const fecha = new Date();
  const dia = (`0${fecha.getDate()}`).slice(-2);
  const mes = (`0${fecha.getMonth() + 1}`).slice(-2);
  const anio = fecha.getFullYear();

  return `${anio}-${mes}-${dia}`;
}

export default async function actualizarReporte(req: any, res: any) {
  let idUsuario = 0;
  let idServicio = 0;
  let actividadesDeUsuario: any[] = [];
  let atencionesRealizadas: any[] = [];
  let numeroReporte = 0;
  let horasRealizadas = 0;
  let nuevoReporte: ReporteParcial;

  // 1.- Obtener los datos del body
  try {
    idUsuario = req.body.idUsuario;
    idServicio = req.body.idServicio;
    actividadesDeUsuario = req.body.actividadesUsuario;
    atencionesRealizadas = req.body.atencionesRealizadas;
    horasRealizadas = req.body.horasRealizadas;
    numeroReporte = req.params.numeroReporte;
    if (numeroReporte < 1 || numeroReporte > 4) {
      return res.status(404).send({ code: 'Error: número de reporte no válido' });
    }
  } catch (err) {
    return res.status(400).send({ code: 'Error: datos enviados no son válidos' });
  }

  // 2.- Validar que exista el servicio
  try {
    if (!await baseDatos.almacenamientoServicioGeneral.obtenerPorIdUsuario(idUsuario)) {
      return res.status(404).send({ code: 'Error: datos generales de servicio no creados' });
    }
  } catch (err) {
    return res.status(500).send({ code: 'Error de base de datos' });
  }

  // 3.- Actualizar fecha del reporte
  try {
    const reportes = await baseDatos.almacenamientoReporteParcial.obtenerPorIdUsuario(idUsuario);
    if (reportes.length < numeroReporte) {
      return res.status(404).send({ code: 'Error: reporte no creado' });
    }
    nuevoReporte = reportes[numeroReporte - 1];
    const auxReporte: ReporteParcial = {
      id: nuevoReporte.id,
      idServicio: nuevoReporte.idServicio,
      idTrimestre: nuevoReporte.idTrimestre,
      actualizado: obtenerFecha(),
      horasRealizadas,
      actividadesRealizadas: [],
      atencionesRealizadas: [],
    };
    nuevoReporte = await baseDatos.almacenamientoReporteParcial.actualizarReporteParcial(auxReporte);
  } catch (err) {
    return res.status(500).send({ code: 'Error de base de datos' });
  }

  // 5.- Eliminar actividades realizadas y atenciones realizadas anteriores
  try {
    const auxActividadesRealizadas = await baseDatos.almacenamientoActividadRealizada
      .obtenerPorIDReporte(nuevoReporte.id);
    const auxAtencionesRealizadas = await baseDatos.almacenamientoAtencionRealizada
      .obtenerPorIdReporte(nuevoReporte.id);
    for (let i = 0; i < auxActividadesRealizadas.length; i += 1) {
      await baseDatos.almacenamientoActividadRealizada // dummy se necesita para la promesa
        .eliminarActividadRealizada(auxActividadesRealizadas[i].id);
    }
    for (let i = 0; i < auxAtencionesRealizadas.length; i += 1) {
      await baseDatos.almacenamientoAtencionRealizada // dummy se necesita para la promesa
        .eliminarAtencionRealizada(auxAtencionesRealizadas[i].id);
    }
  } catch (err) {
    return res.status(500).send({ code: 'Error de base de datos' });
  }

  // 6.- Insertar nuevas atenciones realizadas y nuevas actividades realizadas
  try {
    const idNuevoReporte = nuevoReporte.id;
    for (let i = 0; i < atencionesRealizadas.length; i += 1) {
      const nuevaAtencion: AtencionesRealizadas = {
        id: 0,
        idReporteParcial: idNuevoReporte,
        idUsuario,
        tipo: i,
        cantidad: atencionesRealizadas[i].cantidad,
      };
      await baseDatos.almacenamientoAtencionRealizada
        .crearAtencionRealizada(nuevaAtencion); // Se almacena por cuestión de la promesa, aunque no se vuelve a usuar.
    }
  } catch (err) {
    return res.status(500).send({ code: 'Error de base de datos' });
  }

  try {
    for (let i = 0; i < actividadesDeUsuario.length; i += 1) {
      let idActividadDeUsuario = 0;
      if (actividadesDeUsuario[i].id !== 0) { // ya existe, solo crear realizadas
        idActividadDeUsuario = actividadesDeUsuario[i].id;
      } else { // si no existe
        const nuevaActividad: ActividadesDeUsuario = {
          id: 0, // id dummy
          idServicio,
          descripcion: actividadesDeUsuario[i].descripcion,
        };
        const actividadCreada = await baseDatos.almacenamientoActividadDeUsuario
          .crearActividadDeUsuario(nuevaActividad);
        idActividadDeUsuario = actividadCreada.id;
      }
      let nuevaRealizada: ActividadesRealizadas = {
        id: 0,
        idActividad: idActividadDeUsuario,
        idReporteParcial: nuevoReporte.id,
        cantidad: actividadesDeUsuario[i].cantidad,
      };
      nuevaRealizada = await baseDatos.almacenamientoActividadRealizada
        .crearActividadRealizada(nuevaRealizada);
    }
  } catch (err) {
    return res.status(500).send({ code: 'Error de base de datos' });
  }
  return res.status(201).send({ code: 'Reporte actualizado con éxito' });
}
