/* eslint-disable linebreak-style */
import baseDatos from '../../../database';

export default async function actualizarServicio(req: any, res: any) {
  const { usuario } = req;
  try {
    const servicioActualizado = await baseDatos
      .almacenamientoServicioGeneral.actualizarServicioGeneral({
        id: req.params.idServicio,
        idUsuario: usuario.id,
        entidadReceptora: req.body.entidadReceptora,
        receptor: req.body.receptor,
        programa: req.body.programa,
        objetivosDelPrograma: req.body.objetivosDelPrograma,
        fechaInicio: req.body.fechaInicio,
        fechaFin: req.body.fechaFin,
        horarioHoraInicio: req.body.horarioHoraInicio,
        horarioHoraFin: req.body.horarioHoraFin,
      });
    return res.status(201).send(servicioActualizado);
  } catch (err) {
    return res.status(404).send(err);
  }
}
