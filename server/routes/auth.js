import express from 'express';
const router = express.Router();
import { User } from '../models/models';
import crypto from 'crypto';
import bodyParser from 'body-parser';

const hashPassword = (secret) => {
  let hash = crypto.createHash('sha256');
  hash.update(secret);
  return hash.digest('hex');
}

module.exports = {
  secretRouter: function(passport) {
    router.post('/signup', (req, res) => {
      // TODO: this is assuming structure about front-end
      // we are assuming backend will be passed four things
      // 1. email
      // 2. username
      // 3. password
      // 4. repeatPassword
      if(req.body.password !== req.body.repeatPassword) {
        return {
          error: "Passwords don't match"
        }
      }

      let newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: hashPassword(req.body.password)
      });

      newUser.save()
      .then(user => user)
      .catch((err) => {
        console.log('Error in signup passport\n'+err);
        return {
          status: 500,
          error: err
        }
      })
    })
  }
}
