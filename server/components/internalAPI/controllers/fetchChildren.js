const fetchChildren = require('../actions/fetchChildren');


module.exports = (req, res) => {

  fetchChildren()
    .then((result) => {
      res.json({ result: result } )
    })
    .catch((error) => {
      res.json({ error: error } )
  });
};
