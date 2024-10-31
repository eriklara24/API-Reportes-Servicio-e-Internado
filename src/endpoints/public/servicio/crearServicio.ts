/* eslint-disable linebreak-style */
import baseDatos from '../../../database';

export default async function crearServicio(req: any, res: any) {
  const { usuario } = req;

  try {
    if (!await baseDatos.almacenamientoServicioGeneral.obtenerPorIdUsuario(usuario.id)) {
      const nuevoServicio = await baseDatos.almacenamientoServicioGeneral.crearServicioGeneral({
        id: 0,
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

      return res.status(201).send(nuevoServicio);
    }

    return res.status(400).send({ codigo: 'SERVICIO_YA_EXISTE' });
  } catch (err) {
    if (err.errno === 1366) {
      return res.status(404).send({ codigo: 'DATOS_INVALIDOS' });
    }

    return res.status(404).send(err);
  }
}
