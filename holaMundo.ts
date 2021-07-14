import config = require('./configuration.json');
import DummyStore from './src/database/MySQL/store/DummyStore';
import Dummy from './src/resources/entities/Dummy';

const dummy = new DummyStore();

console.log(`Hola mundo. Estoy ejecutandome en ${config.host} en el puerto ${config.port}`);

/* DummyStore Functions */
// Create
dummy.createDummy(new Dummy(5, 'test dummy number 5'), (err, res) => {
  if (!err) {
    console.log(`Create: ${res}`);
  }
});

// Update
dummy.updateDummy(new Dummy(5, 'test dummy number 5 updated'), (err, res) => {
  if (!err) {
    console.log(`Update: ${res}`);
  }
});

// Get
dummy.getDummy(5, (err, res : Dummy) => {
  if (!err) {
    console.log(`Get Dummy: ${res.getDummy()}`);
  } else {
    console.log(err);
  }
});

// Delete
dummy.deleteDummy(5, (err, res) => {
  if (!err) {
    console.log(res);
  }
});
