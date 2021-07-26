/* eslint-disable linebreak-style */
/* eslint-disable no-useless-catch */
import mysql = require('mysql');
import Usuario from '../resources/entities/Usuario';
import ItemNotFound from './errors/ItemNotFound';

export default class AlmacenamientoUsuario {
    private conection: mysql.Connection;

    constructor(databaseConfig: any) {
      this.conection = mysql.createConnection(databaseConfig);
      this.conection.connect((err) => {
        if (err) throw err;
      });
    }

    async crearUsuario(usuario: Usuario): Promise<Usuario> {
      const query = 'INSERT INTO usuario(id, rol) VALUES (?, ?)';
      const args = [
        String(usuario.getId()),
        usuario.getRol(),
      ];
      const promesaUsuario: any = await new Promise((resolve, reject) => {
        this.conection.query(query, args, (err) => {
          if (err) {
            reject(err);
          } else {
            resolve(usuario);
          }
        });
      });

      return promesaUsuario;
    }

    async obtenerUsuario(id: number): Promise<Usuario> {
      const query = 'SELECT * FROM usuario WHERE id=?';
      const promesaUsuario: any = await new Promise((resolve, reject) => {
        this.conection.query(query, [String(id)], (err, res) => {
          if (err) {
            reject(err);
          } else if (res.length < 1) {
            reject(new ItemNotFound());
          } else {
            const usuario = new Usuario(res[0].id, res[0].rol);
            resolve(usuario);
          }
        });
      });

      return promesaUsuario;
    }

    async actualizarUsuario(usuario: Usuario): Promise<Usuario> {
      const query = 'UPDATE usuario SET id=?, rol=? WHERE id=?';
      const args = [
        String(usuario.getId()),
        usuario.getRol(),
        String(usuario.getId()),
      ];
      const promesaUsuario: any = await new Promise((resolve, reject) => {
        this.conection.query(query, args, (err, res) => {
          if (err) {
            reject(err);
          } else if (res.affectedRows < 1) {
            reject(new ItemNotFound());
          } else {
            resolve(usuario);
          }
        });
      });

      return promesaUsuario;
    }

    async eliminarUsuario(id: number): Promise<boolean> {
      const query = 'DELETE FROM usuario WHERE id=?';
      const promesaUsuario: any = await new Promise((resolve, reject) => {
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

      return promesaUsuario;
    }
}
