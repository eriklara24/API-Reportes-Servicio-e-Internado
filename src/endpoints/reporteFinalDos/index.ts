/* eslint-disable linebreak-style */
import crearReporteFinalDos from './crearReporteFinalDos';

const express = require('express');

const enrutadorReporteFinalDos = express.Router();

enrutadorReporteFinalDos.use(express.json());

enrutadorReporteFinalDos.post('/', crearReporteFinalDos);

export default enrutadorReporteFinalDos;
