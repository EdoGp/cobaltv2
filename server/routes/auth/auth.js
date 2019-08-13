const express = require('express');
const router = express.Router();
const passport = require('passport');

const authController = require('./../../controllers/auth');

router.get('/', (req, res, next) => {
	res.status(200).json({ test: 'test' });
});

router.get(
	'/profile',
	passport.authenticate('jwt', { session: false }),
	authController.profile,
);

router.put('/profile', authController.profileUpdate);

router.post('/login', authController.login);

router.post('/signup', authController.singup);

// router.get(
// 	'/google',
// 	passport.authenticate('google', {
// 		scope: [
// 			'https://www.googleapis.com/auth/plus.login',
// 			'https://www.googleapis.com/auth/userinfo.email',
// 		],
// 	}),
// );

// router.get(
// 	'/google/success',
// 	passport.authenticate('google', {
// 		failureRedirect: '/',
// 		// successRedirect: '/auth/private-page',
// 	}),
// );

module.exports = router;
