import mysql = require('mysql');
import Dummy from '../resources/entities/Dummy';
import ItemNotFound from './errors/ItemNotFound';

export default class DummyStore {
    private connection : mysql.Connection;

    constructor(databaseConfig: any) {
      this.connection = mysql.createConnection(databaseConfig);
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
        return callback('Dummy created!', null);
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
          return callback(`Dummy updated: ${res.message}`, null);
        });
    }

    /* Get function using a Dummy 'id' integer as parameter */
    getDummy(id : number, callback : Function) {
      const select = 'SELECT * FROM dummy WHERE id = ?';
      this.connection.query(select, [String(id)], (error, res) => {
        if (error || res.length < 1) {
          throw error;
        }
        if (res.length < 1) {
          return callback(null, new ItemNotFound());
        }
        const dummyData = new Dummy(res[0].id, res[0].dummy);
        return dummyData;
      });
    }

    /* Delete function using a Dummy 'id' integer as parameter */
    deleteDummy(id : number, callback : Function) {
      const del = 'DELETE FROM dummy WHERE id = ?';
      this.connection.query(del, [String(id)], (error, res) => {
        if (error) {
          throw error;
        }
        return callback(`Dummy deleted: ${res.message}`, null);
      });
    }
}
