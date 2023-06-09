var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;
var User = require("./models/users");
var JwtStrategy = require("passport-jwt").Strategy;
var ExtractStrategy = require("passport-jwt").ExtractJwt;
var FacebookTokenStrategy = require("passport-facebook-token");
var jwt = require("jsonwebtoken");

var config = require("./config");
const { ExtractJwt } = require("passport-jwt");

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

exports.getToken = function (user) {
  return jwt.sign(user, config.secretKey, { expiresIn: 3600 });
};

var opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = config.secretKey;

// JWT Strategy (this return user which can be used in next authentication)
exports.jwtPassport = passport.use(
  new JwtStrategy(opts, (jwt_payload, done) => {
    console.log("JWT payload: ", jwt_payload);
    User.findById({ _id: jwt_payload._id })
      .then((user) => {
        if (user) {
          done(null, user);
        } else {
          done(null, false);
        }
      })
      .catch((error) => {
        done(error, false);
      });
  })
);

// verify ordinary user (must login first)
exports.verifyUser = passport.authenticate("jwt", { session: false });

// verify admin
exports.verifyAdmin = function (req, err, next) {
  if (req.user.admin) {
    return next();
  } else {
    var err = new Error(
      "Only administrators are authorized to perform this operation."
    );
    err.status = 403;
    return next(err);
  }
};
exports.facebookPassport = passport.use(
  new FacebookTokenStrategy(
    {
      clientID: config.facebook.clientId,
      clientSecret: config.facebook.clientSecret,
    },
    (accessToken, refreshToken, profile, done) => {
      User.findOne({ facebookId: profile.id }, (err, user) => {
        if (err) {
          return done(err, false);
        }
        if (!err && user !== null) {
          return done(null, user);
        } else {
          user = new User({ username: profile.displayName });
          user.facebookId = profile.id;
          user.firstname = profile.name.givenName;
          user.lastname = profile.name.familyName;
          user.save((err, user) => {
            if (err) {
              return done(err, false);
            } else return done(null, user);
          });
        }
      });
    }
  )
);
