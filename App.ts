/* eslint-disable no-console */
import config = require('./configuration.json');
import database from './src/database/index';
import appRouter from './src/endpoints/index';

import Dummy from './src/resources/entities/Dummy';

console.log(`Hola mundo. Estoy ejecutandome en ${config.host} en el puerto ${config.port}`);

// Creo que esto puede tronar cuando se mande a llamar la función.
// Por como arrojan el error en el store. Con "throw"

/* DummyStore Functions */
// Create
database.dummyStore.createDummy(new Dummy(5, 'test dummy number 5'), (err, res) => {
  if (!err) {
    console.log(`Create: ${res}`);
  }
});

// Update
database.dummyStore.updateDummy(new Dummy(5, 'test dummy number 5 updated'), (err, res) => {
  if (!err) {
    console.log(`Update: ${res}`);
  }
});

// Get
database.dummyStore.getDummy(5, (err, res : Dummy) => {
  if (!err) {
    console.log(`Get Dummy: ${res.getDummy()}`);
  } else {
    console.log(err);
  }
});

// Delete
database.dummyStore.deleteDummy(5, (err, res) => {
  if (!err) {
    console.log(res);
  }
});
