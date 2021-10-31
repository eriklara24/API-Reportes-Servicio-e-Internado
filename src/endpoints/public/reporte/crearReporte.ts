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

function esFechaPosterior(fecha1: string, fecha2: string) : boolean {
  const f1 = new Date(fecha1);
  const f2 = new Date(fecha2);
  return f1 >= f2;
}

export default async function crearReporte(req: any, res: any) {
  let idUsuario = 0;
  let idServicio = 0;
  let actividadesDeUsuario: any[] = [];
  let atencionesRealizadas: any[] = [];
  let horasRealizadas = 0;
  let servicio: ServicioEInternado;
  let trimestres: Trimestre[] = [];
  let reportes: ReporteParcial[] = [];
  let nuevoReporte: ReporteParcial;

  // 1.- Obtener los datos del body
  try {
    idUsuario = req.body.idUsuario;
    idServicio = req.body.idServicio;
    actividadesDeUsuario = req.body.actividadesUsuario;
    atencionesRealizadas = req.body.atencionesRealizadas;
    horasRealizadas = req.body.horasRealizadas;
  } catch (err) {
    return res.status(400).send({ code: 'Error: datos enviados no son válidos' });
  }

  // 2.- Obtener los datos del servicio del usuario.
  try {
    servicio = await baseDatos.almacenamientoServicioGeneral.obtenerServicioGeneral(idServicio);
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
  } catch (err) {
    return res.status(500).send({ code: 'Error de base de datos' });
  }

  // 4.- Obtener los reportes ya creados y crear el nuevo reporte.
  try {
    reportes = await baseDatos.almacenamientoReporteParcial.obtenerReportesPorIdUsuario(idUsuario);
    if (reportes.length >= 4) {
      return res.status(404).send({ code: 'Error: todos los reportes ya creados.' });
    }
    if (trimestres.length < reportes.length + 1) { // No existe trimestre para este reporte
      return res.status(404).send({ code: 'Error: trimestre para este reporte no creado.' });
    }
    if (req.body.numeroReporte - 1 !== reportes.length) { // El anterior tiene que estar creado
      return res.status(404).send({ code: 'Error: El reporte anterior no ha sido creado.' });
    }
    // El reporte se debe crear en una fecha igual o posterior al fin de su trimestre
    if (!esFechaPosterior(obtenerFecha(), trimestres[reportes.length].fechaFin)) {
      return res.status(404).send({ code: 'Error: La fecha para crear el reporte no ha pasado.' });
    }
    const idTrimestre = trimestres[reportes.length].id;
    const actualizado = obtenerFecha();
    const dummy: ActividadesRealizadas[] = []; // Necesarios en la interfaz, pero no para la DB
    const dummy2: AtencionesRealizadas[] = []; // En la inserción son ignorados.
    nuevoReporte = {
      id: 0,
      idServicio,
      idTrimestre,
      actualizado,
      horasRealizadas,
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

  // 6.- Guardar actividades de usuario y actividades realizadas con los datos en variables.
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
  return res.status(201).send({ code: 'Reporte creado con éxito' });
}
