import http from 'http';
import express from 'express';
import session from 'express-session';
import mongoose from 'mongoose';

import passport from 'passport';
import LocalStrategy from 'passport-local';
// import bodyParser from 'body-parser';

import { User } from './models/models';

const MongoStore = require('connect-mongo')(session);
const app = express();

//Session Info

//TODO: what do these attributes actually mean
// TODO: set process.env.SECRET
app.use(session({
  secret: process.env.SECRET,
  name: 'docuwrite_horizons',
  store: new MongoStore({ mongooseConnection: mongoose.connection }),
  proxy: true,
  resave: true
}));


// Initialize Passport
app.use(passport.initialize());
app.use(passport.sesion());

// Passport Serialize
passport.serializeUser((user, done) => done(null, user._id));

// Passport Deserialize
passport.deserializeUser((id, done) => User.findById(id, (err, user) => done(err, user)));

// Passport Strategy
passport.use(new LocalStrategy( (username, password, done) => {
  User.findOne({username: username}).exec()
  .then((user) => {
    if(!user){
      console.log(user);
      return done(null, false, {message: 'Incorrect username'});
    }
    if(user.password !== auth.hashPassword(password)){
      return done(null, false, {message: 'Incorrect password'});
    }
    return done(null, user);
  })
  .catch((err) => {
    console.log('Error in passport-local Strategy\n'+err);
    return done(err);
  })
})



http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Hello World\n');
}).listen(1337, '127.0.0.1');

console.log('Server running at http://127.0.0.1:1337/');
