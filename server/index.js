import express from 'express';
// uses cookie parser or smtg similar internally
import session from 'express-session';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { User } from './models/models';

const auth = require('./routes/auth');
const routes = require('./routes/index');
const MongoStore = require('connect-mongo')(session);

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// TODO check if process.env.MONGODB_URI exists
if (!process.env.MONGODB_URI) {
  console.error('Cannot find MONGODB_URI.  Run env.sh?');
  process.exit(1);
}
mongoose.connect(process.env.MONGODB_URI);


// Session Info
app.use(session({
  secret: process.env.SECRET, /* doing own HMAC */
  name: 'docuwrite_horizons',
  // creating a mongoose store
  //    purpose: a place to store our sessions on DB
  store: new MongoStore({ mongooseConnection: mongoose.connection }),
  proxy: true,
  resave: true,
}));


// Initialize Passport
app.use(passport.initialize());
// now passport will use session to store sessions
app.use(passport.session());


// Passport Serialize
passport.serializeUser((user, done) => done(null, user._id));

// Passport Deserialize
passport.deserializeUser((id, done) => User.findById(id, (err, user) => done(err, user)));

// Passport Strategy
passport.use(new LocalStrategy((email, password, done) => {
  User.findOne({ email: email }).exec()
  .then((user) => {
    if (!user) {
      console.log(user);
      return done(null, false, { message: 'Incorrect username' });
    }

    if (user.password !== auth.hashPassword(password)) {
      return done(null, false, { message: 'Incorrect password' });
    }
    return done(null, user);
  })
  .catch((err) => {
    console.log(`Error in passport-local Strategy\n${err}`);
    return done(err);
  });
}));

app.use('/', auth.authRouter(passport));
app.use('/', routes);

app.listen('3000', () => console.log('Running on localhost 3000'));
