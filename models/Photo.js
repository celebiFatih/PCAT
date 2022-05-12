const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PhotoScema = new Schema({
  title: String,
  desc: String,
  image: String,
  dateCreated: {
    type: Date,
    default: Date.now, // her foto yuklendiğinde yuklenme tarihini default olarak al
  },
});

const Photo = mongoose.model('Photo', PhotoScema);


module.exports = Photo;