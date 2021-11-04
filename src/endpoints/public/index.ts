/* eslint-disable linebreak-style */
import enrutadorReporteFinalDos from './reporteFinalDos';
import enrutadorReporte from './reporte';
import enrutadorServicio from './servicio';
import enrutadorUsuario from './usuarios';

const express = require('express');

const publicRouter = express.Router();

publicRouter.use('/reporte-final-2', enrutadorReporteFinalDos);
publicRouter.use('/reporte-parcial', enrutadorReporte);
publicRouter.use('/servicio', enrutadorServicio);
publicRouter.use('/usuarios', enrutadorUsuario);

export default publicRouter;
