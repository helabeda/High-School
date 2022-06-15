const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy,
  ExtractJwt = require("passport-jwt").ExtractJwt;
var opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.secretKey;
passport.initialize();
passport.use(
  new JwtStrategy(opts, async function (jwt_payload, done, err) {
    const admin = await Administration.findOne({ _id: jwt_payload._id}).select('-password');
    const parent = await Parent.findOne({ _id: jwt_payload._id }).select('-password');
    const prof = await Prof.findOne({ _id: jwt_payload._id}).select('-password'); 
      if (err) {
        return done(err, false);
      }
      else if (admin) {
        return done(null, admin);
      }
      else if (parent) {
        return done(null, parent);
      }
      else if (prof) {
        return done(null, prof);
      }
      else {
        return done(null, false);
        // or you could create a new account
      }
    }
  )
);

module.exports = isAuth = () =>
  passport.authenticate("jwt", { session: false });
