const mongoose = require('mongoose');
require('dotenv').config({path: '../../../../.env'})

//mongoose
mongoose.connect(process.env.MONGO_URI);
mongoose.Promise = global.Promise;

//Models
require('../../../models/coin');
require('../../../models/timeSeries');

const Coin = mongoose.model('coin');
const TimeSeries = mongoose.model('timeSeries');


module.exports = (coinName, siteName, price, volume) => {

  return new Promise((resolve, reject) => {

    Coin.findOne({coinName}).where('siteName').equals(siteName)
      .then((response) => {

        timeSeries = new TimeSeries({price, volume});
        response.timeSeries.push(timeSeries)

        Promise.all([response.save(), timeSeries.save()])
          .then((res) => {
            resolve(res);
          })
          .catch((err) => {
            reject(err);
          });

      }).catch((error) => {
        reject(error);
      });

  });
};
