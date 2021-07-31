/* eslint-disable no-await-in-loop */
/* eslint-disable linebreak-style */
/* eslint-disable max-len */
/* Archivo y función para crear un nuevo reporte para un usuario/servicio */

import database from '../../../database';
import ItemNotFound from '../../../database/errors/ItemNotFound';
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
  let actividades: ActividadesDeUsuario[] = [];
  let realizadas: ActividadesRealizadas[] = [];
  let atenciones: AtencionesRealizadas[] = [];
  let servicio: ServicioEInternado;
  let trimestres: Trimestre[] = [];
  let reportes: ReporteParcial[] = [];
  let nuevoReporte: ReporteParcial;

  // 1.- Obtener los datos del body
  try {
    idUsuario = 218745599; // Hasta saber que hacer con las sesiones, esto queda hardcodeado.
    actividades = req.body.actividadesDeUsuario; // Si se mandan n actividades
    realizadas = req.body.actividadesRealizadas; // Tiene que haber n realizadas.
    atenciones = req.body.atencionesRealizadas;
    if (actividades.length !== realizadas.length) {
      return res.status(400).send({ code: 'Error: datos enviados no son válidos' });
    }
  } catch (err) {
    return res.status(400).send({ code: 'Error: datos enviados no son válidos' });
  }
  // 2.- Obtener los datos del servicio del usuario.
  try {
    servicio = await database.almacenamientoServicioGeneral.obtenerPorIdUsuario(idUsuario);
  } catch (err) {
    if (err instanceof ItemNotFound) {
      return res.status(404).send({ code: 'Error: datos generales de servicio no creados' });
    }
    return res.status(500).send({ code: 'Error de base de datos' });
  }
  // 3.- Obtener los trimestres de este servicio
  try {
    trimestres = await database.almacenamientoTrimestre
      .obtenerPorFechas(servicio.fechaInicio, servicio.fechaFin);
    if (trimestres.length < 4) {
      return res.status(500).send({ code: 'Error: trimestres para este servicio no creados.' });
    }
  } catch (err) {
    return res.status(500).send({ code: 'Error de base de datos' });
  }
  // 4.- Obtener los reportes ya creados y crear el nuevo reporte.
  try {
    reportes = await database.almacenamientoReporteParcial.obtenerPorIdUsuario(idUsuario);
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
    nuevoReporte = await database.almacenamientoReporteParcial.crearReporteParcial(nuevoReporte);
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
      nuevaAtencion = await database.almacenamientoAtencionRealizada
        .crearAtencionRealizada(nuevaAtencion); // Se almacena por cuestión de la promesa, aunque no se vuelve a usuar.
    });
  } catch (err) {
    return res.status(500).send({ code: 'Error de base de datos' });
  }
  // 6.- Guardar actividades de usuario y actividades realizadas con los datos en variables.
  try {
    for (let i = 0; i < actividades.length; i += 1) {
      const auxActividad = await database.almacenamientoActividadDeUsuario
        .obtenerPorDescripcion(actividades[i].descripcion);
      if (auxActividad instanceof ItemNotFound) { // si la actividad no existe ya
        let nuevaActividad: ActividadesDeUsuario = {
          id: 0, // id dummy
          idServicio: servicio.id,
          descripcion: actividades[i].descripcion,
        };
        nuevaActividad = await database.almacenamientoActividadDeUsuario
          .crearActividadDeUsuario(nuevaActividad);
        let nuevaRealizada: ActividadesRealizadas = {
          id: 0, // id dummy, similar a casos superiores.
          idActividad: nuevaActividad.id,
          idReporteParcial: nuevoReporte.id,
          cantidad: realizadas[i].cantidad,
        };
        nuevaRealizada = await database.almacenamientoActividadRealizada
          .crearActividadRealizada(nuevaRealizada);
      } else { // si existe
        let nuevaRealizada: ActividadesRealizadas = {
          id: 0, // id dummy, similar a casos superiores.
          idActividad: auxActividad.id,
          idReporteParcial: nuevoReporte.id,
          cantidad: realizadas[i].cantidad,
        };
        nuevaRealizada = await database.almacenamientoActividadRealizada
          .crearActividadRealizada(nuevaRealizada);
      }
    }
  } catch (err) {
    return res.status(500).send({ code: 'Error de base de datos' });
  }
  return res.status(201).send({ code: 'Reporte creado con éxito' });
}
