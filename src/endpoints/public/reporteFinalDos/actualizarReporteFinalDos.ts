/* eslint-disable linebreak-style */
import baseDatos from '../../../database';

export default async function actualizarReporteFinalDos(req: any, res: any) {
  const { usuario } = req;

  try {
    const reporteFinalDosActualizado = await baseDatos
      .almacenamientoReporteFinalDos.actualizarReporteFinalDos({
        id: req.body.id,
        idServicio: usuario.idServicio,
        metasAlcanzadas: req.body.metasAlcanzadas,
        metodologiaUtilizada: req.body.metodologiaUtilizada,
        innovacionAportada: req.body.innovacionAportada,
        conclusiones: req.body.conclusiones,
        propuestas: req.body.propuestas,
      });

    return res.status(201).send(reporteFinalDosActualizado);
  } catch (err) {
    if (err.errno === 1292) {
      return res.status(404).send({ codigo: 'DATOS_INVALIDOS' });
    }

    return res.status(404).send(err);
  }
}
