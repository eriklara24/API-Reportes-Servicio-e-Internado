/* eslint-disable linebreak-style */
/*
Archivo y función para obtener todos los datos de
un reporte por número de reporte
*/

import baseDatos from '../../../database';
import ActividadesRealizadas from '../../../resources/interfaces/ActividadesRealizadas';
import AtencionesRealizadas from '../../../resources/interfaces/AtencionesRealizadas';
import ReporteParcial from '../../../resources/interfaces/ReporteParcial';
import Trimestre from '../../../resources/interfaces/Trimestre';

export default async function obtenerPorNumero(req: any, res: any) {
  try {
    const { numeroReporte } = req.params;
    const { idUsuario } = req.params;

    // Obtener todos los reportes de este servicio
    const reportesParciales: ReporteParcial[] = await baseDatos.almacenamientoReporteParcial
      .obtenerReportesPorIdUsuario(idUsuario);

    // Validar que el reporte parcial que se busca exista
    if (reportesParciales.length < numeroReporte || numeroReporte < 1) {
      return res.status(404).send({ code: 'El reporte parcial no existe' });
    }

    const actividadesRealizadas: ActividadesRealizadas[] = await baseDatos
      .almacenamientoActividadRealizada
      .obtenerPorIdReporte(reportesParciales[numeroReporte - 1].id);

    const atencionesRealizadas: AtencionesRealizadas[] = await baseDatos
      .almacenamientoAtencionRealizada
      .obtenerPorIdReporte(reportesParciales[numeroReporte - 1].id);

    const trimestre: Trimestre = await baseDatos
      .almacenamientoTrimestre.obtenerTrimestre(reportesParciales[numeroReporte - 1].idTrimestre);

    // Regresar el reporte armado
    const reporte: any = {
      id: reportesParciales[numeroReporte - 1].id,
      idServicio: reportesParciales[numeroReporte - 1].idServicio,
      idTrimestre: reportesParciales[numeroReporte - 1].idTrimestre,
      fechaInicio: trimestre.fechaInicio,
      fechaFin: trimestre.fechaFin,
      actualizado: reportesParciales[numeroReporte - 1].actualizado,
      horasRealizadas: reportesParciales[numeroReporte - 1].horasRealizadas,
      actividadesRealizadas,
      atencionesRealizadas,
    };
    return res.status(200).send({ reporte });
  } catch (err) {
    return res.status(500).send({ code: 'Error de base de datos' });
  }
}
