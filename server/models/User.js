const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema(
	{
		firstName: { type: String, minlength: 3 },
		familyName: { type: String, minlength: 2 },
		// username: { type: String, unique: true, minlength: 4 },
		password: {
			type: String,
			// select: false
		},
		googleID: { type: String },
		image: { type: String },
		email: {
			type: String,
			unique: true,
			match: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
		},
		online: { type: Boolean, defaul: false },
		contacts: [{ type: Schema.Types.ObjectId, ref: 'User' }],
		room: [{ type: Schema.Types.ObjectId, ref: 'Room' }],
		files: [{ type: Schema.Types.ObjectId, ref: 'File' }],
		verifiedEmail: { type: Boolean, default: false },
	},
	{
		timestamps: true,
	},
);
userSchema.pre('save', function(next) {
	if (this.isModified('password') || this.isNew) {
		bcrypt.genSalt(10, (error, salt) => {
			if (error) {
				return next(error);
			}
			bcrypt.hash(this.password, salt, (error, hash) => {
				if (error) {
					return next(error);
				}
				this.password = hash;
				next();
			});
		});
	} else {
		return next();
	}
});

const User = mongoose.model('User', userSchema);
module.exports = User;
