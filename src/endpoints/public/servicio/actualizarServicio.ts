/* eslint-disable linebreak-style */
import database from '../../../database';

export default async function actualizarServicio(req: any, res: any) {
  try {
    const servicioActualizado = await database
      .almacenamientoServicioGeneral.actualizarServicioGeneral({
        id: req.body.id,
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
    return res.status(201).send(servicioActualizado);
  } catch (err) {
    return res.status(404).send(err);
  }
}
