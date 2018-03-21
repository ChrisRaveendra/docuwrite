import express from 'express';
// uses cookie parser or smtg similar internally
import session from 'express-session';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { User, Document } from './models/models';
// TODO
// import compression from 'compression';

const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

const auth = require('./routes/auth');
const routes = require('./routes/index');
const MongoStore = require('connect-mongo')(session);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// TODO
// app.use(compression());
if (!process.env.MONGODB_URI) {
  console.error('Cannot find MONGODB_URI.  Run env.sh?');
  process.exit(1);
}
mongoose.connect(process.env.MONGODB_URI);


// Session Info
const sessionMiddleware = session({
  secret: process.env.SECRET, /* doing own HMAC */
  name: 'docuwrite_horizons',
  // creating a mongoose store
  //    purpose: a place to store our sessions on DB
  store: new MongoStore({ mongooseConnection: mongoose.connection }),
  proxy: true,
  resave: true,
});
app.use(sessionMiddleware);


// trying to associate session information with socket information
// resource: https://stackoverflow.com/questions/25532692/how-to-share-sessions-with-socket-io-1-x-and-express-4-x

// authorization: https://stackoverflow.com/questions/19106861/authorizing-and-handshaking-with-socket-io
// this guy says to use sessionStore http://www.danielbaulig.de/socket-ioexpress/

// Initialize Passport
app.use(passport.initialize());
// now passport will use session to store sessions
app.use(passport.session());

io.use((socket, next) => {
  sessionMiddleware(socket.request, socket.request.res, next);
});
// Passport Serialize
passport.serializeUser((user, done) => {
  console.log('serializing user: ', user);
  done(null, user._id);
});

// Passport Deserialize
passport.deserializeUser((id, done) => User.findById(id, (err, user) => {
  console.log('deserializing user: ', user);
  done(err, user);
}));

// Passport Strategy
passport.use(new LocalStrategy((email, password, done) => {
  User.findOne({ email }).exec()
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



io.on('connection', (socket) => {
  console.log('\n\n\n', socket.request.session);
  console.log('\n\n\n', socket.handshake);
  // console.log()
  // console.log('\n\n\n\n', socket.request.session.passport);
  // console.log('\n\n\n', socket.request.user);
  // console.log('\n\n\nsocket.request: ', socket.request);
  /*
  connect
  message
  disconnect
  reconnect
  ping
  join
  leave
  */
  // emitted by frontend after post request
  socket.on('load', (docID) => {
    Document.findByID(docID).exec()
    .catch(err => res.status(500).json({
      success: false,
      error: err,
    }))
    .then((doc) => res.status(200).json({
      success: true,
      title: doc.title,
      text: doc.text
    }));

  })
  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});


server.listen('3000', () => console.log('Running on localhost 3000'));
