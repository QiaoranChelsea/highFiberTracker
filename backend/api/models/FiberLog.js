const mongoose = require('mongoose');

const FiberLogSchema = new mongoose.Schema({
  userId: {
    type: String,
    default: -1
  },  
  fiberAmount: {
    type: Number,
    default: 0
  },
  recordDate: {
    type: Date,
    default: Date.now()
  },  

});


module.exports = mongoose.model('FiberLog', FiberLogSchema);
