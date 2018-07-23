const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  firstName: String,
  lastName: String,
  lastModified : Date,
  created : Date,
});

const User = mongoose.model('users-data', userSchema);

export default User;