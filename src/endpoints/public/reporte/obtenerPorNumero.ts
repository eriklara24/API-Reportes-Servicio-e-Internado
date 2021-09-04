/*
Archivo y función para obtener todos los datos de
un reporte por número de reporte
*/

import database from '../../../database';
import ActividadesRealizadas from '../../../resources/interfaces/ActividadesRealizadas';
import AtencionesRealizadas from '../../../resources/interfaces/AtencionesRealizadas';
import ReporteParcial from '../../../resources/interfaces/ReporteParcial';

export default async function obtenerPorNumero(req: any, res: any) {
  try {
    const { numeroReporte } = req.params;
    const idUsuario = 218745595; // Hardcodeado
    // Obtener todos los reportes de este servicio
    const reportesParciales: ReporteParcial[] = await database.almacenamientoReporteParcial
      .obtenerPorIdUsuario(idUsuario);

    // Validar que el reporte parcial que se busca exista
    if (reportesParciales.length < numeroReporte || numeroReporte < 1) {
      return res.status(404).send({ code: 'El reporte parcial no existe' });
    }

    const actividadesRealizadas: ActividadesRealizadas[] = await database
      .almacenamientoActividadRealizada
      .obtenerPorIdReporte(reportesParciales[numeroReporte - 1].id);

    const atencionesRealizadas: AtencionesRealizadas[] = await database
      .almacenamientoAtencionRealizada
      .obtenerPorIdReporte(reportesParciales[numeroReporte - 1].id);

    // Regresar el reporte armado
    const reporte: ReporteParcial = {
      id: reportesParciales[numeroReporte - 1].id,
      idServicio: reportesParciales[numeroReporte - 1].idServicio,
      idTrimestre: reportesParciales[numeroReporte - 1].idTrimestre,
      actualizado: reportesParciales[numeroReporte - 1].actualizado,
      actividadesRealizadas,
      atencionesRealizadas,
    };
    return res.status(200).send({ reporte });
  } catch (err) {
    return res.status(500).send({ code: 'Error de base de datos' });
  }
}
