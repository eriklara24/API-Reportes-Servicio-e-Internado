import adminRouter from './admin';
import publicRouter from './public';
import dummyRouter from './dummy';

const express = require('express');

const APIServer = express();

APIServer.use('/admin', adminRouter);
APIServer.use('/public', publicRouter);
APIServer.use('/dummy', dummyRouter);

APIServer.get('/', (req, res) => {
  res.send ('This is server health check, status: Okay');
});

export default APIServer;
