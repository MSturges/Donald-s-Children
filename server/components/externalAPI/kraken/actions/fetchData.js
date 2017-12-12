const KrakenClient = require('kraken-exchange-api');
const kraken = new KrakenClient(process.env.KRAKEN_API_KEY, process.env.KRAKEN_PRIVATE_KEY);


//'XETHXXBT'

module.exports = (pair) => {

  return new Promise((resolve, reject) => {

    // Get Ticker Info
    kraken.api('Ticker', {
      'pair': pair
    }, (error, data) => {
      if (error) {
        reject(error);
      } else {
        resolve(data.result);
      }
    });

  });
};
