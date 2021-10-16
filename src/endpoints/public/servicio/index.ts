/* eslint-disable linebreak-style */
import crearServicio from './crearServicio';
import actualizarServicio from './actualizarServicio';
import obtenerCompleto from './obtenerCompleto';

const express = require('express');

const enrutadorServicio = express.Router();

enrutadorServicio.use(express.json());

enrutadorServicio.post('/', crearServicio);
enrutadorServicio.put('/:idServicio', actualizarServicio);
enrutadorServicio.get('/:usuarioId', obtenerCompleto);

export default enrutadorServicio;
