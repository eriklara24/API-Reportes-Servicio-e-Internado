/* eslint-disable linebreak-style */
/* eslint-disable no-console */
import config = require('./configuration.json');
import database from './src/database/index';
import APIServer from './src/endpoints/index';

import Dummy from './src/resources/entities/Dummy';
import Usuario from './src/resources/entities/Usuario';

// /** Funciones para almacenarUsuario */
// // Crear
// database.almacenarUsuario.crearUsuario(new Usuario(4, 'revisor'));
// // Obtener
// const PromesaUsuario = database.almacenarUsuario.obtenerUsuario(4);
// PromesaUsuario.then((usuario) => {
//   console.log(usuario);
// });
// // Actualizar
// database.almacenarUsuario.actualizarUsuario(new Usuario(4, 'administrador'));
// // Obtener x2
// const PromesaUsuarioActualizado = database.almacenarUsuario.obtenerUsuario(4);
// PromesaUsuarioActualizado.then((usuario) => {
//   console.log(usuario);
// });
// // Eliminar
// database.almacenarUsuario.eliminarUsuario(4);

/* DummyStore Functions */
// Create
/* database.dummyStore.createDummy(new Dummy(5, 'test dummy number 5'), (err) => {
  if (!err) {
    console.log(`Created`);
  }
});

// Update
database.dummyStore.updateDummy(new Dummy(5, 'test dummy number 5 updated'), (err, res) => {
  if (!err) {
    console.log(`Update: ${res}`);
  }
});

// Get
database.dummyStore.getDummy(5, (err, res : Dummy) => {
  if (!err) {
    console.log(`Get Dummy: ${res.dummy}`);
  } else {
    console.log(err);
  }
});

// Delete
database.dummyStore.deleteDummy(5, (err, res) => {
  if (!err) {
    console.log(res);
  }
}); */

APIServer.listen(config.port, config.host, () => {
  console.log(`API Reporetes Servicio e Internado corriendo ${config.host}:${config.port}`);
});
