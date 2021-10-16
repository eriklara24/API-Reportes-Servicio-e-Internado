/* eslint-disable linebreak-style */
import baseDatos from '../../../database';

export default async function actualizarServicio(req: any, res: any) {
  try {
    const servicioActualizado = await baseDatos
      .almacenamientoServicioGeneral.actualizarServicioGeneral({
        id: req.params.idServicio,
        idUsuario: req.body.idUsuario,
        entidadReceptora: req.body.entidadReceptora,
        receptor: req.body.receptor,
        programa: req.body.programa,
        objetivosDelPrograma: req.body.objetivosDelPrograma,
        fechaInicio: req.body.fechaInicio,
        fechaFin: req.body.fechaFin,
        totalDeHoras: 0,
        horarioHoraInicio: req.body.horarioHoraInicio,
        horarioHoraFin: req.body.horarioHoraFin,
      });
    return res.status(201).send(servicioActualizado);
  } catch (err) {
    return res.status(404).send(err);
  }
}
