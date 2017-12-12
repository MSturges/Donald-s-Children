const axios = require('axios');


module.exports = (pair) => {
  return axios.get(`http://coincap.io/page/${pair}`);
};
