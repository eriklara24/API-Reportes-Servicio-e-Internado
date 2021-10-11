/* eslint-disable linebreak-style */
import baseDatos from '../../../database';
import ReporteParcial from '../../../resources/interfaces/ReporteParcial';

export default async function actualizarReporte(req: any, res: any) {
  const { numeroReporte } = req.params;

  const idUsuario = 1; // Hardcodeado
  // Obtener todos los reportes de este servicio
  const reportesParciales: ReporteParcial[] = await baseDatos.almacenamientoReporteParcial
    .obtenerPorIdUsuario(idUsuario);

  // Validar que el reporte parcial que se busca exista
  if (reportesParciales.length + 1 < numeroReporte || numeroReporte < 1) {
    return res.status(404).send({ code: 'El reporte parcial no existe' });
  }

  try {
    // Actualización del reporte
    const reporteActualizado = await baseDatos
      .almacenamientoReporteParcial.actualizarReporteParcial({
        id: reportesParciales[numeroReporte - 1].id,
        idServicio: reportesParciales[numeroReporte - 1].idServicio,
        idTrimestre: reportesParciales[numeroReporte - 1].idTrimestre,
        actualizado: reportesParciales[numeroReporte - 1].actualizado,
        actividadesRealizadas: reportesParciales[numeroReporte - 1].actividadesRealizadas,
        atencionesRealizadas: reportesParciales[numeroReporte - 1].atencionesRealizadas,
      });

    // Eliminación de atenciones y actividades realizadas
    const actividadesRealizadas = await baseDatos.almacenamientoActividadRealizada
      .obtenerPorIdReporteParcial(reporteActualizado.id);
    actividadesRealizadas.forEach((element) => {
      baseDatos.almacenamientoActividadRealizada.eliminarActividadRealizada(element.id);
    });

    const atencionesRealizadas = await baseDatos.almacenamientoAtencionRealizada
      .obtenerPorIdReporteParcial(reporteActualizado.id);
    atencionesRealizadas.forEach((element) => {
      baseDatos.almacenamientoAtencionRealizada.eliminarAtencionRealizada(element.id);
    });
    // Creación de nuevas atenciones y actividades realizadas
    req.body.actividadesRealizadas.forEach((element) => {
      baseDatos.almacenamientoActividadRealizada.crearActividadRealizada({
        id: 0,
        idActividad: element.idActividad,
        idReporteParcial: reporteActualizado.id,
        cantidad: element.cantidad,
      });
    });

    req.body.atencionesRealizadas.forEach((element) => {
      baseDatos.almacenamientoAtencionRealizada.crearAtencionRealizada({
        id: 0,
        idReporteParcial: reporteActualizado.id,
        idUsuario: element.idUsuario,
        tipo: element.tipo,
        cantidad: element.cantidad,
      });
    });

    return res.status(201).send(reporteActualizado);
  } catch (err) {
    return res.status(404).send(err);
  }
}
