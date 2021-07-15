import config = require('../../configuration.json');
import DummyStore from './DummyStore';

class Database {
  // Esto esta así xq después vamos a añadir mas stores en este archivo
  dummyStore: DummyStore;

  constructor() {
    const databaseConfig = {
      host: config.host,
      user: config.database.user,
      password: config.database.password,
      database: config.database.name,
    };

    this.dummyStore = new DummyStore(databaseConfig);
  }
}

const database: Database = new Database();

export default database;
