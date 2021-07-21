/* eslint-disable linebreak-style */
/* eslint-disable no-console */
import config = require('./configuration.json');
import database from './src/database/index';
import APIServer from './src/endpoints/index';

database.almacenarTrimestre.crearTrimestre({ id: 1, fechaInicio: '21-05-01 00:00:00', fechaFin: '22-05-01 00:00:00' });
database.almacenarTrimestre.obtenerTrimestre(1).then((trimestre) => { console.log(trimestre); });
database.almacenarTrimestre.actualizarTrimestre({ id: 1, fechaInicio: '22-02-15', fechaFin: '22-02-16' });
database.almacenarTrimestre.obtenerTrimestre(1).then((trimestre) => { console.log(trimestre); });
database.almacenarTrimestre.eliminarTrimestre(1);

APIServer.listen(config.port, config.host, () => {
  console.log(`API Reporetes Servicio e Internado corriendo ${config.host}:${config.port}`);
});
