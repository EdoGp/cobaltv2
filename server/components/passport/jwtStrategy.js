const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const User = require('./../../models/User');

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.SECRET;
// opts.issuer = 'localhost:3000';
// opts.audience = '127.0.0.1:3000';
passport.use(
	new JwtStrategy(opts, (jwtPayload, cb) => {
		return User.findById(jwtPayload._id)
			.then((user) => {
				if (user) {
					return cb(null, user);
				} else {
					return cb(null, false);
				}
			})
			.catch((err) => {
				return cb(err, false);
			});
	}),
);
