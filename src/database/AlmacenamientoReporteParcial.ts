/* eslint-disable no-await-in-loop */
/* eslint-disable linebreak-style */
/* eslint-disable no-useless-catch */
import mysql = require('mysql');
import ReporteParcial from '../resources/interfaces/ReporteParcial';
import ItemNotFound from './errors/ItemNotFound';
import AlmacenamientoActividadRealizada from './AlmacenamientoActividadRealizada';
import AlmacenamientoAtencionRealizada from './AlmacenamientoAtencionRealizada';

export default class AlmacenamientoReporteParcial {
    private conection: mysql.Connection;

    private actividad: AlmacenamientoActividadRealizada;

    private atencion: AlmacenamientoAtencionRealizada;

    constructor(databaseConfig: any) {
      this.conection = mysql.createConnection(databaseConfig);
      this.actividad = new AlmacenamientoActividadRealizada(databaseConfig);
      this.atencion = new AlmacenamientoAtencionRealizada(databaseConfig);
      this.conection.connect((err) => {
        if (err) throw err;
      });
    }

    async crearReporteParcial(reporteParcial: ReporteParcial): Promise<ReporteParcial> {
      const query = 'INSERT INTO reporte_parcial(servicio_id, trimestre_id, actualizado) VALUES (?, ?, ?)';
      const args = [
        reporteParcial.idServicio,
        reporteParcial.idTrimestre,
        reporteParcial.actualizado,
      ];
      const promesaReporteParcial: any = await new Promise((resolve, reject) => {
        this.conection.query(query, args, (err, res) => {
          if (err) {
            reject(err);
          } else {
            const nuevoReporteParcial = reporteParcial;
            nuevoReporteParcial.id = res.insertId;
            resolve(nuevoReporteParcial);
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

    public async obtenerPorIdUsuario(idUsuario: number): Promise<ReporteParcial[]> {
      const select = 'SELECT reporte_parcial.* FROM servicio '
      + 'JOIN reporte_parcial ON reporte_parcial.servicio_id = servicio.id '
      + 'WHERE servicio.usuario_id = ?';
      const promise: any = await new Promise((resolve, reject) => {
        this.conection.query(select, [idUsuario], async (err, res) => {
          if (err) {
            reject(err);
          } else if (res.length < 1) {
            const datos: ReporteParcial[] = [];
            resolve(datos);
          } else {
            const datos: ReporteParcial[] = [];
            for (let i = 0; i < res.length; i += 1) {
              const aux = {
                id: res[i].id,
                idServicio: res[i].servicio_id,
                idTrimestre: res[i].trimestre_id,
                actualizado: res[i].actualizado,
                actividadesRealizadas: await this.actividad.obtenerPorIdReporte(res[i].id),
                atencionesRealizadas: await this.atencion.obtenerPorIdReporte(res[i].id),
              };
              datos.push(aux);
            }
            resolve(datos);
          }
        });
      });

      return promise;
    }

    async actualizarReporteParcial(reporteParcial: ReporteParcial): Promise<ReporteParcial> {
      const query = 'UPDATE reporte_parcial SET servicio_id=?, trimestre_id=?, actualizado=? WHERE id=?';
      const args = [
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

    async eliminarReporteParcial(id: number): Promise<boolean> {
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
