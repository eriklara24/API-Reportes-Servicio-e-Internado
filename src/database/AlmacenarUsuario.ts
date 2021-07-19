/* eslint-disable linebreak-style */
import mysql = require('mysql');
import Usuario from '../resources/entities/Usuario';

export default class AlmacenarUsuario {
    private conection: mysql.Connection;

    constructor(databaseConfig: any) {
      this.conection = mysql.createConnection(databaseConfig);
      this.conection.connect((err) => {
        if (err) throw err;
      });
    }

    async crearUsuario(usuario: Usuario) {
      const insert = 'INSERT INTO usuario(id, rol) VALUES (?, ?)';
      try {
        await this.conection.query(insert, [String(usuario.getId()), usuario.getRol()]);
        console.log('usuario Creado');
      } catch (err) {
        console.log(err);
        throw (err);
      }
    }
    
    async obtenerUsuario(id: number) {
      const select = 'SELECT * FROM usuario WHERE id=?';
      try {
        return await this.conection.query(select, [id], (err, res) => {console.log(res)});
      } catch (err) {
        console.log(err);
        throw (err);
      }
    }

    async actualizarUsuario(usuario: Usuario) {
      const update = 'UPDATE usuario SET id=?, rol=? WHERE id=?';
      try {
        await this.conection.query(
          update, [String(usuario.getId()), usuario.getRol(), String(usuario.getId())],
        );
        console.log('usuario Actualizado');
      } catch (err) {
        console.log(err);
        throw (err);
      }
    }

    async eliminarUsuario(id: number) {
      const del = 'DELETE FROM usuario WHERE id=?';
      try {
        await this.conection.query(del, [id]);
        console.log('usuario Eliminado');
      } catch (err) {
        console.log(err);
        throw (err);
      }
    }
}
