/* Archivo y clase Store para la tabla de Actividades de Usuario
 * Esta clase permite realizar todas las operaciones de tipo
 * CRUD a la tabla de actividad_de_usuario de la base de datos, para ser utilizada
 * como parte de la clase Database.
 *
 * Escrito por Ramón Paredes Sánchez.
 */

import mysql = require('mysql');
import ActividadesDeUsuario from '../resources/models/ActividadesDeUsuario';
import ObjetoNoEncontrado from './errors/ObjetoNoEncontrado';

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
      const consulta = 'INSERT INTO actividad_de_usuario(servicio_id, descripcion) VALUES (?, ?)';
      const args = [
        actividad.idServicio,
        actividad.descripcion,
      ];
      const insertInfo: any = await new Promise((resolve, reject) => {
        this.conexion.query(consulta, args, (err, res) => {
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
      const consulta = 'SELECT * FROM actividad_de_usuario WHERE id=?';
      const args = [id];
      const selectInfo: any = await new Promise((resolve, reject) => {
        this.conexion.query(consulta, args, (err, res) => {
          if (err) {
            reject(err);
          } else if (res.length < 1) {
            reject(new ObjetoNoEncontrado());
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

    /** Método para obtener las actividades de un usuario */
    public async obtenerPorIdUsuario(idUsuario: number): Promise<ActividadesDeUsuario[]> {
      const consulta = 'SELECT actividad_de_usuario.* FROM servicio JOIN actividad_de_usuario '
      + 'ON actividad_de_usuario.servicio_id = servicio.id '
      + 'WHERE servicio.usuario_id = ?';
      const datos: ActividadesDeUsuario[] = [];
      const promise: any = await new Promise((resolve, reject) => {
        this.conexion.query(consulta, [idUsuario], (err, res) => {
          if (err) {
            reject(err);
          } else if (res.length < 1) {
            resolve(datos);
          } else {
            for (let i = 0; i < res.length; i += 1) {
              const aux = {
                id: res[i].id,
                idServicio: res[i].servicio_id,
                descripcion: res[i].descripcion,
              };
              datos.push(aux);
            }
            resolve(datos);
          }
        });
      });

      return promise;
    }

    /** Método para obtener una actividad de usuario por el texto de la descripción */
    public async obtenerPorDescripcion(descripcion: string): Promise<ActividadesDeUsuario> {
      const consulta = 'SELECT * FROM `actividad_de_usuario` WHERE descripcion = ?';
      const promise: any = await new Promise((resolve, reject) => {
        this.conexion.query(consulta, [descripcion], (err, res) => {
          if (err) {
            reject(err);
          } else if (res.length < 1) {
            resolve(new ObjetoNoEncontrado());
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

      return promise;
    }

    /** Actualizar todos los valores de un campo de la tabla actividad_de_usuario de MySQL */
    // eslint-disable-next-line max-len
    public async actualizarActividadDeUsuario(actividad: ActividadesDeUsuario): Promise<ActividadesDeUsuario> {
      const consulta = 'UPDATE actividad_de_usuario SET servicio_id=?, descripcion=? WHERE id=?';
      const args = [
        actividad.idServicio,
        actividad.descripcion,
        actividad.id,
      ];
      const updateInfo: any = await new Promise((resolve, reject) => {
        this.conexion.query(consulta, args, (err, res) => {
          if (err) {
            reject(err);
          } else if (res.affectedRows < 1) {
            reject(new ObjetoNoEncontrado());
          } else {
            resolve(actividad);
          }
        });
      });

      return updateInfo;
    }

    /** Eliminar todos los valores de un campo de la tabla actividad_de_usuario de MySQL */
    public async eliminarActividadDeUsuario(id: number): Promise<boolean> {
      const consulta = 'DELETE FROM actividad_de_usuario WHERE id=?';
      const args = [id];
      const deleteInfo: any = await new Promise((resolve, reject) => {
        this.conexion.query(consulta, args, (err, res) => {
          if (err) {
            reject(err);
          } else if (res.affectedRows < 1) {
            reject(new ObjetoNoEncontrado());
          } else {
            resolve(true);
          }
        });
      });

      return deleteInfo;
    }
}
