/* eslint-disable linebreak-style */
import baseDatos from '../../../database';

export default async function actualizarReporte(req: any, res: any) {
  try {
    // Actualización del reporte
    const reporteActualizado = await baseDatos
      .almacenamientoReporteParcial.actualizarReporteParcial({
        id: req.body.id,
        idServicio: req.body.idServicio,
        idTrimestre: req.body.idTrimestre,
        actualizado: req.body.actualizado,
        actividadesRealizadas: req.body.actividadesRealizadas,
        atencionesRealizadas: req.body.atencionesRealizadas,
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
