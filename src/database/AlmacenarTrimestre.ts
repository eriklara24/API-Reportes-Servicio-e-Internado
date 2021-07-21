/* eslint-disable linebreak-style */
/* eslint-disable no-useless-catch */
import mysql = require('mysql');
import Trimestre from '../resources/interfaces/Trimestre';
import ItemNotFound from './errors/ItemNotFound';

export default class AlmacenarTrimestre {
    private conection: mysql.Connection;

    constructor(databaseConfig: any) {
      this.conection = mysql.createConnection(databaseConfig);
      this.conection.connect((err) => {
        if (err) throw err;
      });
    }

    async crearTrimestre(trimestre: Trimestre) {
      const insert = 'INSERT INTO trimestre(id, fecha_inicio, fecha_fin) VALUES (?, ?, ?)';
      try {
        await this.conection.query(insert, [
          String(trimestre.id),
          String(trimestre.fechaInicio),
          String(trimestre.fechaFin),
        ]);
      } catch (err) {
        throw (err);
      }
    }

    async obtenerTrimestre(id: number): Promise<Trimestre> {
      const select = 'SELECT * FROM trimestre WHERE id=?';
      const dataTrimestre: any = await new Promise((resolve, reject) => {
        this.conection.query(select, [String(id)], (err, res) => {
          if (err) {
            throw err;
          }
          if (res.length < 1) {
            reject(new ItemNotFound());
          }
          const trimestre = {
            id: res[0].id,
            fechaInicio: res[0].fecha_inicio,
            fechaFin: res[0].fecha_fin,
          };
          resolve(trimestre);
        });
      });

      const nuevoTrimestre = {
        id: dataTrimestre.id,
        fechaInicio: dataTrimestre.fechaInicio,
        fechaFin: dataTrimestre.fechaFin,
      };

      return nuevoTrimestre;
    }

    async actualizarTrimestre(trimestre: Trimestre) {
      const update = 'UPDATE trimestre SET id=?, fecha_inicio=?, fecha_fin=? WHERE id=?';
      try {
        await this.conection.query(update, [
          String(trimestre.id),
          trimestre.fechaInicio,
          trimestre.fechaFin,
          String(trimestre.id),
        ]);
      } catch (err) {
        throw (err);
      }
    }

    async eliminarTrimestre(id: number) {
      const del = 'DELETE FROM trimestre WHERE id=?';
      try {
        await this.conection.query(del, [String(id)]);
      } catch (err) {
        throw (err);
      }
    }
}
