/* eslint-disable linebreak-style */
/* eslint-disable max-len */
/* Archivo y función para obtener todos los datos de un reporte por ID */
import baseDatos from '../../../database';
import ObjetoNoEncontrado from '../../../database/errors/ObjetoNoEncontrado';
import ActividadesRealizadas from '../../../resources/interfaces/ActividadesRealizadas';
import AtencionesRealizadas from '../../../resources/interfaces/AtencionesRealizadas';
import ReporteParcial from '../../../resources/interfaces/ReporteParcial';

export default async function obtenerPorID(req: any, res: any) {
  try {
    const { id } = req.params;

    // TODO: Ver que va a pasar con el rol

    const datosGeneralesReporteParcial = await baseDatos
      .almacenamientoReporteParcial.obtenerReporteParcial(id);

    const actividadesRealizadas: ActividadesRealizadas[] = await baseDatos
      .almacenamientoActividadRealizada.obtenerPorIdReporte(id);

    const atencionesRealizadas: AtencionesRealizadas[] = await baseDatos
      .almacenamientoAtencionRealizada.obtenerPorIdReporte(id);

    const reporte: ReporteParcial = {
      id: datosGeneralesReporteParcial.id,
      idServicio: datosGeneralesReporteParcial.idServicio,
      idTrimestre: datosGeneralesReporteParcial.idTrimestre,
      actualizado: datosGeneralesReporteParcial.actualizado,
      actividadesRealizadas,
      atencionesRealizadas,
    };
    return res.status(200).send({ reporte });
  } catch (err) {
    if (err instanceof ObjetoNoEncontrado) {
      return res.status(404).send({ code: 'Reporte no encontrado' });
    }
    return res.status(500).send({ code: 'Error de base de datos' });
  }
}
