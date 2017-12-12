const mongoose = require('mongoose');

//Models
require('../../../models/coin');
require('../../../models/timeSeries');

// Actions
const insertTimeSeries = require('./insertTimeSeries');
const krakenData = require('../kraken/actions/fetchData');
const poloniexData = require('../poloniex/actions/fetchData');
const coinCapData = require('../coinCap/actions/fetchData');

// Matching out pairings for our mongoDB databse(Kraken uses this)
const findCoinName = (pair) => {
  switch (pair) {
    case 'XETHXXBT':
      return 'ethereum';
      break;

    case 'XLTCXXBT':
      return 'litecoin';
      break;

    case 'DASHXBT':
      return 'dash';
      break;
  }
};

// Calling our action to get data for all 3 coins
const gatherKrakenDataAndInsert = () => {

  return new Promise((resolve, reject) => {

    Promise.all([krakenData('XETHXXBT'), krakenData('XLTCXXBT'), krakenData('DASHXBT')]).then((res) => {
      // Array of promises
      let insertPromises = [];

      // Pushing all of our insertTimeSeries into insertPromise array, getting the ball moving
      res.forEach((item) => {
        for (let pair in item) {
          insertPromises.push(insertTimeSeries(findCoinName(pair), 'Kraken', item[pair].c[0]));
        }
      });

      // Waiting for all of our insertTimeSeries to return.
      Promise.all(insertPromises).then((resolvedInsertPromises) => {
        resolve(resolvedInsertPromises);
      }).catch((insertPromiseErrs) => {
        reject(insertPromiseErrs);
      });
    }).catch((err) => {
      reject(err);
    });

  });
};

// Calling our action to get our data
const gatherPoloniexDataAndInsert = () => {
  return new Promise((resolve, reject) => {

    poloniexData().then((res) => {
      let promiseArray = []

      for (let item in res) {
        if (item == 'BTC_ETH') {
          promiseArray.push(insertTimeSeries('ethereum', 'Poloniex', res[item].last));
        } else if (item == 'BTC_LTC') {
          promiseArray.push(insertTimeSeries('litecoin', 'Poloniex', res[item].last));
        } else if (item == 'BTC_DASH') {
          promiseArray.push(insertTimeSeries('dash', 'Poloniex', res[item].last));
        }
      };

      Promise.all(promiseArray).then((insertRes) => {
        resolve(insertRes);
      }).catch((insertErr) => {
        reject(insertErr);
      });

    }).catch((err) => {
      console.log('err', err);
      reject(err);
    });
  });
};

// Calling our action to get our databse
const gatherCoinCapDataAndInsert = () => {

  return new Promise((resolve, reject) => {

    Promise.all([coinCapData('ETH'), coinCapData('LTC'), coinCapData('DASH')]).then((res) => {

      let promiseArray = [];

      res.forEach((item, key) => {
        if (item.data.id === 'ETH') {
          promiseArray.push(insertTimeSeries('ethereum', 'Coin Cap', item.data.price_btc));
        } else if (item.data.id === 'LTC') {
          promiseArray.push(insertTimeSeries('litecoin', 'Coin Cap', item.data.price_btc));
        } else if (item.data.id === 'DASH') {
          promiseArray.push(insertTimeSeries('dash', 'Coin Cap', item.data.price_btc));
        }
      });

      Promise.all(promiseArray).then((insertRes) => {
        resolve(insertRes)
      }).catch((inserErr) => {
        reject(insertErr)
      });
    }).catch((err) => {
      reject(err);
    });
  });
};

// Recursive helper
const fetchAndInsertRetryHelper = (fetchAndInsertFunction, siteName, cb, successResults = [], errors = [], retryCount = 1, retrySuccessful = false) => {
  // Base case to end the recursive iterations if 10 retries have happened or the previous retry was successful

  // if retry has tried 10 times or if retry has been successful then we will call our callback function with the appriate message
  if (retryCount > 10 || retrySuccessful) {
    let returnVal = {};


    if (retrySuccessful) {
      returnVal = {
        retrySuccessful,
        successResults,
        errors,
        msg: `Successful call to ${siteName} after initial failed call. Took ${retryCount} times to retry until a successful call was made.`
      };
    } else {
      returnVal = {
        retrySuccessful,
        successResults,
        errors,
        msg: `Failed 10 consecutive times after initial failed call to ${siteName}.`
      };
    }
    // call our call back function
    return cb(returnVal);
  }


  // after one minute make an attempt to fetch and insert data
  setTimeout(() => {
    fetchAndInsertFunction().then((fetchAndInsertRes) => {
      // Not trying to mutate the parameter to prevent memory pointer bugs.
      let newSuccessResults = successResults.slice();
      newSuccessResults.push(fetchAndInsertRes);
      // if successful, add success to successResults and recursively call this function again, incrementing the retry count and setting retry retrySuccessful to true
      return fetchAndInsertRetryHelper(fetchAndInsertFunction, siteName, cb, newSuccessResults, errors, retryCount + 1, true);
    }).catch((fetchAndInsertErr) => {
      // Not trying to mutate the parameter to prevent memory pointer bugs.
      let newErrs = errors.slice();
      newErrs.push(fetchAndInsertErr);
      // if retry failed, add error to errors and recursively call this function again, incrementing the retry count and setting retry retrySuccessful to false
      return fetchAndInsertRetryHelper(fetchAndInsertFunction, siteName, cb, successResults, newErrs, retryCount + 1, false);
    });
  }, 60000);
  // 1 min in milliseconds: 60000
};

//
const gatherAllDataAndInsert = () => {


  gatherKrakenDataAndInsert().then((res) => {
    console.log('GatherKrakenData_Response', res);
    console.log('\n\n\n\n\n\n\n\n');
  }).catch((err) => {
    fetchAndInsertRetryHelper(gatherKrakenDataAndInsert, 'Kraken', (retryRes) => {
      console.log('GatherKrakenData_RetryRes', retryRes);
      console.log('\n\n\n\n\n\n\n\n');
    })
  });


  gatherPoloniexDataAndInsert().then((res) => {
    console.log('GatherPoloniexData_Response', res);
    console.log('\n\n\n\n\n\n\n\n');
  }).catch((err) => {
    fetchAndInsertRetryHelper(gatherPoloniexDataAndInsert, 'Poloniex', (retryRes) => {
      console.log('GatherPoloniexData_RetryRes', retryRes);
      console.log('\n\n\n\n\n\n\n\n');
    })
  });


  gatherCoinCapDataAndInsert().then((res) => {
    console.log('GatherCoinCapData_Response', res)
    console.log('\n\n\n\n\n\n\n\n');
  }).catch((err) => {
    fetchAndInsertRetryHelper(gatherCoinCapDataAndInsert, 'Coin Cap', (retryRes) => {
      console.log('GatherCoinCapData_RetryRes', retryRes);
      console.log('\n\n\n\n\n\n\n\n');
    })
  });
};

const initialize = () => {

  // Run when first loaded
  gatherAllDataAndInsert();

  // 15 minute interval
  setInterval(() => {
    gatherAllDataAndInsert();

  }, 180000);
};

module.exports = initialize;
