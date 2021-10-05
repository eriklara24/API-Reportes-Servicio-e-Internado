/* eslint-disable linebreak-style */
import baseDatos from '../../../database';
import ReporteParcial from '../../../resources/interfaces/ReporteParcial';

export default async function crearReporteFinalDos(req: any, res: any) {
  try {
    const parciales: ReporteParcial[] = await baseDatos
      .almacenamientoReporteParcial.obtenerPorIdUsuario(req.body.idServicio);
    if (parciales.length !== 4) {
      return res.status(400).send({ code: 'Error: reportes parciales no completados' });
    }
    const nuevoReporteFinalDos = await baseDatos
      .almacenamientoReporteFinalDos.crearReporteFinalDos({
        id: 0,
        idServicio: req.body.idServicio,
        metasAlcanzadas: req.body.metasAlcanzadas,
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
