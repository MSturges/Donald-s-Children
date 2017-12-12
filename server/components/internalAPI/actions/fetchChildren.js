const mongoose = require('mongoose');
require('../../../models/children');
const children = mongoose.model('child');

module.exports = () => {

 return children.find()

};
