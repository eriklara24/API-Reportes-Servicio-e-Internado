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

    async crearTrimestre(trimestre: Trimestre): Promise<Trimestre> {
      const query = 'INSERT INTO trimestre(id, fecha_inicio, fecha_fin) VALUES (?, ?, ?)';
      const args = [
        String(trimestre.id),
        trimestre.fechaInicio,
        trimestre.fechaFin,
      ];
      const promesaTrimestre: any = await new Promise((resolve, reject) => {
        this.conection.query(query, args, (err) => {
          if (err) {
            reject(err);
          } else {
            resolve(trimestre);
          }
        });
      });

      return promesaTrimestre;
    }

    async obtenerTrimestre(id: number): Promise<Trimestre> {
      const query = 'SELECT * FROM trimestre WHERE id=?';
      const promesaTrimestre: any = await new Promise((resolve, reject) => {
        this.conection.query(query, [String(id)], (err, res) => {
          if (err) {
            reject(err);
          } else if (res.length < 1) {
            reject(new ItemNotFound());
          } else {
            const trimestre = {
              id: res[0].id,
              fechaInicio: res[0].fecha_inicio,
              fechaFin: res[0].fecha_fin,
            };
            resolve(trimestre);
          }
        });
      });

      return promesaTrimestre;
    }

    async actualizarTrimestre(trimestre: Trimestre): Promise<Trimestre> {
      const query = 'UPDATE trimestre SET id=?, fecha_inicio=?, fecha_fin=? WHERE id=?';
      const args = [
        String(trimestre.id),
        trimestre.fechaInicio,
        trimestre.fechaFin,
        String(trimestre.id),
      ];
      const promesaTrimestre: any = await new Promise((resolve, reject) => {
        this.conection.query(query, args, (err, res) => {
          if (err) {
            reject(err);
          } else if (res.affectedRows < 1) {
            reject(new ItemNotFound());
          } else {
            resolve(trimestre);
          }
        });
      });

      return promesaTrimestre;
    }

    async eliminarTrimestre(id: number): Promise<Trimestre> {
      const query = 'DELETE FROM trimestre WHERE id=?';
      const promesaTrimestre: any = await new Promise((resolve, reject) => {
        this.conection.query(query, [String(id)], (err, res) => {
          if (err) {
            reject(err);
          } else if (res.affectedRows < 1) {
            reject(new ItemNotFound());
          } else {
            resolve(true);
          }
        });
      });

      return promesaTrimestre;
    }
}
