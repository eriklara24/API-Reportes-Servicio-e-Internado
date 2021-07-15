const express = require('express');

const appRouter = express.Router();

app.use('/admin', adminRouter);
app.use('/public', publicRouter);