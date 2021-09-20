/* eslint-disable linebreak-style */
/* eslint-disable no-useless-catch */
import mysql = require('mysql');
import Usuario from '../resources/entities/Usuario';
import ObjetoNoEncontrado from './errors/ObjetoNoEncontrado';

export default class AlmacenamientoUsuario {
    private conection: mysql.Connection;

    constructor(databaseConfig: any) {
      this.conection = mysql.createConnection(databaseConfig);
      this.conection.connect((err) => {
        if (err) throw err;
      });
    }

    async crearUsuario(usuario: Usuario): Promise<Usuario> {
      const consulta = 'INSERT INTO usuario(id, rol) VALUES (?, ?)';
      const args = [
        String(usuario.getId()),
        usuario.getRol(),
      ];
      const promesaUsuario: any = await new Promise((resolve, reject) => {
        this.conection.query(consulta, args, (err) => {
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
      const consulta = 'SELECT * FROM usuario WHERE id=?';
      const promesaUsuario: any = await new Promise((resolve, reject) => {
        this.conection.query(consulta, [String(id)], (err, res) => {
          if (err) {
            reject(err);
          } else if (res.length < 1) {
            reject(new ObjetoNoEncontrado());
          } else {
            const usuario = new Usuario(res[0].id, res[0].rol);
            resolve(usuario);
          }
        });
      });

      return promesaUsuario;
    }

    async actualizarUsuario(usuario: Usuario): Promise<Usuario> {
      const consulta = 'UPDATE usuario SET id=?, rol=? WHERE id=?';
      const args = [
        String(usuario.getId()),
        usuario.getRol(),
        String(usuario.getId()),
      ];
      const promesaUsuario: any = await new Promise((resolve, reject) => {
        this.conection.query(consulta, args, (err, res) => {
          if (err) {
            reject(err);
          } else if (res.affectedRows < 1) {
            reject(new ObjetoNoEncontrado());
          } else {
            resolve(usuario);
          }
        });
      });

      return promesaUsuario;
    }

    async eliminarUsuario(id: number): Promise<boolean> {
      const consulta = 'DELETE FROM usuario WHERE id=?';
      const promesaUsuario: any = await new Promise((resolve, reject) => {
        this.conection.query(consulta, [String(id)], (err, res) => {
          if (err) {
            reject(err);
          } else if (res.affectedRows < 1) {
            reject(new ObjetoNoEncontrado());
          } else {
            resolve(true);
          }
        });
      });

      return promesaUsuario;
    }
}
