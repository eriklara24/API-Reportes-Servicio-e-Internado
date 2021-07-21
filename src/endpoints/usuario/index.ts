/* eslint-disable linebreak-style */
import obtenerPorID from './obtenerPorID';
import crearUsuario from './crearUsuario';
import eliminarPorID from './eliminarPorID';
import actualizarUsuario from './actualizarUsuario';

const express = require('express');

const usuarioRouter = express.Router();

usuarioRouter.use(express.json());

usuarioRouter.get('/:usuarioID', obtenerPorID);
usuarioRouter.post('/', crearUsuario);
usuarioRouter.delete('/:usuarioID', eliminarPorID);
usuarioRouter.put('/', actualizarUsuario);

export default usuarioRouter;
