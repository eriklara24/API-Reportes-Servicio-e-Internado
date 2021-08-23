/* eslint-disable linebreak-style */
import database from '../../../database';

export default async function actualizarReporte(req: any, res: any) {
  try {
    // Actualización del reporte
    const reporteActualizado = await database
      .almacenamientoReporteParcial.actualizarReporteParcial({
        id: req.body.id,
        idServicio: req.body.idServicio,
        idTrimestre: req.body.idTrimestre,
        actualizado: req.body.actualizado,
        actividadesRealizadas: req.body.actividadesRealizadas,
        atencionesRealizadas: req.body.atencionesRealizadas,
      });

    // Eliminación de atenciones y actividades realizadas
    const actividadesRealizadas = await database.almacenamientoActividadRealizada
      .obtenerPorIdReporteParcial(reporteActualizado.id);
    actividadesRealizadas.forEach((element) => {
      database.almacenamientoActividadRealizada.eliminarActividadRealizada(element.id);
    });

    const atencionesRealizadas = await database.almacenamientoAtencionRealizada
      .obtenerPorIdReporteParcial(reporteActualizado.id);
    atencionesRealizadas.forEach((element) => {
      database.almacenamientoAtencionRealizada.eliminarAtencionRealizada(element.id);
    });

    // Creación de nuevas atenciones y actividades realizadas
    req.body.actividadesRealizadas.forEach((element) => {
      database.almacenamientoActividadRealizada.crearActividadRealizada({
        id: 0,
        idActividad: element.idActividad,
        idReporteParcial: reporteActualizado.id,
        cantidad: element.cantidad,
      });
    });

    req.body.atencionesRealizadas.forEach((element) => {
      database.almacenamientoAtencionRealizada.crearAtencionRealizada({
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
