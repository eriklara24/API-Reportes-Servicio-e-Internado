/* eslint-disable linebreak-style */
/*
Archivo y función para obtener todos los datos de
del reporte final dos
*/

import baseDeDatos from '../../../database';
import ReporteFinalDos from '../../../resources/interfaces/ReporteFinalDos';
import ActividadesRealizadas from '../../../resources/interfaces/ActividadesRealizadas';
import AtencionesRealizadas from '../../../resources/interfaces/AtencionesRealizadas';

function objetoVacio(obj: any): boolean {
  return Object.keys(obj).length === 0;
}

export default async function obtenerReporteFinalDos(req: any, res: any) {
  const idUsuario = 218745594; // Hardcodeado.
  try {
    const datosFinal = await baseDeDatos.almacenamientoReporteFinalDos
      .obtenerPorIdUsuario(idUsuario);
    if (objetoVacio(datosFinal)) {
      return res.status(404).send({ code: 'El reporte final no ha sido creado' });
    }

    const actividades: ActividadesRealizadas[] = await baseDeDatos.almacenamientoActividadRealizada
      .obtenerPorIdUsuario(idUsuario);

    const atenciones: AtencionesRealizadas[] = await baseDeDatos.almacenamientoAtencionRealizada
      .obtenerPorIdUsuario(idUsuario);

    const reporteFinalDos: ReporteFinalDos = {
      id: datosFinal.id,
      idServicio: datosFinal.idServicio,
      metasAlcanzadas: datosFinal.metasAlcanzadas,
      metodologiaUtilizada: datosFinal.metodologiaUtilizada,
      innovacionAportada: datosFinal.innovacionAportada,
      conclusiones: datosFinal.conclusiones,
      propuestas: datosFinal.propuestas,
      actividadesRealizadas: actividades,
      atencionesRealizadas: atenciones,
    };
    return res.status(200).send(reporteFinalDos);
  } catch (err) {
    return res.status(500).send({ code: 'Error de base de datos' });
  }
}
