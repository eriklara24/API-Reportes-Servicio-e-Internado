/* eslint-disable linebreak-style */
import database from '../../../database';
import Usuario from '../../../resources/entities/Usuario';
import ActividadesRealizadas from '../../../resources/interfaces/ActividadesRealizadas';
import AtencionesRealizadas from '../../../resources/interfaces/AtencionesRealizadas';
import ReporteParcial from '../../../resources/interfaces/ReporteParcial';

export default async function obtenerPorID(req: any, res: any) {
  const { id, rol } = req.body;

  const datosGeneralesReporteParcial = await database
    .almacenamientoReporteParcial.obtenerReporteParcial(id);

  const actividadesRealizadas: ActividadesRealizadas[] = await database
    .almacenamientoActividadRealizada.obtenerPorIDReporte(id);

  const atencionesRealizadas: AtencionesRealizadas[] = await database
    .almacenamientoAtencionRealizada.obtenerPorIDReporte(id);

  const reporte: ReporteParcial = {
    id: datosGeneralesReporteParcial.id,
    idServicio: datosGeneralesReporteParcial.idServicio,
    idTrimestre: datosGeneralesReporteParcial.idTrimestre,
    actualizado: datosGeneralesReporteParcial.actualizado,
    actividadesRealizadas,
    atencionesRealizadas,
  };

  return res.status(201).send({ reporte });
}
