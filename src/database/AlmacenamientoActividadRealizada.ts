/* eslint-disable linebreak-style */
/* eslint-disable max-len */
/* Archivo y clase Store para la tabla de Actividades Realizadas
 * Esta clase permite realizar todas las operaciones de tipo
 * CRUD a la tabla de actividad_realizada de la base de datos, para ser utilizada
 * como parte de la clase Database.
 *
 * Escrito por Ramón Paredes Sánchez.
 */

import mysql = require('mysql');
import ActividadesRealizadas from '../resources/interfaces/ActividadesRealizadas';
import ItemNotFound from './errors/ItemNotFound';

export default class AlmacenamientoActividadRealizada {
    private conexion : mysql.Connection;

    constructor(dataBaseConfig: any) {
      this.conexion = mysql.createConnection(dataBaseConfig);
      this.conexion.connect((err) => {
        if (err) throw err;
      });
    }

    /** Insertar valores en la tabla actividad_realizada de MySQL */
    public async crearActividadRealizada(actividad: ActividadesRealizadas): Promise<ActividadesRealizadas> {
      const insert = 'INSERT INTO actividad_realizada(actividad_de_usuario_id, reporte_parcial_id, cantidad)'
      + 'VALUES (?, ?, ?)';
      const args = [
        actividad.idActividad,
        actividad.idReporteParcial,
        actividad.cantidad,
      ];
      const insertInfo: any = await new Promise((resolve, reject) => {
        this.conexion.query(insert, args, (err, res) => {
          if (err) {
            reject(err);
          } else {
            const actividadRegistrada = {
              id: res.insertId,
              idActividad: actividad.idActividad,
              idReporteParcial: actividad.idReporteParcial,
              cantidad: actividad.cantidad,
            };
            resolve(actividadRegistrada);
          }
        });
      });

      return insertInfo;
    }

    /** Obtener todos los valores de la tabla actividad_realizada de MySQL */
    public async obtenerActividadRealizada(id: number): Promise<ActividadesRealizadas> {
      const select = 'SELECT * FROM actividad_realizada WHERE id=?';
      const args = [id];
      const selectInfo: any = await new Promise((resolve, reject) => {
        this.conexion.query(select, args, (err, res) => {
          if (err) {
            reject(err);
          } else if (res.length < 1) {
            reject(new ItemNotFound());
          } else {
            const datosActividad = {
              id: res[0].id,
              idActividad: res[0].actividad_de_usuario_id,
              idReporteParcial: res[0].reporte_parcial_id,
              cantidad: res[0].cantidad,
            };
            resolve(datosActividad);
          }
        });
      });

      return selectInfo;
    }

    /** Actualizar todos los valores de un campo de la tabla actividad_realizada de MySQL */
    public async actualizarActividadRealizada(actividad: ActividadesRealizadas): Promise<ActividadesRealizadas> {
      const update = 'UPDATE actividad_realizada SET actividad_de_usuario_id=?, reporte_parcial_id=?, cantidad=? '
      + 'WHERE id=?';
      const args = [
        actividad.idActividad,
        actividad.idReporteParcial,
        actividad.cantidad,
        actividad.id,
      ];
      const updateInfo: any = await new Promise((resolve, reject) => {
        this.conexion.query(update, args, (err, res) => {
          if (err) {
            reject(err);
          } else if (res.affectedRows < 1) {
            reject(new ItemNotFound());
          } else {
            resolve(actividad);
          }
        });
      });

      return updateInfo;
    }

    /** Eliminar todos los valores de un campo de la tabla actividad_realizada de MySQL */
    public async eliminarActividadRealizada(id: number): Promise<boolean> {
      const del = 'DELETE FROM actividad_realizada WHERE id=?';
      const args = [id];
      const deleteInfo: any = await new Promise((resolve, reject) => {
        this.conexion.query(del, args, (err, res) => {
          if (err) {
            reject(err);
          } else if (res.affectedRows < 1) {
            reject(new ItemNotFound());
          } else {
            resolve(true);
          }
        });
      });

      return deleteInfo;
    }

    public async obtenerPorIDReporte(idReporte: number): Promise<ActividadesRealizadas[]> {
      const actividadesRealizadas: ActividadesRealizadas[] = [];
      const select = 'SELECT * FROM actividad_realizada WHERE idActividad=?';
      const args = [idReporte];
      const selectInfo: any = await new Promise((resolve, reject) => {
        this.conexion.query(select, args, (err, res) => {
          if (err) {
            reject(err);
          } else if (res.length < 1) {
            reject(new ItemNotFound());
          } else {
            res.array.forEach((actividad) => {
              const datosActividad = {
                id: actividad.id,
                idActividad: actividad.actividad_de_usuario_id,
                idReporteParcial: actividad.reporte_parcial_id,
                cantidad: actividad.cantidad,
              };
              if (datosActividad) {
                actividadesRealizadas.push(datosActividad);
              }
            });
            resolve(actividadesRealizadas);
          }
        });
      });

      return selectInfo;
    }

    async obtenerPorIdReporteParcial(idReporteParcial: number) {
      const query = 'SELECT * FROM actividad_realizada WHERE reporte_parcial_id = ?';
      const args = [idReporteParcial];
      const promesaActividadRealizada: any = await new Promise((resolve, reject) => {
        this.conexion.query(query, args, (err, res) => {
          if (err) {
            reject(err);
          } else if (res.length < 1) {
            reject(new ItemNotFound());
          } else {
            const arregloActividadesRealizadas: ActividadesRealizadas[] = [];
            res.forEach((element) => {
              arregloActividadesRealizadas.push({
                id: element.id,
                idReporteParcial: element.reporte_parcial_id,
                idActividad: element.actividad_de_usuario_id,
                cantidad: element.cantidad,
              });
            });
            resolve(arregloActividadesRealizadas);
          }
        });
      });

      return promesaActividadRealizada;
    }
}
