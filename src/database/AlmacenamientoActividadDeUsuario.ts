/* Archivo y clase Store para la tabla de Actividades de Usuario
 * Esta clase permite realizar todas las operaciones de tipo
 * CRUD a la tabla de actividad_de_usuario de la base de datos, para ser utilizada
 * como parte de la clase Database.
 *
 * Escrito por Ramón Paredes Sánchez.
 */

import mysql = require('mysql');
import ActividadesDeUsuario from '../resources/interfaces/ActividadesDeUsuario';
import ItemNotFound from './errors/ItemNotFound';

export default class AlmacenamientoActividadDeUsuario {
    private conexion : mysql.Connection;

    constructor(dataBaseConfig: any) {
      this.conexion = mysql.createConnection(dataBaseConfig);
      this.conexion.connect((err) => {
        if (err) throw err;
      });
    }

    /** Insertar valores en la tabla actividad_de_usuario de MySQL */
    // eslint-disable-next-line max-len
    public async crearActividadDeUsuario(actividad: ActividadesDeUsuario): Promise<ActividadesDeUsuario> {
      const insert = 'INSERT INTO actividad_de_usuario(servicio_id, descripcion) VALUES (?, ?)';
      const args = [
        actividad.idServicio,
        actividad.descripcion,
      ];
      const insertInfo: any = await new Promise((resolve, reject) => {
        this.conexion.query(insert, args, (err, res) => {
          if (err) {
            reject(err);
          } else {
            const actividadRegistrada = {
              id: res.insertId,
              idServicio: actividad.idServicio,
              descripcion: actividad.descripcion,
            };
            resolve(actividadRegistrada);
          }
        });
      });

      return insertInfo;
    }

    /** Obtener todos los valores de la tabla actividad_de_usuario de MySQL */
    public async obtenerActividadDeUsuario(id: number): Promise<ActividadesDeUsuario> {
      const select = 'SELECT * FROM actividad_de_usuario WHERE id=?';
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
              idServicio: res[0].servicio_id,
              descripcion: res[0].descripcion,
            };
            resolve(datosActividad);
          }
        });
      });

      return selectInfo;
    }

    /** Actualizar todos los valores de un campo de la tabla actividad_de_usuario de MySQL */
    // eslint-disable-next-line max-len
    public async actualizarActividadDeUsuario(actividad: ActividadesDeUsuario): Promise<ActividadesDeUsuario> {
      const update = 'UPDATE actividad_de_usuario SET servicio_id=?, descripcion=? WHERE id=?';
      const args = [
        actividad.idServicio,
        actividad.descripcion,
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

    /** Eliminar todos los valores de un campo de la tabla actividad_de_usuario de MySQL */
    public async eliminarActividadDeUsuario(id: number): Promise<boolean> {
      const del = 'DELETE FROM actividad_de_usuario WHERE id=?';
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
