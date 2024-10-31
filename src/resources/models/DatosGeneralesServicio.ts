/* Interfaz de Servicio e Internado
 * Escrito por Ramón Paredes Sánchez.
 */

interface DatosGeneralesServicio {
  id: number;
  idUsuario: number;
  entidadReceptora: string;
  receptor: string;
  programa: string;
  objetivosDelPrograma: string;
  fechaInicio: string;
  fechaFin: string;
  horarioHoraInicio: string;
  horarioHoraFin: string;
}

export default DatosGeneralesServicio;
