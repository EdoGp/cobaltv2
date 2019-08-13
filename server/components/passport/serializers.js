const passport = require('passport');
// const FbStrategy = require('passport-facebook').Strategy;
// const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const User = require('./../../models/User');

passport.serializeUser((userFromDb, cb) => {
	cb(null, userFromDb._id);
});

passport.deserializeUser((idFromSession, cb) => {
	User.findById(idFromSession)
		.populate('contacts')
		.then((user) => {
			cb(null, user);
		})
		.catch((err) => {
			cb(err);
		});
});

// STRATEGIES (npm package that enables other methods of logging)

// Login With facebook
// passport.use(
// 	new FbStrategy(
// 		// 1st arg of fbStrategy -> settings object
// 		{
// 			// Facebook credentials
// 			// App ID
// 			clientID: process.env.FACEBOOK_ID,
// 			// App Secret
// 			clientSecret: process.env.FACEBOOK_SECRET,

// 			// URL: where to go after log in is successful (one of our routes)
// 			callbackURL: '/facebook/success',

// 			proxy: true,
// 		},

// 		// 2nd arg of fbStrategy -> callback
// 		(accessToken, refreshToken, profile, callback) => {
// 			console.log('FACEBOOK profile -----------');
// 			console.log(profile);
// 			// what happens when a user logs in with facebook
// 			// (create a new user document OR use an existing)

// 			// Check if there's already a document in the database for this user
// 			UserModel.findOne({ facebookID: profile.id })
// 				.then((userFromDb) => {
// 					if (userFromDb) {
// 						callback(null, userFromDb);
// 						return;
// 					}

// 					// create a user account if there's none
// 					const theUser = new UserModel({
// 						facebookID: profile.id,
// 						fullName: profile.displayName,
// 					});
// 					return theUser.save();
// 				})
// 				.then((newUser) => {
// 					// tell Passport to use the new user account
// 					callback(null, newUser);
// 				})
// 				.catch((err) => {
// 					// tell Passport there was an error in the login process
// 					callback(err);
// 				});
// 		},
// 	), // new FbStrategy()
// ); // passport.use()

// Login with Google
// passport.use(
// 	new GoogleStrategy(
// 		{
// 			clientID: process.env.GOOGLE_ID,
// 			clientSecret: process.env.GOOGLE_SECRET,
// 			callbackURL: '/google/success',
// 			proxy: true,
// 		},
// 		(accessToken, refreshToken, profile, callback) => {
// 			UserModel.findOne({ googleID: profile.id })
// 				.then((userFromDb) => {
// 					if (userFromDb) {
// 						callback(null, userFromDb);
// 						return;
// 					}
// 					const theUser = new UserModel({
// 						googleID: profile.id,
// 						email: profile._json.email,
// 					});
// 					return theUser.save();
// 				})
// 				.then((newUser) => {
// 					// tell Passport to use the new user account
// 					callback(null, newUser);
// 				})
// 				// tell Passport there was an error in the login process
// 				.catch((err) => {
// 					callback(err);
// 				});
// 		},
// 	), // new GoogleStrategy()
// ); // passport.use()
