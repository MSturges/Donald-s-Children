const fetchCoinByName = require('../actions/fetchCoinByName');


module.exports = (req, res) => {

  fetchCoinByName(req.params.name)
    .then((result) => {
      res.json({ result: result } )
    })
    .catch((error) => {
      res.json({ error: error } )
  });
};
