/* eslint-disable linebreak-style */
/* eslint-disable no-console */
import config = require('./configuration.json');
import database from './src/database/index';
import APIServer from './src/endpoints/index';

APIServer.listen(config.port, config.host, () => {
  console.log(`API Reporetes Servicio e Internado corriendo ${config.host}:${config.port}`);
});
