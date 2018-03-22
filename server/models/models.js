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
  title: {
    type: String,
    default: 'Untitled',
  },
  ownedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  owners: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  }],
  state: {
    type: String,
    default: ''
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

module.exports = {
  User: mongoose.model('User', userSchema),
  Document: mongoose.model('Document', docSchema),
};
