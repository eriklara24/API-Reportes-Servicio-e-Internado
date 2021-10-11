/* eslint-disable linebreak-style */
import enrutadorReporteFinalDos from './reporteFinalDos';
import enrutadorReporte from './reporte';
import enrutadorServicio from './servicio';

const express = require('express');
const cors = require('cors');

const publicRouter = express.Router();
publicRouter.use(cors());

publicRouter.use('/reporte-final-2', enrutadorReporteFinalDos);
publicRouter.use('/reporte-parcial', enrutadorReporte);
publicRouter.use('/servicio', enrutadorServicio);

export default publicRouter;
