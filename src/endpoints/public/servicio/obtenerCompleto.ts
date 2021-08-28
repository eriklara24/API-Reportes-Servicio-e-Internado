/* eslint-disable max-len */
/* Archivo y función para obtener todos los datos de un servicio completo
 * Incluye llamadas a métodos que permiten obtener todos los datos con relación a
 * un servicio social y una función a ser exportada para llamarse desde un endpoint de la
 * API.
 * Escrito por Ramón Paredes Sánchez.
 */
import database from '../../../database';
import ItemNotFound from '../../../database/errors/ItemNotFound';
import Servicio from '../../../resources/entities/Servicio';

export default async function obtenerCompleto(req: any, res: any) {
  const { usuarioId } = req.params;
  try {
    const generales = await database.almacenamientoServicioGeneral.obtenerPorIdUsuario(usuarioId);
    const parciales = await database.almacenamientoReporteParcial.obtenerPorIdUsuario(usuarioId);
    const final = await database.almacenamientoReporteFinalDos.obtenerPorIdUsuario(usuarioId);
    const actividades = await database.almacenamientoActividadDeUsuario.obtenerPorIdUsuario(usuarioId);
    const servicio = new Servicio(
      generales.id,
      generales.idUsuario,
      generales.entidadReceptora,
      generales.receptor,
      generales.programa,
      generales.objetivosDelPrograma,
      generales.fechaInicio,
      generales.fechaFin,
      generales.totalDeHoras,
      generales.horarioHoraInicio,
      generales.horarioHoraFin,
      parciales,
      final,
      actividades,
    );
    return res.status(200).send(servicio);
  } catch (err) {
    if (err instanceof ItemNotFound) {
      return res.status(404).send({ code: 'Servicio no encontrado' });
    }
    return res.status(500).send({ code: 'Error de base de datos' });
  }
}
