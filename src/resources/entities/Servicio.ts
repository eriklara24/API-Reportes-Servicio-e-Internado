/* Entidad de Servicio.
 * Esta entidad incluye la información necesaria para la creación de
 * un objeto tipo Servicio con todos los valores de todas las tablas,
 * a excepción de usuarios y trimestres. Incluye las interfaces de cada
 * una de las tablas necesarias.
 *
 * Escrito por Ramón Paredes Sánchez.
 */

/** Servicio E Internado. Contiene los datos generales de un Servicio social o internado */
interface ServicioEInternado {
  id: number;
  idUsuario: number;
  entidadReceptora: string;
  receptor: string;
  programa: string; // Puede no ser necesario.
  objetivosDelPrograma: string; // Puede no ser necesario
  fechaInicio: string; // En la base de datos es tipo DATE pero se puede interpretar como string.
  fechaFin: string;
  totalDeHoras: number;
  horarioHoraInicio: string; // Mismo caso que las fechas.
  horarioHoraFin: string;
}

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

/** Atenciones Realizadas. Similar a Actividades Realizadas, pero aquí las atenciones están
 * predifinidas y en lugar de tener una descripción, tienen un tipo
 */
interface AtencionesRealizadas {
  id: number;
  idTrimestre: number;
  tipo: number;
  cantidad: number;
}

/** Entidad de Servicio. Contiene toda la información e interfaces que conforman
 * un servicio social o internado
 */
export default class Servicio {
  servicioEInternado: ServicioEInternado;

  reportesParciales: ReportesParciales[];

  reporteFinalDos: ReporteFinalDos;

  actividadesDeUsuario: ActividadesDeUsuario[];

  actividadesRealizadas: ActividadesRealizadas[];

  atencionesRealizadas: AtencionesRealizadas[];

  constructor(servicio: ServicioEInternado, parciales: ReportesParciales[], final: ReporteFinalDos,
    actividades: ActividadesDeUsuario[], realizadas: ActividadesRealizadas[],
    atenciones: AtencionesRealizadas[]) {
    this.servicioEInternado = servicio;
    this.reportesParciales = parciales;
    this.reporteFinalDos = final;
    this.actividadesDeUsuario = actividades;
    this.actividadesRealizadas = realizadas;
    this.atencionesRealizadas = atenciones;
  }

  // sets y gets de todas las interfaces de la clase

  setServicioEInternado(servicio: ServicioEInternado): void {
    this.servicioEInternado = servicio;
  }

  getServicioEInternado(): ServicioEInternado {
    return this.servicioEInternado;
  }

  setReportesParciales(parciales: ReportesParciales[]): void {
    this.reportesParciales = parciales;
  }

  getReportesParciales(): ReportesParciales[] {
    return this.reportesParciales;
  }

  addReporteParcial(parcial: ReportesParciales): void {
    this.reportesParciales.push(parcial);
  }

  setReporteFinalDos(final: ReporteFinalDos): void {
    this.reporteFinalDos = final;
  }

  getReporteFinalDos(): ReporteFinalDos {
    return this.reporteFinalDos;
  }

  setActividadesDeUsuario(actividades: ActividadesDeUsuario[]):void {
    this.actividadesDeUsuario = actividades;
  }

  getActividadesDeUsuario(): ActividadesDeUsuario[] {
    return this.actividadesDeUsuario;
  }

  addActividadDeUsuario(actividad: ActividadesDeUsuario): void {
    this.actividadesDeUsuario.push(actividad);
  }

  setActividadesRealizadas(realizadas: ActividadesRealizadas[]):void {
    this.actividadesRealizadas = realizadas;
  }

  getActividadesRealizadas(): ActividadesRealizadas[] {
    return this.actividadesRealizadas;
  }

  addActividadRealizada(realizada: ActividadesRealizadas): void {
    this.actividadesRealizadas.push(realizada);
  }

  setAtencionesRealizadas(atenciones: AtencionesRealizadas[]):void {
    this.atencionesRealizadas = atenciones;
  }

  getAtencionesRealizadas(): AtencionesRealizadas[] {
    return this.atencionesRealizadas;
  }

  addAtencionRealizada(atencion: AtencionesRealizadas): void {
    this.atencionesRealizadas.push(atencion);
  }
}
