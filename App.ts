/* eslint-disable linebreak-style */
/* eslint-disable no-console */
import config = require('./configuration.json');
import APIServer from './src/endpoints/index';
import ChronoTrigger from './src/chrono-trigger';

ChronoTrigger.init();

APIServer.listen(config.port, config.host, () => {
  console.log(`API Reportes Servicio e Internado corriendo ${config.host}:${config.port}`);
});
