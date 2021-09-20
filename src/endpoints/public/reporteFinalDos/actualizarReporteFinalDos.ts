/* eslint-disable linebreak-style */
import baseDatos from '../../../database';

export default async function actualizarReporteFinalDos(req: any, res: any) {
  try {
    const reporteFinalDosActualizado = await baseDatos
      .almacenamientoReporteFinalDos.actualizarReporteFinalDos({
        id: req.body.id,
        idServicio: req.body.idServicio,
        metaAlcanzada: req.body.metaAlcanzada,
        metodologiaUtilizada: req.body.metodologiaUtilizada,
        innovacionAportada: req.body.innovacionAportada,
        conclusiones: req.body.conclusiones,
        propuestas: req.body.propuestas,
        actividadesRealizadas: [],
        atencionesRealizadas: [],
      });
    return res.status(201).send(reporteFinalDosActualizado);
  } catch (err) {
    return res.status(404).send(err);
  }
}
