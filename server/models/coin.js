const mongoose = require('mongoose');
const { Schema } = mongoose


const CoinSchema = new Schema({
  coinName: {
    type: String,
    validate: {
       validator: (coinName) => coinName.length > 2 ,
       message: 'Name must be longer than 2 characters.'
     },
     required: [true, 'Name is required.']
  },
  siteName: String,
  siteLink: String,
  timeSeries:[{
      type: Schema.Types.ObjectId,
      ref: 'timeSeries',
    }],
});


mongoose.model('coin', CoinSchema);
