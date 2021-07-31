/* eslint-disable linebreak-style */
import actualizarReporte from './actualizarReporte';
import obtenerPorID from './obtenerPorID';
import crearReporte from './crearReporte';

const express = require('express');

const enrutadorReporte = express.Router();

enrutadorReporte.use(express.json());

enrutadorReporte.put('/', actualizarReporte);
enrutadorReporte.get('/:id/:rol', obtenerPorID);
enrutadorReporte.post('/', crearReporte);

export default enrutadorReporte;
