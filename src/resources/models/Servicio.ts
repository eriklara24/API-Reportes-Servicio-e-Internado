/* Entidad de Servicio.
 * Esta entidad incluye la información necesaria para la creación de
 * un objeto tipo Servicio con todos los valores de todas las tablas,
 * a excepción de usuarios y trimestres. Incluye las interfaces de cada
 * una de las tablas necesarias.
 *
 * Escrito por Ramón Paredes Sánchez.
 */

/** Import's de todas las interfaces necesarias para la construcción de la entidad.
 */
import ReporteParcial from './ReporteParcial';
import ReporteFinalDos from './ReporteFinalDos';
import ActividadesDeUsuario from './ActividadesDeUsuario';

/** Entidad de Servicio. Contiene toda la información e interfaces que conforman
 * un servicio social o internado.
 */
interface Servicio {
  id: number;
  idUsuario: number;
  entidadReceptora: string;
  receptor: string;
  programa: string; // Puede no ser necesario.
  objetivosDelPrograma: string; // Puede no ser necesario
  fechaInicio: string; // En la BD es tipo DATE pero se puede interpretar como string.
  fechaFin: string;
  horarioHoraInicio: string; // Mismo caso que las fechas.
  horarioHoraFin: string;
  reportesParciales: ReporteParcial[];
  reporteFinalDos: ReporteFinalDos;
  actividadesDeUsuario: ActividadesDeUsuario[];
}

export default Servicio;
