/* eslint-disable linebreak-style */
import actualizarReporte from './actualizarReporte';

const express = require('express');

const enrutadorReporte = express.Router();

enrutadorReporte.use(express.json());

enrutadorReporte.put('/', actualizarReporte);

export default enrutadorReporte;
