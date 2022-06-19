const express = require('express');
const authRouter = require('./auth.router.js');
const reportRouter = require('./report.router.js');

const app = express();

app.use('/auth/', authRouter);
app.use('/report/', reportRouter);


module.exports = app;