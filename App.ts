/* eslint-disable linebreak-style */
/* eslint-disable no-console */
import config = require('./configuration.json');
import database from './src/database/index';
import APIServer from './src/endpoints/index';

database.almacenarReporteFinalDos.crearReporteFinalDos({
  id: 1,
  metaAlcanzada: 'q',
  metodologiaUtilizada: 'q',
  innovacionAportada: 'q',
  conclusiones: 'q',
  propuestas: 'q',
  idServicio: 1,
});
database.almacenarReporteFinalDos.obtenerReporteFinalDos(1)
  .then((ReporteFinalDos) => { console.log(ReporteFinalDos); });
database.almacenarReporteFinalDos.actualizarReporteFinalDos({
  id: 1,
  metaAlcanzada: 'w',
  metodologiaUtilizada: 'w',
  innovacionAportada: 'w',
  conclusiones: 'w',
  propuestas: 'w',
  idServicio: 1,
});
database.almacenarReporteFinalDos.obtenerReporteFinalDos(1)
  .then((ReporteFinalDos) => { console.log(ReporteFinalDos); });
database.almacenarReporteFinalDos.eliminarReporteFinalDos(1);

APIServer.listen(config.port, config.host, () => {
  console.log(`API Reporetes Servicio e Internado corriendo ${config.host}:${config.port}`);
});
