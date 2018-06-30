const mongoose = require('mongoose');

const citySchema = mongoose.Schema({
  name: String,
  country: String,
  capital: Boolean,
  location: {
      lat: Number,
      long: Number,
  },
  lastModified : Date,
  created : Date,
});

const City = mongoose.model('cities-data', citySchema);

export default City;