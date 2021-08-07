/* eslint-disable linebreak-style */
import crearServicio from './crearServicio';
import actualizarServicio from './actualizarServicio';

const express = require('express');

const enrutadorServicio = express.Router();

enrutadorServicio.use(express.json());

enrutadorServicio.post('/', crearServicio);
enrutadorServicio.put('/', actualizarServicio);

export default enrutadorServicio;
