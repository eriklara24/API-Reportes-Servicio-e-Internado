/* eslint-disable linebreak-style */
/* eslint-disable no-useless-catch */
import mysql = require('mysql');
import ReporteFinalDos from '../resources/interfaces/ReporteFinalDos';
import ItemNotFound from './errors/ItemNotFound';

export default class AlmacenarReporteFinalDos {
    private conection: mysql.Connection;

    constructor(databaseConfig: any) {
      this.conection = mysql.createConnection(databaseConfig);
      this.conection.connect((err) => {
        if (err) throw err;
      });
    }

    async crearReporteFinalDos(reporteFinalDos: ReporteFinalDos) {
      const insert = 'INSERT INTO reporte_final'
          + ' (id, meta_alcanzada, metodologia, innovacion, conclusion, propuestas, servicio_id)'
          + ' VALUES (?, ?, ?, ?, ?, ?, ?)';
      try {
        await this.conection.query(insert, [
          String(reporteFinalDos.id),
          reporteFinalDos.metaAlcanzada,
          reporteFinalDos.metodologiaUtilizada,
          reporteFinalDos.innovacionAportada,
          reporteFinalDos.conclusiones,
          reporteFinalDos.propuestas,
          reporteFinalDos.idServicio,
        ]);
      } catch (err) {
        throw (err);
      }
    }

    async obtenerReporteFinalDos(id: number): Promise<ReporteFinalDos> {
      const select = 'SELECT * FROM reporte_final WHERE id=?';
      const dataReporteFinalDos: any = await new Promise((resolve, reject) => {
        this.conection.query(select, [String(id)], (err, res) => {
          if (err) {
            throw err;
          }
          if (res.length < 1) {
            reject(new ItemNotFound());
          }
          const reporteFinalDos = {
            id: res[0].id,
            metaAlcanzada: res[0].meta_alcanzada,
            metodologiaUtilizada: res[0].metodologia,
            innovacionAportada: res[0].innovacion,
            conclusiones: res[0].conclusion,
            propuestas: res[0].propuestas,
            idServicio: res[0].servicio_id,
          };
          resolve(reporteFinalDos);
        });
      });

      const nuevoReporteFinalDos = {
        id: dataReporteFinalDos.id,
        metaAlcanzada: dataReporteFinalDos.metaAlcanzada,
        metodologiaUtilizada: dataReporteFinalDos.metodologiaUtilizada,
        innovacionAportada: dataReporteFinalDos.innovacionAportada,
        conclusiones: dataReporteFinalDos.conclusiones,
        propuestas: dataReporteFinalDos.propuestas,
        idServicio: dataReporteFinalDos.idServicio,
      };

      return nuevoReporteFinalDos;
    }

    async actualizarReporteFinalDos(reporteFinalDos: ReporteFinalDos) {
      const update = 'UPDATE reporte_final'
        + ' SET id=?, meta_alcanzada=?, metodologia=?, innovacion=?, conclusion=?, propuestas=?, servicio_id=?'
        + ' WHERE id=?';
      try {
        await this.conection.query(update, [
          String(reporteFinalDos.id),
          reporteFinalDos.metaAlcanzada,
          reporteFinalDos.metodologiaUtilizada,
          reporteFinalDos.innovacionAportada,
          reporteFinalDos.conclusiones,
          reporteFinalDos.propuestas,
          reporteFinalDos.idServicio,
          String(reporteFinalDos.id),
        ]);
      } catch (err) {
        throw (err);
      }
    }

    async eliminarReporteFinalDos(id: number) {
      const del = 'DELETE FROM reporte_final WHERE id=?';
      try {
        await this.conection.query(del, [String(id)]);
      } catch (err) {
        throw (err);
      }
    }
}
