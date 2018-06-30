const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
  name: String,
  brand: String,
  price: Number,
  lastModified : Date,
  created : Date,
});

const Product = mongoose.model('users-data', productSchema);

export default Product;