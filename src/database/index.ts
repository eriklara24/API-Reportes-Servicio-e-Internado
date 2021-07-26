/* eslint-disable linebreak-style */
import config = require('../../configuration.json');
import AlmacenamientoUsuario from './AlmacenamientoUsuario';
import AlmacenamientoTrimestre from './AlmacenamientoTrimestre';
import AlmacenamientoReporteParcial from './AlmacenamientoReporteParcial';
import AlmacenamientoReporteFinalDos from './AlmacenamientoReporteFinalDos';

class Database {
  // Esto esta así xq después vamos a añadir mas stores en este archivo
  almacenamientoUsuario: AlmacenamientoUsuario;

  almacenamientoTrimestre: AlmacenamientoTrimestre;

  almacenamientoReporteParcial: AlmacenamientoReporteParcial;

  almacenamientoReporteFinalDos: AlmacenamientoReporteFinalDos;

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
  }
}

const database: Database = new Database();

export default database;
