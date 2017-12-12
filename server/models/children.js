const mongoose = require('mongoose');
const { Schema } = mongoose;

const ChildSchema = new Schema({
  name: String,
  coin: String,
  btcAccount: String,
});

mongoose.model('child', ChildSchema);
