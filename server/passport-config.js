const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const mongoose = require('mongoose');
const Seller = mongoose.model('Seller');
const WH_Admin = mongoose.model('WH_Admin');
const Customer = mongoose.model('Customer');

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.SECRET_KEY;

module.exports = passport => {
  passport.use(
    new JwtStrategy(opts, async (jwt_payload, done) => {
      try {
        let user = null;

        // Search in different collections based on role
        if (jwt_payload.role === 'Admin') {
          user = await WH_Admin.findById(jwt_payload.id);
        } else if (jwt_payload.role === 'Seller') {
          user = await Seller.findById(jwt_payload.id);
        } else if (jwt_payload.role === 'Customer') {
          user = await Customer.findById(jwt_payload.id);
        }

        if (user) {
          return done(null, user);
        }
        return done(null, false);
      } catch (err) {
        return done(err, false);
      }
    })
  );
};
