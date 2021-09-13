/* eslint-disable linebreak-style */
import crearReporteFinalDos from './crearReporteFinalDos';
import actualizarReporteFinalDos from './actualizarReporteFinalDos';

const express = require('express');

const enrutadorReporteFinalDos = express.Router();

enrutadorReporteFinalDos.use(express.json());

enrutadorReporteFinalDos.post('/', crearReporteFinalDos);
enrutadorReporteFinalDos.put('/', actualizarReporteFinalDos);

export default enrutadorReporteFinalDos;
