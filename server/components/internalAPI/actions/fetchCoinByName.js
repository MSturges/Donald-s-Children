const mongoose = require('mongoose');
require('../../../models/coin');
require('../../../models/timeSeries');
const Coin = mongoose.model('coin');

module.exports = (coinName) => {

 return Coin.find({ coinName })
  .populate({
    path: 'timeSeries'
  });
};
