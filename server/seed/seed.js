const mongoose = require('mongoose');
require('dotenv').config({path: '../../.env'})
const bitcoin = require('bitcoinjs-lib');


var huey = bitcoin.ECPair.makeRandom()
var hueyBTC = huey.toWIF()

var duey = bitcoin.ECPair.makeRandom()
var dueyBTC = duey.toWIF()

var luey = bitcoin.ECPair.makeRandom()
var lueyBTC = luey.toWIF()


//Connect to DB
mongoose.connect(process.env.MONGO_URI);

// Mongoose default promise library is depricated, set to es6
mongoose.Promise = global.Promise;

//Models
require('../models/children');
require('../models/coin');
require('../models/timeSeries');


// Create reference to model
const Coin = mongoose.model('coin');
const TimeSeries = mongoose.model('timeSeries');
const Child = mongoose.model('child');


const childSeedData = [
  {
    name: 'Huey',
    coin: 'ethereum',
    btcAccount: hueyBTC
  },
  {
    name: 'Luey',
    coin: 'litecoin',
    btcAccount: lueyBTC
  },
  {
    name: 'Duey',
    coin: 'dash',
    btcAccount: dueyBTC
  }
]

// Seed data, duh.
const coinSeedData = [
  {
    crypto: 'ethereum',
    siteName: 'Kraken',
    siteLink: 'https://www.kraken.com/'
  },
  {
    crypto: 'ethereum',
    siteName: 'Poloniex',
    siteLink: 'https://poloniex.com/exchange#btc_eth'
  },
  {
    crypto: 'ethereum',
    siteName: 'Coin Cap',
    siteLink: 'https://coincap.io/ETH'
  },
  {
    crypto: 'litecoin',
    siteName: 'Kraken',
    siteLink: 'https://www.kraken.com/'
  },
  {
    crypto: 'litecoin',
    siteName: 'Poloniex',
    siteLink: 'https://poloniex.com/exchange#btc_ltc'
  },
  {
    crypto: 'litecoin',
    siteName: 'Coin Cap',
    siteLink: 'https://coincap.io/LTC'
  },
  {
    crypto: 'dash',
    siteName: 'Kraken',
    siteLink: 'https://www.kraken.com/'
  },
  {
    crypto: 'dash',
    siteName: 'Poloniex',
    siteLink: 'https://poloniex.com/exchange#btc_dash'
  },
  {
    crypto: 'dash',
    siteName: 'Coin Cap',
    siteLink: 'https://coincap.io/DASH'
  },
];


// Seed MongoDB instance with 9 coins
const seedCoinData = () => {

  coinSeedData.forEach((cryptObject) => {
    let coin = new Coin({ coinName: cryptObject.crypto, siteName: cryptObject.siteName, siteLink: cryptObject.siteLink});

    coin.save()
          .then((response) => {
            console.log('!!!!!!!!response!!!!!!!!!!', response)
          })
          .catch((error) => {
            console.log('*********error*********', error);
          });
  });
};


const seedChildData = () => {

  childSeedData.forEach((childObject) => {
    let child = new Child({ name: childObject.name, coin: childObject.coin, btcAccount: childObject.btcAccount});

    child.save()
          .then((response) => {
            console.log('!!!!!!!!response!!!!!!!!!!', response)
          })
          .catch((error) => {
            console.log('*********error*********', error);
          });
  });
};





seedCoinData();
seedChildData();
