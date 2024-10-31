/* eslint-disable linebreak-style */
import crear from './crearUsuario';
import iniciarSesion from './iniciarSesion';
import actualizarUsuario from './actulizarUsuario';
import obtenerActividadesUsuario from './obenerActividadesUsuario';
import autenticacion from '../../../autenticacion';
import obtenerUsuario from './obtenerUsuario';

const express = require('express');

const enrutadorUsuario = express.Router();

enrutadorUsuario.use(express.json());

enrutadorUsuario.get('/', autenticacion.jwtAutenticacion(['interno', 'prestador']), obtenerUsuario);
enrutadorUsuario.put('/', actualizarUsuario);
enrutadorUsuario.post('/', crear);
enrutadorUsuario.post('/iniciar-sesion', iniciarSesion);
enrutadorUsuario.get('/actividades', autenticacion.jwtAutenticacion(['interno', 'prestador']), obtenerActividadesUsuario);

export default enrutadorUsuario;
