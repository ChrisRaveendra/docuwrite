import mongoose from 'mongoose';


const userSchema = mongoose.Schema({
  email: {
    type: String,
    unique: true,
    trim: true,
  },
  username: {
    type: String,
    trim: true,
  },
  password: String,
});

const docSchema = mongoose.Schema({
  title: String,
  owners: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  }],
  text: {
    type: String,
    default: ''
  },
});

module.exports = {
  User: mongoose.model('User', userSchema),
  Document: mongoose.model('Document', docSchema),
};
