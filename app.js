const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const app = express();

app.use(express.static(`${__dirname}/public`));

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false, limit: '5mb' }));
app.use(bodyParser.json({ limit: '5mb' }));

app.set('view engine', 'pug');
app.set('views', `${__dirname}/views`);

app.get('/', (req, res) => res.render('index'));

module.exports = app;
