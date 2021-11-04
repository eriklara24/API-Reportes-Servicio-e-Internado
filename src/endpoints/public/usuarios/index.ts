/* eslint-disable linebreak-style */
import autenticacion from '../../../autenticacion';
import crear from './crearUsuario';
import iniciarSesion from './iniciarSesion';
import actualizarUsuario from './actulizarUsuario';

const express = require('express');

const enrutadorUsuario = express.Router();

enrutadorUsuario.use(express.json());

enrutadorUsuario.put('/', autenticacion.jwtAutenticacion(['interno', 'prestador']), actualizarUsuario);
enrutadorUsuario.post('/', crear);
enrutadorUsuario.post('/iniciar-sesion', iniciarSesion);

export default enrutadorUsuario;
