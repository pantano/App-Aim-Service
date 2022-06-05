const express = require('express');
require('dotenv').config();
require('./db/db.config');

const port = process.env.PORT || 3000;

const app = express();

app.listen(port, (error) => {
    error ? console.log(error) : console.log(`Servidor en http://localhost:${port}`);
});