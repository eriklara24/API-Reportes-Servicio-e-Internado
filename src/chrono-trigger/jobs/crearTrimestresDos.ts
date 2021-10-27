/* Trabajo Crear Trimestres Dos
 * Este trabajo permite crear todos los 4 trimestres que corresponden
 * al periodo de servicio 2, de manera automática cada primero de agosto.
 *
 * Escrito por Ramón Paredes Sánchez.
 */

import database from '../../database';
import _CronJob from '../../resources/interfaces/CronJob';
import Trimestre from '../../resources/interfaces/Trimestre';

function obtenerAnio(): number {
  const fecha = new Date();
  return fecha.getFullYear();
}

async function crearTrimestres() {
  try {
    const anio = obtenerAnio();
    const anio2 = anio + 1;
    // Crear trimestre 1
    const trimestreUno: Trimestre = {
      id: 0, // dummy
      fechaInicio: `${anio}-08-01`,
      fechaFin: `${anio}-10-31`,
    };
    await database.almacenamientoTrimestre.crearTrimestre(trimestreUno);
    // Crear trimestre 2
    const trimestreDos: Trimestre = {
      id: 0, // dummy
      fechaInicio: `${anio}-11-01`,
      fechaFin: `${anio2}-01-31`,
    };
    await database.almacenamientoTrimestre.crearTrimestre(trimestreDos);
    // Crear trimestre 3
    const trimestreTres: Trimestre = {
      id: 0, // dummy
      fechaInicio: `${anio2}-02-01`,
      fechaFin: `${anio2}-04-30`,
    };
    await database.almacenamientoTrimestre.crearTrimestre(trimestreTres);
    // Crear trimestre 4
    const trimestreCuatro: Trimestre = {
      id: 0, // dummy
      fechaInicio: `${anio2}-05-01`,
      fechaFin: `${anio2}-07-31`,
    };
    await database.almacenamientoTrimestre.crearTrimestre(trimestreCuatro);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log('ERROR: TAREA NO COMPLETADA, NO SE PUDIERON CREAR LOS TRIMESTRES.');
    throw err;
  }
}

const cronJob: _CronJob = {
  cron: '* 0 1 8 *', // cualquier minuto de la hora 0, del día 1 del mes 8 de cualquier año
  job: () => {
    crearTrimestres();
  },
};

export default cronJob;
