const express = require('express');

const db = require('./data/dbConfig.js');

const accountRouter = require('./accounts/account-router');

const server = express();

server.use(express.json());

server.use('/api/accounts', accountRouter);

server.get('/', (req, res) => {
    res.send('<h2>Webdi-i-challenge</h2>');
});

module.exports = server;