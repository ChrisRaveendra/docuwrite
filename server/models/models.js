import mongoose from 'mongoose';
import bcrypt from 'bcrypt';


let userSchema = mongoose.Schema({
  email: [String],
  username: [String],
  password: [String]
});


/*
*  compare passed in password with the value in the database
*   @param {string} password from react frontend
*   @returns {function} cb from TODO where?
*/
userSchema.methods.comparePassword = function comparePassword(password, cb) {
  bcrypt.compare(password, this.password, cb);
}


/*
 * convert password to hash beforehand
 *  @ param {function} next from TODO where?
 */
userSchema.pre('save', function saveHook(next) {
  const user = this;
  // TODO what does this actually do
  // something about checking if password is modified or if new user
  if (!user.isModified('password')) return next();

  // this is similar to hashing password with crypto in passport local strategy
  return bcrypt.genSalt((saltError, salt) => {
    // report saltError
    if (saltError) { return next(saltError); }

    return bcrypt.hash(user.password, salt, (hashError, hash) => {
      // report hashError
      if (hashError) { return next(hashError); }
      // update password to hashed version
      user.password = hash;
      // continue
      return next();
    });
  });
});

/* TODO: */
// let documentSchema = mongoose.Schema({
//  htmltext: [String]
// })


const User = mongoose.model('User', userSchema);

module.exports = {
  User: User
};
