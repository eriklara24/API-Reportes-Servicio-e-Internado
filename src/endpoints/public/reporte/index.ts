/* eslint-disable linebreak-style */
import actualizarReporte from './actualizarReporte';
import obtenerPorID from './obtenerPorID';
import crearReporte from './crearReporte';
import obtenerPorNumero from './obtenerPorNumero';
import autenticacion from '../../../autenticacion';

const express = require('express');

const enrutadorReporte = express.Router();

enrutadorReporte.use(express.json());

enrutadorReporte.put('/:numeroReporte', autenticacion.jwtAutenticacion(['interno', 'prestador']), actualizarReporte);
enrutadorReporte.get('/:idUsuario/:numeroReporte', obtenerPorNumero);
enrutadorReporte.get('/:id/:rol', obtenerPorID);
enrutadorReporte.post('/', autenticacion.jwtAutenticacion(['interno', 'prestador']), crearReporte);

export default enrutadorReporte;
