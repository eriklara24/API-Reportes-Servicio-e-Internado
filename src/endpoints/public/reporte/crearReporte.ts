/* eslint-disable linebreak-style */
/* eslint-disable no-await-in-loop */
/* eslint-disable max-len */
/* Archivo y función para crear un nuevo reporte para un usuario/servicio */

import baseDatos from '../../../database';
import ObjetoNoEncontrado from '../../../database/errors/ObjetoNoEncontrado';
import ActividadesDeUsuario from '../../../resources/interfaces/ActividadesDeUsuario';
import ActividadesRealizadas from '../../../resources/interfaces/ActividadesRealizadas';
import AtencionesRealizadas from '../../../resources/interfaces/AtencionesRealizadas';
import ServicioEInternado from '../../../resources/interfaces/ServicioEInternado';
import Trimestre from '../../../resources/interfaces/Trimestre';
import ReporteParcial from '../../../resources/interfaces/ReporteParcial';

function obtenerFecha(): string {
  const fecha = new Date();
  const dia = (`0${fecha.getDate()}`).slice(-2);
  const mes = (`0${fecha.getMonth() + 1}`).slice(-2);
  const anio = fecha.getFullYear();

  return `${anio}-${mes}-${dia}`;
}

export default async function crearReporte(req: any, res: any) {
  let idUsuario = 218745595;
  let actividades: any[] = [];
  let atenciones: AtencionesRealizadas[] = [];
  let servicio: ServicioEInternado;
  let trimestres: Trimestre[] = [];
  let reportes: ReporteParcial[] = [];
  let nuevoReporte: ReporteParcial;

  // 1.- Obtener los datos del body
  try {
    idUsuario = 218745599; // Hasta saber que hacer con las sesiones, esto queda hardcodeado.
    actividades = req.body.actividadesDeUsuario; // Si se mandan n actividades
    atenciones = req.body.atencionesRealizadas;
  } catch (err) {
    return res.status(400).send({ code: 'Error: datos enviados no son válidos' });
  }
  // 2.- Obtener los datos del servicio del usuario.
  try {
    servicio = await baseDatos.almacenamientoServicioGeneral.obtenerPorIdUsuario(idUsuario);
  } catch (err) {
    if (err instanceof ObjetoNoEncontrado) {
      return res.status(404).send({ code: 'Error: datos generales de servicio no creados' });
    }
    return res.status(500).send({ code: 'Error de base de datos' });
  }
  // 3.- Obtener los trimestres de este servicio
  try {
    trimestres = await baseDatos.almacenamientoTrimestre
      .obtenerPorFechas(servicio.fechaInicio, servicio.fechaFin);
    if (trimestres.length < 4) {
      return res.status(500).send({ code: 'Error: trimestres para este servicio no creados.' });
    }
  } catch (err) {
    return res.status(500).send({ code: 'Error de base de datos' });
  }
  // 4.- Obtener los reportes ya creados y crear el nuevo reporte.
  try {
    reportes = await baseDatos.almacenamientoReporteParcial.obtenerPorIdUsuario(idUsuario);
    if (reportes.length > 4) {
      return res.status(404).send({ code: 'Error: todos los reportes ya creados.' });
    }
    const idServicio = servicio.id;
    const idTrimestre = trimestres[reportes.length].id;
    const actualizado = obtenerFecha();
    const dummy: ActividadesRealizadas[] = []; // Necesarios en la interfaz, pero no para la DB
    const dummy2: AtencionesRealizadas[] = []; // En la inserción son ignorados.
    nuevoReporte = {
      id: 0,
      idServicio,
      idTrimestre,
      actualizado,
      actividadesRealizadas: dummy,
      atencionesRealizadas: dummy2,
    };
    nuevoReporte = await baseDatos.almacenamientoReporteParcial.crearReporteParcial(nuevoReporte);
  } catch (err) {
    return res.status(500).send({ code: 'Error de base de datos' });
  }
  // 5.- Guardar las atenciones con los datos del servicio y el nuevo reporte.
  try {
    const idNuevoReporte = nuevoReporte.id;
    atenciones.forEach(async (element) => {
      let nuevaAtencion: AtencionesRealizadas = {
        id: 0, // Un id dummy que se ignora
        idReporteParcial: idNuevoReporte,
        idUsuario,
        tipo: element.tipo,
        cantidad: element.cantidad,
      };
      // eslint-disable-next-line no-unused-vars
      nuevaAtencion = await baseDatos.almacenamientoAtencionRealizada
        .crearAtencionRealizada(nuevaAtencion); // Se almacena por cuestión de la promesa, aunque no se vuelve a usuar.
    });
  } catch (err) {
    return res.status(500).send({ code: 'Error de base de datos' });
  }
  // 6.- Guardar actividades de usuario y actividades realizadas con los datos en variables.
  try {
    for (let i = 0; i < actividades.length; i += 1) {
      const auxActividad = await baseDatos.almacenamientoActividadDeUsuario
        .obtenerPorDescripcion(actividades[i].descripcion);
      if (auxActividad instanceof ObjetoNoEncontrado) { // si la actividad no existe ya
        let nuevaActividad: ActividadesDeUsuario = {
          id: 0, // id dummy
          idServicio: servicio.id,
          descripcion: actividades[i].descripcion,
        };
        nuevaActividad = await baseDatos.almacenamientoActividadDeUsuario
          .crearActividadDeUsuario(nuevaActividad);
        let nuevaRealizada: ActividadesRealizadas = {
          id: 0, // id dummy, similar a casos superiores.
          idActividad: nuevaActividad.id,
          idReporteParcial: nuevoReporte.id,
          cantidad: actividades[i].cantidad,
        };
        nuevaRealizada = await baseDatos.almacenamientoActividadRealizada
          .crearActividadRealizada(nuevaRealizada);
      } else { // si existe
        let nuevaRealizada: ActividadesRealizadas = {
          id: 0, // id dummy, similar a casos superiores.
          idActividad: auxActividad.id,
          idReporteParcial: nuevoReporte.id,
          cantidad: actividades[i].cantidad,
        };
        nuevaRealizada = await baseDatos.almacenamientoActividadRealizada
          .crearActividadRealizada(nuevaRealizada);
      }
    }
  } catch (err) {
    return res.status(500).send({ code: 'Error de base de datos' });
  }
  return res.status(201).send({ code: 'Reporte creado con éxito' });
}
