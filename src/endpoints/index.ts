/* eslint-disable linebreak-style */
import adminRouter from './admin';
import publicRouter from './public';
import enrutadorServicio from './servicio';
import enrutadorReporte from './reporte';
import enrutadorReporteFinalDos from './reporteFinalDos';

const express = require('express');

const APIServer = express();

APIServer.use('/admin', adminRouter);
APIServer.use('/public', publicRouter);
APIServer.use('/servicio', enrutadorServicio);
APIServer.use('/reporteFinalDos', enrutadorReporteFinalDos);
APIServer.use('/reporte', enrutadorReporte);

APIServer.get('/', (req, res) => {
  res.send('This is server health check, status: Okay');
});

export default APIServer;
