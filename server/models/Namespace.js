const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const nameSpaceSchema = new Schema(
	{
		users: [{ type: Schema.Types.ObjectId, ref: 'User' }],
		name: { type: String, minlength: 3 },
		rooms: [{ type: Schema.Types.ObjectId, ref: 'Room' }],
		// description: { type: String, minlength: 1 },
		// files: [{ type: Schema.Types.ObjectId, ref: 'File' }],
		// type: { type: String, enum: ['group', 'private'] },
	},
	{
		timestamps: true,
	},
);

const Namespace = mongoose.model('nameSpace', nameSpaceSchema);
module.exports = Namespace;
