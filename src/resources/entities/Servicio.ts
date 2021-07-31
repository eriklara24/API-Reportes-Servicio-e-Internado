/* Entidad de Servicio.
 * Esta entidad incluye la información necesaria para la creación de
 * un objeto tipo Servicio con todos los valores de todas las tablas,
 * a excepción de usuarios y trimestres. Incluye las interfaces de cada
 * una de las tablas necesarias.
 *
 * Escrito por Ramón Paredes Sánchez.
 */

/** Atenciones Realizadas. Similar a Actividades Realizadas, pero aquí las atenciones están
 * predifinidas y en lugar de tener una descripción, tienen un tipo
 */
import AtencionesRealizadas from '../interfaces/AtencionesRealizadas';

/** Reportes Parciales. Una interfaz con la información de un reporte parcial */
interface ReportesParciales {
  id: number;
  idServicio: number;
  idTrimestre: number;
  actualizado: string;
}

/** Reporte Final Dos. Incluye la información de un reporte final */
interface ReporteFinalDos {
  id: number;
  idServicio: number;
  metaAlcanzada: string;
  metodologiaUtilizada: string;
  innovacionAportada: string;
  conclusiones: string;
  propuestas: string;
}

/** Actividades de Usuario. Incluyen la información de una activdad y su relación
 *  con un servicio */
interface ActividadesDeUsuario {
  id: number;
  idServicio: number;
  descripcion: string;
}

/** Actividades Realizadas. Relaciona las actividades de un usuario con su trimestre
 * y su cantidad realizada en ese trimestre
 */
interface ActividadesRealizadas {
  id: number;
  idActividad: number;
  idTrimestre: number;
  cantidad: number;
}

/** Entidad de Servicio. Contiene toda la información e interfaces que conforman
 * un servicio social o internado.
 */
export default class Servicio {
  private id: number;

  private idUsuario: number;

  private entidadReceptora: string;

  private receptor: string;

  private programa: string; // Puede no ser necesario.

  private objetivosDelPrograma: string; // Puede no ser necesario

  private fechaInicio: string; // En la BD es tipo DATE pero se puede interpretar como string.

  private fechaFin: string;

  private totalDeHoras: number;

  private horarioHoraInicio: string; // Mismo caso que las fechas.

  private horarioHoraFin: string;

  private reportesParciales: ReportesParciales[];

  private reporteFinalDos: ReporteFinalDos;

  private actividadesDeUsuario: ActividadesDeUsuario[];

  private actividadesRealizadas: ActividadesRealizadas[];

  private atencionesRealizadas: AtencionesRealizadas[];

  constructor(
    id: number,
    idUsuario: number,
    entidadReceptora: string,
    receptor: string,
    programa: string,
    objetivosDelPrograma: string,
    fechaInicio: string,
    fechaFin: string,
    totalDeHoras: number,
    horarioHoraInicio: string,
    horarioHoraFin: string,
    parciales: ReportesParciales[],
    final: ReporteFinalDos,
    actividades: ActividadesDeUsuario[],
    realizadas: ActividadesRealizadas[],
    atenciones: AtencionesRealizadas[],
  ) {
    this.id = id;
    this.idUsuario = idUsuario;
    this.entidadReceptora = entidadReceptora;
    this.receptor = receptor;
    this.programa = programa;
    this.objetivosDelPrograma = objetivosDelPrograma;
    this.fechaInicio = fechaInicio;
    this.fechaFin = fechaFin;
    this.totalDeHoras = totalDeHoras;
    this.horarioHoraInicio = horarioHoraInicio;
    this.horarioHoraFin = horarioHoraFin;
    this.reportesParciales = parciales;
    this.reporteFinalDos = final;
    this.actividadesDeUsuario = actividades;
    this.actividadesRealizadas = realizadas;
    this.atencionesRealizadas = atenciones;
  }

  // sets y gets de todas las interfaces y propiedades de la clase

  public setId(id: number) {
    this.id = id;
  }

  public getId(): number {
    return this.id;
  }

  public setidUsuario(idUsuario: number) {
    this.idUsuario = idUsuario;
  }

  public getIdUsuario(): number {
    return this.idUsuario;
  }

  public setEntidadReceptora(entidadReceptora: string) {
    this.entidadReceptora = entidadReceptora;
  }

  public getEntidadReceptora(): string {
    return this.entidadReceptora;
  }

  public setReceptor(receptor: string) {
    this.receptor = receptor;
  }

  public getReceptor(): string {
    return this.receptor;
  }

  public setPrograma(programa: string) {
    this.programa = programa;
  }

  public getPrograma(): string {
    return this.programa;
  }

  public setObjetivosDelPrograma(objetivosDelPrograma: string) {
    this.objetivosDelPrograma = objetivosDelPrograma;
  }

  public getObjetivosDelPrograma(): string {
    return this.objetivosDelPrograma;
  }

  public setFechaInicio(fechaInicio: string) {
    this.fechaInicio = fechaInicio;
  }

  public getFechaInicio(): string {
    return this.fechaInicio;
  }

  public setFechaFin(fechaFin: string) {
    this.fechaFin = fechaFin;
  }

  public getFechaFin(): string {
    return this.fechaFin;
  }

  public setTotalDeHoras(totalDeHoras: number) {
    this.totalDeHoras = totalDeHoras;
  }

  public getTotalDeHoras(): number {
    return this.totalDeHoras;
  }

  public setHorarioHoraInicio(horarioHoraInicio: string) {
    this.horarioHoraInicio = horarioHoraInicio;
  }

  public getHorarioHoraInicio(): string {
    return this.horarioHoraInicio;
  }

  public setHorarioHoraFin(horarioHoraFin: string) {
    this.horarioHoraFin = horarioHoraFin;
  }

  public getHorarioHoraFin(): string {
    return this.horarioHoraFin;
  }

  public setReportesParciales(parciales: ReportesParciales[]): void {
    this.reportesParciales = parciales;
  }

  public getReportesParciales(): ReportesParciales[] {
    return this.reportesParciales;
  }

  public setReporteFinalDos(final: ReporteFinalDos): void {
    this.reporteFinalDos = final;
  }

  public getReporteFinalDos(): ReporteFinalDos {
    return this.reporteFinalDos;
  }

  public setActividadesDeUsuario(actividades: ActividadesDeUsuario[]):void {
    this.actividadesDeUsuario = actividades;
  }

  public getActividadesDeUsuario(): ActividadesDeUsuario[] {
    return this.actividadesDeUsuario;
  }

  public setActividadesRealizadas(realizadas: ActividadesRealizadas[]):void {
    this.actividadesRealizadas = realizadas;
  }

  public getActividadesRealizadas(): ActividadesRealizadas[] {
    return this.actividadesRealizadas;
  }

  public setAtencionesRealizadas(atenciones: AtencionesRealizadas[]):void {
    this.atencionesRealizadas = atenciones;
  }

  public getAtencionesRealizadas(): AtencionesRealizadas[] {
    return this.atencionesRealizadas;
  }
}
