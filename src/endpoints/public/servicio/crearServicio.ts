/* eslint-disable linebreak-style */
import database from '../../../database';

export default async function crearServicio(req: any, res: any) {
  try {
    const nuevoServicio = await database.almacenamientoServicioGeneral.crearServicioGeneral({
      id: 0,
      idUsuario: req.body.idUsuario,
      entidadReceptora: req.body.entidadReceptora,
      receptor: req.body.receptor,
      programa: req.body.programa,
      objetivosDelPrograma: req.body.objetivosDelPrograma,
      fechaInicio: req.body.fechaInicio,
      fechaFin: req.body.fechaFin,
      totalDeHoras: req.body.totalDeHoras,
      horarioHoraInicio: req.body.horarioHoraInicio,
      horarioHoraFin: req.body.horarioHoraFin,
    });
    return res.status(201).send(nuevoServicio);
  } catch (err) {
    return res.status(404).send(err);
  }
}