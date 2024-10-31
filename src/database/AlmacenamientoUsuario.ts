/* eslint-disable linebreak-style */
/* eslint-disable no-useless-catch */
import mysql = require('mysql');
import Usuario from '../resources/models/Usuario';
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
      const consulta = 'INSERT INTO usuario(rol, nombreUsuario, contrasena, preguntaSeguridadUno, preguntaSeguridadDos, nombre, carrera, codigo) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
      const args = [
        usuario.rol,
        usuario.nombreUsuario,
        usuario.contrasena,
        usuario.preguntaSeguridadUno,
        usuario.preguntaSeguridadDos,
        usuario.nombre,
        usuario.carrera,
        usuario.codigo,
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
            const usuario: Usuario = {
              id: res[0].id,
              rol: res[0].rol,
              nombreUsuario: res[0].nombreUsuario,
              contrasena: res[0].contrasena,
              preguntaSeguridadUno: res[0].preguntaSeguridadUno,
              preguntaSeguridadDos: res[0].preguntaSeguridadDos,
              nombre: res[0].nombre,
              carrera: res[0].carrera,
              codigo: res[0].codigo,
            };

            resolve(usuario);
          }
        });
      });

      return promesaUsuario;
    }

    async obtenerUsuarioPorNombreUsuario(nombreUsuario: number): Promise<Usuario> {
      const consulta = 'SELECT * FROM usuario WHERE nombreUsuario=?';
      const promesaUsuario: any = await new Promise((resolve, reject) => {
        this.conection.query(consulta, [String(nombreUsuario)], (err, res) => {
          if (err) {
            reject(err);
          } else if (res.length < 1) {
            reject(new ObjetoNoEncontrado());
          } else {
            const usuario: Usuario = {
              id: res[0].id,
              rol: res[0].rol,
              nombreUsuario: res[0].nombreUsuario,
              contrasena: res[0].contrasena,
              preguntaSeguridadUno: res[0].preguntaSeguridadUno,
              preguntaSeguridadDos: res[0].preguntaSeguridadDos,
              nombre: res[0].nombre,
              carrera: res[0].carrera,
              codigo: res[0].codigo,
            };

            resolve(usuario);
          }
        });
      });

      return promesaUsuario;
    }

    async actualizarUsuario(usuario: Usuario): Promise<Usuario> {
      const consulta = 'UPDATE usuario SET contrasena=?, nombre=?, carrera=?, codigo=? WHERE id=?';
      const args = [
        usuario.contrasena,
        usuario.nombre,
        usuario.carrera,
        usuario.codigo,
        usuario.id,
      ];
      const promesaUsuario: any = await new Promise((resolve, reject) => {
        this.conection.query(consulta, args, (err, res) => {
          if (err) {
            reject(err);
          } else if (res.affectedRows < 1) {
            reject(new ObjetoNoEncontrado());
          } else {
            console.log(res);
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
