require('dotenv').config();
// Dependencies
const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const compression = require('compression');
const cors = require('cors');
const helpers = require('../helpers');
const mongoose = require('mongoose');
const dev = process.env.NODE_ENV === 'development';
const fetchDataInterval = require('./components/externalAPI/sharedActions/fetchDataInterval');

// When server Starts run interval
fetchDataInterval()

const app = express();


const internalAPI = require('./components/internalAPI/routes');


// Connect to mlab MongoDb server & use es6 promises
mongoose.connect(process.env.MONGO_URI);
mongoose.Promise = global.Promise;


//Models
require('./models/children');
require('./models/coin');
require('./models/timeSeries');


// Middleware
app.use(cors());
app.use(logger('dev'));
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(express.static(dev ? helpers.root('client') : helpers.root('dist')));
app.use(cookieParser());


app.use('/api/internal', internalAPI);


app.all('*', (req, res, next) => {
    res.sendFile('index.html', {
        root: dev ? helpers.root('client') : helpers.root('dist')
    });
});

module.exports = app;
