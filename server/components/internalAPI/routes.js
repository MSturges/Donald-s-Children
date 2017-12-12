const express = require('express');
const router = express.Router();
const fetchCoinByName = require('./controllers/fetchCoinByName');
const fetchChildren = require('./controllers/fetchChildren')

// All of our actions for the kraken
router.get('/coin/:name', fetchCoinByName);
router.get('/children', fetchChildren);


module.exports = router;
