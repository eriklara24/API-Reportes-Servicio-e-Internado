/* eslint-disable linebreak-style */
import autenticacion from '../../../autenticacion';
import crearServicio from './crearServicio';
import actualizarServicio from './actualizarServicio';
import obtenerCompleto from './obtenerCompleto';

const express = require('express');

const enrutadorServicio = express.Router();

enrutadorServicio.use(express.json());

enrutadorServicio.post('/', autenticacion.jwtAutenticacion(['interno', 'prestador']), crearServicio);
enrutadorServicio.put('/:idServicio', autenticacion.jwtAutenticacion(['interno', 'prestador']), actualizarServicio);
enrutadorServicio.get('/:usuarioId', obtenerCompleto);

export default enrutadorServicio;
