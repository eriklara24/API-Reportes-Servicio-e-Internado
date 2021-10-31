/* eslint-disable linebreak-style */
import crearReporteFinalDos from './crearReporteFinalDos';
import actualizarReporteFinalDos from './actualizarReporteFinalDos';
import obtenerReporteFinalDos from './obtenerReporteFinalDos';

const express = require('express');

const enrutadorReporteFinalDos = express.Router();

enrutadorReporteFinalDos.use(express.json());

enrutadorReporteFinalDos.post('/', crearReporteFinalDos);
enrutadorReporteFinalDos.put('/', actualizarReporteFinalDos);
enrutadorReporteFinalDos.get('/:idUsuario', obtenerReporteFinalDos);

export default enrutadorReporteFinalDos;
