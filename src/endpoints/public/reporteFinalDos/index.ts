/* eslint-disable linebreak-style */
import crearReporteFinalDos from './crearReporteFinalDos';
import actualizarReporteFinalDos from './actualizarReporteFinalDos';
import autenticacion from '../../../autenticacion';

const express = require('express');

const enrutadorReporteFinalDos = express.Router();

enrutadorReporteFinalDos.use(express.json());

enrutadorReporteFinalDos.post('/', autenticacion.jwtAutenticacion(['interno', 'prestador']), crearReporteFinalDos);
enrutadorReporteFinalDos.put('/', autenticacion.jwtAutenticacion(['interno', 'prestador']), actualizarReporteFinalDos);

export default enrutadorReporteFinalDos;
