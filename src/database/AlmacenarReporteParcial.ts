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

    async crearReporteParcial(reporteParcial: ReporteParcial) {
      const insert = 'INSERT INTO reporte_parcial(id, actualizado, servicio_id, trimestre_id) VALUES (?, ?, ?, ?)';
      try {
        await this.conection.query(insert, [
          String(reporteParcial.id),
          String(reporteParcial.actualizado),
          String(reporteParcial.idServicio),
          String(reporteParcial.idTrimestre),
        ]);
      } catch (err) {
        throw (err);
      }
    }

    async obtenerReporteParcial(id: number): Promise<ReporteParcial> {
      const select = 'SELECT * FROM reporte_parcial WHERE id=?';
      const dataReporteParcial: any = await new Promise((resolve, reject) => {
        this.conection.query(select, [String(id)], (err, res) => {
          if (err) {
            throw err;
          }
          if (res.length < 1) {
            reject(new ItemNotFound());
          }
          const reporteParcial = {
            id: res[0].id,
            actualizado: res[0].actualizado,
            idServicio: res[0].servicio_id,
            idTrimestre: res[0].trimestre_id,
          };
          resolve(reporteParcial);
        });
      });

      const nuevoReporteParcial = {
        id: dataReporteParcial.id,
        actualizado: dataReporteParcial.actualizado,
        idServicio: dataReporteParcial.idServicio,
        idTrimestre: dataReporteParcial.idTrimestre,
      };

      return nuevoReporteParcial;
    }

    async actualizarReporteParcial(reporteParcial: ReporteParcial) {
      const update = 'UPDATE reporte_parcial SET id=?, actualizado=?, servicio_id=?, trimestre_id=? WHERE id=?';
      try {
        await this.conection.query(update, [
          String(reporteParcial.id),
          reporteParcial.actualizado,
          reporteParcial.idServicio,
          reporteParcial.idTrimestre,
          String(reporteParcial.id),
        ]);
      } catch (err) {
        throw (err);
      }
    }

    async eliminarReporteParcial(id: number) {
      const del = 'DELETE FROM reporte_parcial WHERE id=?';
      try {
        await this.conection.query(del, [String(id)]);
      } catch (err) {
        throw (err);
      }
    }
}
