import mysql = require('mysql');
import config = require('../../../../configuration.json');
import Dummy from '../../../resources/entities/Dummy';

export default class DummyStore {
    private connection : mysql.Connection;

    constructor() {
      this.connection = mysql.createConnection({
        host: config.host,
        user: config.database.user,
        password: config.database.password,
        database: config.database.name,
      });

      this.connection.connect((err) => {
        if (err) throw err;
      });
    }

    /* Insert function using a Dummy object as parameter */
    createDummy(dummy : Dummy, callback : Function) {
      const insert = 'INSERT INTO dummy(id, dummy) VALUES (?, ?)';
      this.connection.query(insert, [String(dummy.getId()), dummy.getDummy()], (error) => {
        if (error) {
          throw error;
        }
        return callback(null, 'Dummy created!');
      });
    }

    /* Update function using a Dummy object as parameter */
    updateDummy(dummy : Dummy, callback : Function) {
      const update = 'UPDATE dummy SET id=?, dummy=? WHERE id=?';
      this.connection.query(update,
        [String(dummy.getId()), dummy.getDummy(), String(dummy.getId())],
        (error, res) => {
          if (error) {
            throw error;
          }
          return callback(null, `Dummy updated: ${res.message}`);
        });
    }

    /* Get function using a Dummy 'id' integer as parameter */
    getDummy(id : number, callback : Function) {
      const select = 'SELECT * FROM dummy WHERE id = ?';
      this.connection.query(select, [String(id)], (error, res) => {
        if (error) {
          throw error;
        }
        if (res.length < 1) {
          return callback('The Dummy id does not exists', null);
        }
        const dummyData = new Dummy(res[0].id, res[0].dummy);
        return callback(null, dummyData);
      });
    }

    /* Delete function using a Dummy 'id' integer as parameter */
    deleteDummy(id : number, callback : Function) {
      const del = 'DELETE FROM dummy WHERE id = ?';
      this.connection.query(del, [String(id)], (error, res) => {
        if (error) {
          throw error;
        }
        return callback(null, `Dummy deleted: ${res.message}`);
      });
    }
}
