/* eslint-disable linebreak-style */
/* eslint-disable no-useless-catch */
import mysql = require('mysql');
import ReporteParcial from '../resources/interfaces/ReporteParcial';
import ItemNotFound from './errors/ItemNotFound';

export default class AlmacenarReporteParcial {
    private conection: mysql.Connection;

    constructor(databaseConfig: any) {
      this.conection = mysql.createConnection(databaseConfig);
      this.conection.connect((err) => {
        if (err) throw err;
      });
    }

    async crearReporteParcial(reporteParcial: ReporteParcial): Promise<ReporteParcial> {
      const query = 'INSERT INTO reporte_parcial(id, servicio_id, trimestre_id, actualizado) VALUES (?, ?, ?, ?)';
      const args = [
        String(reporteParcial.id),
        reporteParcial.idServicio,
        reporteParcial.idTrimestre,
        reporteParcial.actualizado,
      ];
      const promesaReporteParcial: any = await new Promise((resolve, reject) => {
        this.conection.query(query, args, (err) => {
          if (err) {
            reject(err);
          } else {
            resolve(reporteParcial);
          }
        });
      });

      return promesaReporteParcial;
    }

    async obtenerReporteParcial(id: number): Promise<ReporteParcial> {
      const query = 'SELECT * FROM reporte_parcial WHERE id=?';
      const promesaReporteParcial: any = await new Promise((resolve, reject) => {
        this.conection.query(query, [String(id)], (err, res) => {
          if (err) {
            reject(err);
          } else if (res.length < 1) {
            reject(new ItemNotFound());
          } else {
            const reporteParcial = {
              id: res[0].id,
              idServicio: res[0].servicio_id,
              idTrimestre: res[0].trimestre_id,
              actualizado: res[0].actualizado,
            };
            resolve(reporteParcial);
          }
        });
      });

      return promesaReporteParcial;
    }

    async actualizarReporteParcial(reporteParcial: ReporteParcial): Promise<ReporteParcial> {
      const query = 'UPDATE reporte_parcial SET id=?, servicio_id=?, trimestre_id=?, actualizado=? WHERE id=?';
      const args = [
        String(reporteParcial.id),
        reporteParcial.idServicio,
        reporteParcial.idTrimestre,
        reporteParcial.actualizado,
        String(reporteParcial.id),
      ];
      const promesaReporteParcial: any = await new Promise((resolve, reject) => {
        this.conection.query(query, args, (err, res) => {
          if (err) {
            reject(err);
          } else if (res.affectedRows < 1) {
            reject(new ItemNotFound());
          } else {
            resolve(reporteParcial);
          }
        });
      });

      return promesaReporteParcial;
    }

    async eliminarReporteParcial(id: number): Promise<ReporteParcial> {
      const query = 'DELETE FROM reporte_parcial WHERE id=?';
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
