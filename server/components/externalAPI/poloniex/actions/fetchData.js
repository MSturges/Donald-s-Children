const Poloniex = require('poloniex.js');
const poloniex = new Poloniex();


module.exports = () => {

  return new Promise((resolve, reject) => {

    poloniex.returnTicker((err, data) => {
      if (err){
        reject(err)
      } else {
        let { BTC_ETH, BTC_LTC, BTC_DASH} = data;

        resolve({BTC_ETH, BTC_LTC, BTC_DASH})
      }
    });



  });
};
