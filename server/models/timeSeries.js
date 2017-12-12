const mongoose = require('mongoose');
const { Schema } = mongoose;


const TimeSeriesSchema = new Schema({
    date: {
      type: Date,
      default: Date.now
    },
    price: Number,
    volume: Number
});


mongoose.model('timeSeries', TimeSeriesSchema);
