/* eslint-disable linebreak-style */
import adminRouter from './admin';
import publicRouter from './public';

const express = require('express');

const APIServer = express();

APIServer.use('/admin', adminRouter);
APIServer.use('/public', publicRouter);

APIServer.get('/', (req, res) => {
  res.send('This is server health check, status: Okay');
});

export default APIServer;
