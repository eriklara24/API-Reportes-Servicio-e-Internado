import adminRouter from './admin';
import publicRouter from './public';

const express = require('express');

const appRouter = express.Router();

appRouter.use('/admin', adminRouter);
appRouter.use('/public', publicRouter);

export default appRouter;
