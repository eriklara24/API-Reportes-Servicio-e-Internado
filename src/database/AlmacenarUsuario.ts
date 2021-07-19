/* eslint-disable linebreak-style */
/* eslint-disable no-useless-catch */
import mysql = require('mysql');
import Usuario from '../resources/entities/Usuario';
import ItemNotFound from './errors/ItemNotFound';

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
      } catch (err) {
        throw (err);
      }
    }

    async obtenerUsuario(id: number): Promise<Usuario> {
      const select = 'SELECT * FROM usuario WHERE id=?';
      const dataUsuario: any = await new Promise((resolve, reject) => {
        this.conection.query(select, [String(id)], (err, res) => {
          if (err) {
            throw err;
          }
          if (res.length < 1) {
            reject(new ItemNotFound());
          }
          const usuario = new Usuario(res[0].id, res[0].rol);
          resolve(usuario);
        });
      });

      const nuevoUsuario: Usuario = new Usuario(
        dataUsuario.id,
        dataUsuario.rol,
      );

      return nuevoUsuario;
    }

    async actualizarUsuario(usuario: Usuario) {
      const update = 'UPDATE usuario SET id=?, rol=? WHERE id=?';
      try {
        await this.conection.query(
          update, [String(usuario.getId()), usuario.getRol(), String(usuario.getId())],
        );
      } catch (err) {
        throw (err);
      }
    }

    async eliminarUsuario(id: number) {
      const del = 'DELETE FROM usuario WHERE id=?';
      try {
        await this.conection.query(del, [id]);
      } catch (err) {
        throw (err);
      }
    }
}
