/* eslint-disable max-len */
/* Archivo y clase Store para la tabla de Atenciones Realizadas
 * Esta clase permite realizar todas las operaciones de tipo
 * CRUD a la tabla de atencion_realizada de la base de datos, para ser utilizada
 * como parte de la clase Database.
 *
 * Escrito por Ramón Paredes Sánchez.
 */

import mysql = require('mysql');
import AtencionesRealizadas from '../resources/interfaces/AtencionesRealizadas';
import ItemNotFound from './errors/ItemNotFound';

export default class AlmacenamientoAtencionRealizada {
    private conexion : mysql.Connection;

    constructor(dataBaseConfig: any) {
      this.conexion = mysql.createConnection(dataBaseConfig);
      this.conexion.connect((err) => {
        if (err) throw err;
      });
    }

    /** Insertar valores en la tabla atencion_realizada de MySQL */
    public async crearAtencionRealizada(atencion: AtencionesRealizadas): Promise<AtencionesRealizadas> {
      const insert = 'INSERT INTO atencion_realizada(usuario_id, trimestre_id, tipo, cantidad) '
      + 'VALUES(?, ?, ?, ?)';
      const args = [
        atencion.idUsuario,
        atencion.idReporteParcial,
        atencion.tipo,
        atencion.cantidad,
      ];
      const insertInfo: any = await new Promise((resolve, reject) => {
        this.conexion.query(insert, args, (err, res) => {
          if (err) {
            reject(err);
          } else {
            const atencionRegistrada = {
              id: res.insertId,
              idTrimestre: atencion.idReporteParcial,
              idUsuario: atencion.idUsuario,
              tipo: atencion.tipo,
              cantidad: atencion.cantidad,
            };
            resolve(atencionRegistrada);
          }
        });
      });

      return insertInfo;
    }

    /** Obtener todos los valores de la tabla atencion_realizada de MySQL */
    public async obtenerAtencionRealizada(id: number): Promise<AtencionesRealizadas> {
      const select = 'SELECT * FROM atencion_realizada WHERE id=?';
      const args = [id];
      const selectInfo: any = await new Promise((resolve, reject) => {
        this.conexion.query(select, args, (err, res) => {
          if (err) {
            reject(err);
          } else if (res.length < 1) {
            reject(new ItemNotFound());
          } else {
            const datosAtencion = {
              id: res[0].id,
              idTrimestre: res[0].trimestre_id,
              idUsuario: res[0].usuario_id,
              tipo: res[0].tipo,
              cantidad: res[0].cantidad,
            };
            resolve(datosAtencion);
          }
        });
      });

      return selectInfo;
    }

    /** Actualizar todos los valores de un campo de la tabla atencion_realizada de MySQL */
    public async actualizarAtencionRealizada(atencion: AtencionesRealizadas): Promise<AtencionesRealizadas> {
      const update = 'UPDATE atencion_realizada SET usuario_id=?, trimestre_id=?, tipo=?, cantidad=? '
      + 'WHERE id=?';
      const args = [
        atencion.idUsuario,
        atencion.idReporteParcial,
        atencion.tipo,
        atencion.cantidad,
        atencion.id,
      ];
      const updateInfo: any = await new Promise((resolve, reject) => {
        this.conexion.query(update, args, (err, res) => {
          if (err) {
            reject(err);
          } else if (res.affectedRows < 1) {
            reject(new ItemNotFound());
          } else {
            resolve(atencion);
          }
        });
      });

      return updateInfo;
    }

    /** Eliminar todos los valores de un campo de la tabla atencion_realizada de MySQL */
    public async eliminarAtencionRealizada(id: number): Promise<boolean> {
      const del = 'DELETE FROM atencion_realizada WHERE id=?';
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
}
