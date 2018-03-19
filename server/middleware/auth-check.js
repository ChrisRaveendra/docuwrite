import jwt from 'jsonwebtoken';

const User = require('mongoose').model('User');

module.exports = (req, res, next) => {
  if (!req.headers.authorization) { return res.status(401).end(); }

    // header contains algorithm and token, so token is second argument
  const token = req.headers.authorization.split(' ')[1];

  return jwt.verify(token, process.env.jwtSecret, (err, payload) => {
    if (err) { return res.status(401).end(); }
    // extract userID from subject in payload
    return User.findById(payload.sub).exec()
            .catch((userError) => {
              console.log('Error in verifying user\n'+userError);
              return res.status(401).end();
            })
            .then((user) => {
              return !user ? res.status(401).end() : next();
            });
  });
};
