const express = require('express');
const authRouter = require('./auth.router.js');
const userRouter = require('./user.router.js');

const app = express();

app.use('/auth/', authRouter);
app.use('/user/', userRouter);


module.exports = app;