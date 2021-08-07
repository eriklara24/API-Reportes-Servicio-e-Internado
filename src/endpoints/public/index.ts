/* eslint-disable linebreak-style */
import enrutadorReporteFinalDos from './reporteFinalDos';
import enrutadorReporte from './reporte';
import enrutadorServicio from './servicio';

const express = require('express');

const publicRouter = express.Router();

publicRouter.use('/reporteFinalDos', enrutadorReporteFinalDos);
publicRouter.use('/reporte', enrutadorReporte);
publicRouter.use('/servicio', enrutadorServicio);

export default publicRouter;
