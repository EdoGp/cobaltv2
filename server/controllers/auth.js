const jwt = require('jsonwebtoken');
const passport = require('passport');
const User = require('../models/User');

exports.profile = async (req, res, next) => {
	const userInfo = await User.findById(req.user._id)
		.populate('contacts')
		.populate('room');
	res.status(200).json({
		user: userInfo,
	});
};

exports.profileUpdate = (req, res, next) => {
	res.status(200).json({ tes: 'test2' });
};

exports.singup = async (req, res, next) => {
	if (
		!req.body.email ||
		!req.body.password ||
		!req.body.confirmPassword ||
		!req.body.firstName ||
		!req.body.familyName
	) {
		res.status(422).json({
			success: false,
			message_eng: 'Please fill all the fields before signing up.',
			message_esp: 'Por favor llene todos los campos antes de registrarse.',
		});
	} else {
		try {
			let result = await User.find({ email: req.body.email });
			if (result.length === 0) {
				const userCreated = new User({
					password: req.body.password,
					email: req.body.email.toLowerCase(),
					firstName: req.body.firstName,
					familyName: req.body.familyName,
				});
				userCreated.save((error) => {
					if (error) {
						return res.status(422).json({
							success: false,
							message_eng: 'Username already on use, please select another.',
							message_esp:
								'El nombre de usuario ya esta en uso, por favor seleccione otro.',
						});
					}
				});

				// userCreated.password = null;
				const token = jwt.sign(userCreated.toJSON(), process.env.SECRET);
				return res.status(201).json({
					success: true,
					message: 'Account created succesfully',
					token,
					user: userCreated,
				});
			} else {
				return res.status(422).json({
					success: false,
					message_eng: 'Email already on use, please select another.',
					message_esp: 'El correo ya esta en uso, por favor seleccione otro.',
				});
			}
		} catch (error) {
			console.log(error);
			return res.status(200).json({ error });
		}
	}
};

exports.login = async (req, res, next) => {
	return passport.authenticate(
		'local',
		{ session: false },
		(err, user, info) => {
			if (err || !user) {
				return res.status(400).json({
					message: 'Password or email incorrect',
				});
			}
			req.login(user, { session: false }, async (err) => {
				if (err) {
					res.send(err);
				}
				const userInfo = await User.findById(req.user._id)
					.populate('contacts')
					.populate('room');
				const token = jwt.sign(user.toJSON(), process.env.SECRET);
				return res.json({ user: userInfo, token });
			});
		},
	)(req, res, next);
};
