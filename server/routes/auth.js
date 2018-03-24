import express from 'express';
import crypto from 'crypto';
import { User } from '../models/models';


function hashPassword(password) {
  const hash = crypto.createHash('md5');
  hash.update(password);
  return hash.digest('hex');
}
const router = express.Router();

// TODO: include validation
module.exports = {
  authRouter: function (passport) {
    router.post('/signup', (req, res, next) => {
      // TODO confirm that validation happens on frontend
      const newUser = new User({
        email: req.body.email,
        username: req.body.username,
        password: hashPassword(req.body.password),
      });
      newUser.save()
      .catch((err) => {
        console.log('Error in saving new user ', err.code);
        return res.status(500).json({
          success: false,
          message: err.code === 11000 ? 'Email address taken' : 'Signup failed',
        });
      })
      .then((user) => {
        if (!user) {
          return res.status(500).json({
            success: false,
            message: 'Signup did not save user',
          });
        }
        req.login(user, function (err) {
          if (err) {
            console.log('error in automatically logging in user: ',err);
            return res.status(403).json({
              success: false,
              message: err
            });
          } else {
            return res.status(200).json({
              success: true,
              userID: user._id,
              username: user.username
            })
          }
        })
        // console.log('session: ', req.session);
        // console.log('user : ', req.user);
      });
    });

    router.post('/login', (req, res, next) => {
      req.body.username = req.body.email;
      next();
    }, passport.authenticate('local'), (req, res) => {
      res.json({
        success: true,
        userID: req.user._id,
        username: req.user.username
      });
    });

    router.get('/logout', (req, res) => {
      req.logout();
      res.status(200).json({
        success: true,
      });
    })
    return router;
  },
  hashPassword,
};
