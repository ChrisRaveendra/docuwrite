import mongoose from 'mongoose';


const userSchema = mongoose.Schema({
  email: String,
  username: String,
  password: String
});


module.exports = {
  User: mongoose.model('User', userSchema)
};
