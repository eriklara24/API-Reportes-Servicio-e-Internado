/* eslint-disable max-len */
/* Archivo y clase Store para la tabla de Servicio General
 * Incluye las operaciones CRUD solo para la tabla de servicio de datos generales.
 * Esta clase permite realizar todas las operaciones de tipo
 * CRUD a la tabla de servicio de la base de datos, para ser utilizada
 * como parte de la clase Database.
 *
 * Escrito por Ramón Paredes Sánchez.
 */

import mysql = require('mysql');
import ServicioEInternado from '../resources/interfaces/ServicioEInternado';
import ItemNotFound from './errors/ItemNotFound';

export default class AlmacenamientoServicioGeneral {
    private conexion : mysql.Connection;

    constructor(dataBaseConfig: any) {
      this.conexion = mysql.createConnection(dataBaseConfig);
      this.conexion.connect((err) => {
        if (err) throw err;
      });
    }

    /** Insertar valores en la tabla servicio de MySQL */
    public async crearServicioGeneral(servicio: ServicioEInternado): Promise<ServicioEInternado> {
      const insert = 'INSERT INTO servicio(usuario_id, entidad_receptora, receptor, programa,'
      + 'objetivos_programa, fecha_inicio, fecha_fin, total_horas, horario_hora_inicio, horario_hora_fin)'
      + 'VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
      const args = [
        servicio.idUsuario,
        servicio.entidadReceptora,
        servicio.receptor,
        servicio.programa,
        servicio.objetivosDelPrograma,
        servicio.fechaInicio,
        servicio.fechaFin,
        servicio.totalDeHoras,
        servicio.horarioHoraInicio,
        servicio.horarioHoraFin,
      ];
      const insertInfo: any = await new Promise((resolve, reject) => {
        this.conexion.query(insert, args, (err, res) => {
          if (err) {
            reject(err);
          } else {
            const servicioRegistrado = {
              id: res.insertId,
              idUsuario: servicio.idUsuario,
              entidadReceptora: servicio.entidadReceptora,
              receptor: servicio.receptor,
              programa: servicio.programa,
              objetivosDelPrograma: servicio.objetivosDelPrograma,
              fechaInicio: servicio.fechaInicio,
              fechaFin: servicio.fechaFin,
              totalDeHoras: servicio.totalDeHoras,
              horarioHoraInicio: servicio.horarioHoraInicio,
              horarioHoraFin: servicio.horarioHoraFin,
            };
            resolve(servicioRegistrado);
          }
        });
      });

      return insertInfo;
    }

    /** Obtener todos los valores de la tabla servicio de MySQL */
    public async obtenerServicioGeneral(id: number): Promise<ServicioEInternado> {
      const select = 'SELECT * FROM servicio WHERE id=?';
      const args = [id];
      const selectInfo: any = await new Promise((resolve, reject) => {
        this.conexion.query(select, args, (err, res) => {
          if (err) {
            reject(err);
          } else if (res.length < 1) {
            reject(new ItemNotFound());
          } else {
            const datosServicio = {
              id: res[0].id,
              idUsuario: res[0].usuario_id,
              entidadReceptora: res[0].entidad_receptora,
              receptor: res[0].receptor,
              programa: res[0].programa,
              objetivosDelPrograma: res[0].objetivos_programa,
              fechaInicio: res[0].fecha_inicio,
              fechaFin: res[0].fecha_fin,
              totalDeHoras: res[0].total_horas,
              horarioHoraInicio: res[0].horario_hora_inicio,
              horarioHoraFin: res[0].horario_hora_fin,
            };
            resolve(datosServicio);
          }
        });
      });

      return selectInfo;
    }

    /** Actualizar todos los valores de un campo de la tabla servicio de MySQL */
    public async actualizarServicioGeneral(servicio: ServicioEInternado): Promise<ServicioEInternado> {
      const update = 'UPDATE servicio SET usuario_id=?, entidad_receptora=?, receptor=?, programa=?,'
      + 'objetivos_programa=?, fecha_inicio=?, fecha_fin=?, total_horas=?, horario_hora_inicio=?,'
      + 'horario_hora_fin=? WHERE id=?';
      const args = [
        servicio.idUsuario,
        servicio.entidadReceptora,
        servicio.receptor,
        servicio.programa,
        servicio.objetivosDelPrograma,
        servicio.fechaInicio,
        servicio.fechaFin,
        servicio.totalDeHoras,
        servicio.horarioHoraInicio,
        servicio.horarioHoraFin,
        servicio.id,
      ];
      const updateInfo: any = await new Promise((resolve, reject) => {
        this.conexion.query(update, args, (err, res) => {
          if (err) {
            reject(err);
          } else if (res.affectedRows < 1) {
            reject(new ItemNotFound());
          } else {
            resolve(servicio);
          }
        });
      });

      return updateInfo;
    }

    /** Eliminar todos los valores de un campo de la tabla servicio de MySQL */
    public async eliminarServicioGeneral(id: number): Promise<boolean> {
      const del = 'DELETE FROM servicio WHERE id=?';
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
