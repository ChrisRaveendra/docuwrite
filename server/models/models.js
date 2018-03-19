import mongoose from 'mongoose';

// check if database URI exists
if (!process.env.MONGODB_URI) {
  console.log('Error: MONGODB_URI is not set.  Run env.sh?');
  process.exit(1);
}

mongoose.connect(process.env.MONGODB_URI);

let userSchema = mongoose.Schema({
  email: [String],
  username: [String],
  password: [String],
});

/* TODO: */
// let documentSchema = mongoose.Schema({
//  htmltext: [String]
// })


const User = mongoose.model('User', userSchema);

module.exports = {
  User: User
};
