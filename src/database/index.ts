/* eslint-disable linebreak-style */
import AlmacenamientoUsuario from './AlmacenamientoUsuario';
import AlmacenamientoTrimestre from './AlmacenamientoTrimestre';
import AlmacenamientoReporteParcial from './AlmacenamientoReporteParcial';
import AlmacenamientoReporteFinalDos from './AlmacenamientoReporteFinalDos';
import AlmacenamientoActividadDeUsuario from './AlmacenamientoActividadDeUsuario';
import AlmacenamientoActividadRealizada from './AlmacenamientoActividadRealizada';
import AlmacenamientoAtencionRealizada from './AlmacenamientoAtencionRealizada';
import AlmacenamientoServicioGeneral from './AlmacenamientoServicioGeneral';
import config from '../../configuracion';

class Database {
  almacenamientoUsuario: AlmacenamientoUsuario;

  almacenamientoTrimestre: AlmacenamientoTrimestre;

  almacenamientoReporteParcial: AlmacenamientoReporteParcial;

  almacenamientoReporteFinalDos: AlmacenamientoReporteFinalDos;

  almacenamientoActividadDeUsuario: AlmacenamientoActividadDeUsuario;

  almacenamientoActividadRealizada: AlmacenamientoActividadRealizada;

  almacenamientoAtencionRealizada: AlmacenamientoAtencionRealizada;

  almacenamientoServicioGeneral: AlmacenamientoServicioGeneral;

  constructor() {
    const databaseConfig = {
      host: config.host,
      user: config.database.user,
      password: config.database.password,
      database: config.database.name,
    };

    this.almacenamientoUsuario = new AlmacenamientoUsuario(databaseConfig);
    this.almacenamientoTrimestre = new AlmacenamientoTrimestre(databaseConfig);
    this.almacenamientoReporteParcial = new AlmacenamientoReporteParcial(databaseConfig);
    this.almacenamientoReporteFinalDos = new AlmacenamientoReporteFinalDos(databaseConfig);
    this.almacenamientoActividadDeUsuario = new AlmacenamientoActividadDeUsuario(databaseConfig);
    this.almacenamientoActividadRealizada = new AlmacenamientoActividadRealizada(databaseConfig);
    this.almacenamientoAtencionRealizada = new AlmacenamientoAtencionRealizada(databaseConfig);
    this.almacenamientoServicioGeneral = new AlmacenamientoServicioGeneral(databaseConfig);
  }
}

const database: Database = new Database();

export default database;
