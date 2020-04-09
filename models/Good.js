const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create new schema
const GoodSchema = new Schema({
  cat: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  descr: {
    type: String,
    required: true
  },
  img: {
    type: Object,
    required: true
  },
  href: {
    type: String,
    required: true
  },
  cost: {
    type: Number,
    required: true
  }
  // date: {
  //   type: Date,
  //   default: Date.now
  // }
}, { timestamps: true });

module.exports = Good = mongoose.model('good', GoodSchema);