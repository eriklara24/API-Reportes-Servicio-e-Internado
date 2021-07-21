/* eslint-disable linebreak-style */
import config = require('../../configuration.json');
import DummyStore from './DummyStore';
import AlmacenarUsuario from './AlmacenarUsuario';
import AlmacenarTrimestre from './AlmacenarTrimestre';
import AlmacenarReporteParcial from './AlmacenarReporteParcial';
import AlmacenarReporteFinalDos from './AlmacenarReporteFinalDos';

class Database {
  // Esto esta así xq después vamos a añadir mas stores en este archivo
  dummyStore: DummyStore;

  almacenarUsuario: AlmacenarUsuario;

  almacenarTrimestre: AlmacenarTrimestre;

  almacenarReporteParcial: AlmacenarReporteParcial;

  almacenarReporteFinalDos: AlmacenarReporteFinalDos;

  constructor() {
    const databaseConfig = {
      host: config.host,
      user: config.database.user,
      password: config.database.password,
      database: config.database.name,
    };

    this.dummyStore = new DummyStore(databaseConfig);
    this.almacenarUsuario = new AlmacenarUsuario(databaseConfig);
    this.almacenarTrimestre = new AlmacenarTrimestre(databaseConfig);
    this.almacenarReporteParcial = new AlmacenarReporteParcial(databaseConfig);
    this.almacenarReporteFinalDos = new AlmacenarReporteFinalDos(databaseConfig);
  }
}

const database: Database = new Database();

export default database;
