/* eslint-disable linebreak-style */
import actualizarReporte from './actualizarReporte';
import crearReporte from './crearReporte';
import autenticacion from '../../../autenticacion';

const express = require('express');

const enrutadorReporte = express.Router();

enrutadorReporte.use(express.json());

enrutadorReporte.put('/:numeroReporte', autenticacion.jwtAutenticacion(['interno', 'prestador']), actualizarReporte);
enrutadorReporte.post('/:numeroReporte', autenticacion.jwtAutenticacion(['interno', 'prestador']), crearReporte);

export default enrutadorReporte;
