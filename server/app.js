const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.resolve(__dirname, '../public')));

const ownersRouter = require('./routes/owners');
const petsRouter = require('./routes/pets');

app.use('/api/owners', ownersRouter);
app.use('/api/pets', petsRouter);

app.get('/', function (req, res, next) {
    res.sendFile(path.join(__dirname, './index.html'));
});

app.use(function (err, req, res, next) {
    console.error(err, err.stack);
    res.status(500).send(err);
});

module.exports = app;
