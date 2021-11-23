/* eslint-disable linebreak-style */
import iniciarSesion from './iniciarSesion';
import obtenerActividadesUsuario from './obenerActividadesUsuario';
import autenticacion from '../../../autenticacion';
import obtenerUsuario from './obtenerUsuario';

const express = require('express');

const enrutadorUsuario = express.Router();

enrutadorUsuario.use(express.json());

enrutadorUsuario.get('/', autenticacion.jwtAutenticacion(['interno', 'prestador']), obtenerUsuario);
enrutadorUsuario.post('/iniciar-sesion', iniciarSesion);
enrutadorUsuario.get('/actividades', autenticacion.jwtAutenticacion(['interno', 'prestador']), obtenerActividadesUsuario);

export default enrutadorUsuario;
