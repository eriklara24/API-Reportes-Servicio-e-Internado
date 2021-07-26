/* eslint-disable linebreak-style */
/* eslint-disable no-useless-catch */
import mysql = require('mysql');
import ReporteFinalDos from '../resources/interfaces/ReporteFinalDos';
import ItemNotFound from './errors/ItemNotFound';

export default class AlmacenamientoReporteFinalDos {
    private conection: mysql.Connection;

    constructor(databaseConfig: any) {
      this.conection = mysql.createConnection(databaseConfig);
      this.conection.connect((err) => {
        if (err) throw err;
      });
    }

    async crearReporteFinalDos(reporteFinalDos: ReporteFinalDos): Promise<ReporteFinalDos> {
      const query = 'INSERT INTO reporte_final'
          + ' (servicio_id, meta_alcanzada, metodologia, innovacion, conclusion, propuestas)'
          + ' VALUES (?, ?, ?, ?, ?, ?)';
      const args = [
        reporteFinalDos.idServicio,
        reporteFinalDos.metaAlcanzada,
        reporteFinalDos.metodologiaUtilizada,
        reporteFinalDos.innovacionAportada,
        reporteFinalDos.conclusiones,
        reporteFinalDos.propuestas,
      ];
      const promesaReporteFinalDos: any = await new Promise((resolve, reject) => {
        this.conection.query(query, args, (err, res) => {
          if (err) {
            reject(err);
          } else {
            const nuevoReporteFinalDos = reporteFinalDos;
            nuevoReporteFinalDos.id = res.insertId;
            resolve(nuevoReporteFinalDos);
          }
        });
      });

      return promesaReporteFinalDos;
    }

    async obtenerReporteFinalDos(id: number): Promise<ReporteFinalDos> {
      const query = 'SELECT * FROM reporte_final WHERE id=?';
      const promesaReporteFinalDos: any = await new Promise((resolve, reject) => {
        this.conection.query(query, [String(id)], (err, res) => {
          if (err) {
            reject(err);
          } else if (res.length < 1) {
            reject(new ItemNotFound());
          } else {
            const reporteFinalDos = {
              id: res[0].id,
              idServicio: res[0].servicio_id,
              metaAlcanzada: res[0].meta_alcanzada,
              metodologiaUtilizada: res[0].metodologia,
              innovacionAportada: res[0].innovacion,
              conclusiones: res[0].conclusion,
              propuestas: res[0].propuestas,
            };
            resolve(reporteFinalDos);
          }
        });
      });

      return promesaReporteFinalDos;
    }

    async actualizarReporteFinalDos(reporteFinalDos: ReporteFinalDos): Promise<ReporteFinalDos> {
      const query = 'UPDATE reporte_final'
        + ' SET servicio_id=?, meta_alcanzada=?, metodologia=?, innovacion=?, conclusion=?, propuestas=?'
        + ' WHERE id=?';
      const args = [
        reporteFinalDos.idServicio,
        reporteFinalDos.metaAlcanzada,
        reporteFinalDos.metodologiaUtilizada,
        reporteFinalDos.innovacionAportada,
        reporteFinalDos.conclusiones,
        reporteFinalDos.propuestas,
        String(reporteFinalDos.id),
      ];
      const promesaReporteFinalDos: any = await new Promise((resolve, reject) => {
        this.conection.query(query, args, (err, res) => {
          if (err) {
            reject(err);
          } else if (res.affectedRows < 1) {
            reject(new ItemNotFound());
          } else {
            resolve(reporteFinalDos);
          }
        });
      });

      return promesaReporteFinalDos;
    }

    async eliminarReporteFinalDos(id: number): Promise<boolean> {
      const query = 'DELETE FROM reporte_final WHERE id=?';
      const promesaReporteParcial: any = await new Promise((resolve, reject) => {
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

      return promesaReporteParcial;
    }
}
