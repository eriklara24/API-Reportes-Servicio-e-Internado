import obtenerPorID from './obtenerPorID';

const express = require('express');

const dummyRouter = express.Router();

dummyRouter.get(
  '/:dummyID', // Esta es la ruta, en este caso los dos puntos indican que se la va a pasar un parametro. El orden de las rutas en el archivo también importan
  obtenerPorID, // xq usa el primero que encuentra
);

export default dummyRouter;
