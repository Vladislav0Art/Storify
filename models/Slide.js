const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// creating schema
const SlideSchema = new Schema({
  title: {
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
  alt: {
    type: String,
    require: true
  },
  href: {
    type: String,
    require: false
  }
}, { timestamps: true } );


module.exports = Slide = mongoose.model('slide', SlideSchema);