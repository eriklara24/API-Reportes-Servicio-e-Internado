/* eslint-disable linebreak-style */
import database from '../../database';

export default async function actualizarReporte(req: any, res: any) {
  try {
    // Eliminación de atenciones y actividades realizadas
    const actividadesRealizadas = await database.almacenamientoActividadRealizada
      .obtenerPorIdUsuarioIdTrimestre(req.body.idUsuario, req.body.idTrimestre);
    actividadesRealizadas.forEach((element) => {
      database.almacenamientoActividadRealizada.eliminarActividadRealizada(element.id);
    });

    const atencionesRealizadas = await database.almacenamientoAtencionRealizada
      .obtenerPorIdUsuarioIdTrimestre(req.body.idUsuario, req.body.idTrimestre);
    atencionesRealizadas.forEach((element) => {
      database.almacenamientoAtencionRealizada.eliminarAtencionRealizada(element.id);
    });

    // Creación de nuevas atenciones y actividades realizadas
    req.body.actividadesRealizadas.forEach((element) => {
      database.almacenamientoActividadRealizada.crearActividadRealizada({
        idActividad: element.idActividad,
        idTrimestre: element.idTrimestre,
        cantidad: element.cantidad,
      });
    });

    req.body.atencionesRealizadas.forEach((element) => {
      database.almacenamientoAtencionRealizada.crearAtencionRealizada({
        idTrimestre: element.idTrimestre,
        idUsuario: element.idUsuario,
        tipo: element.tipo,
        cantidad: element.cantidad,
      });
    });

    // Actualización del reporte
    const reporteActualizado = await database
      .almacenamientoReporteParcial.actualizarReporteParcial({
        id: req.body.id,
        idServicio: req.body.idServicio,
        idTrimestre: req.body.idTrimestre,
        actualizado: req.body.actualizado,
        actividadesRealizdas: req.body.actividadesRealizadas,
        atencionesRealizadas: req.body.atencionesRealizadas,
      });
    return res.status(201).send(reporteActualizado);
  } catch (err) {
    return res.status(404).send(err);
  }
}
