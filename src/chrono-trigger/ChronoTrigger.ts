/* eslint-disable no-useless-catch */
/* Clase ChronoTrigger.
 * Esta clase permite ejecutar trabajos en fechas determinadas
 * de manera automatizada. Las tareas se definen como parte de la
 * interfaz "CronJob" y se almacenan en la carpeta "jobs"
 *
 * Escrito por Ramón Paredes Sánchez.
 */

import _CronJob from '../resources/models/CronJob';

const schedule = require('node-schedule');

export default class ChronoTrigger {
    private jobs: _CronJob[];

    constructor(jobs: _CronJob[]) {
      this.jobs = jobs;
    }

    public init() {
      try {
        this.jobs.forEach((CronJob: _CronJob) => {
          schedule.scheduleJob(CronJob.cron, CronJob.job);
        });
      } catch (err) {
        throw err;
      }
    }
}
