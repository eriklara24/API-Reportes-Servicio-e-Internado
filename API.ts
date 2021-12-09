/* eslint-disable no-console */
import config from './configuracion';
import ChronoTrigger from './src/chrono-trigger';
import publicRouter from './src/endpoints/public';

const express = require('express');
const cors = require('cors');

const APIServer = express();

APIServer.use(cors({ 'Access-Control-Allow-Origin': '*' }));

APIServer.use('/public', publicRouter);

APIServer.get('/', (req, res) => {
  res.send('This is server health check, status: Okay');
});

ChronoTrigger.init();

APIServer.listen(config.port, config.host, () => {
  console.log(`API Reportes Servicio e Internado corriendo ${config.host}:${config.port}`);
});
