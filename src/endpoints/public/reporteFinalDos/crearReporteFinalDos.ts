/* eslint-disable linebreak-style */
import database from '../../../database';

export default async function crearReporteFinalDos(req: any, res: any) {
  try {
    const nuevoReporteFinalDos = await database
      .almacenamientoReporteFinalDos.crearReporteFinalDos({
        idServicio: req.body.idServicio,
        metaAlcanzada: req.body.metaAlcanzada,
        metodologiaUtilizada: req.body.metodologiaUtilizada,
        innovacionAportada: req.body.innovacionAportada,
        conclusiones: req.body.conclusiones,
        propuestas: req.body.propuestas,
        actividadesRealizadas: [],
        atencionesRealizadas: [],
      });
    return res.status(201).send(nuevoReporteFinalDos);
  } catch (err) {
    return res.status(404).send(err);
  }
}
