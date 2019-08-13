const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const roomSchema = new Schema(
	{
		users: [{ type: Schema.Types.ObjectId, ref: 'User' }],
		name: { type: String, minlength: 3 },
		messages: [{ type: Schema.Types.ObjectId, ref: 'Message' }],
		files: [{ type: Schema.Types.ObjectId, ref: 'File' }],
		// description: { type: String, minlength: 1 },
		// type: { type: String, enum: ['group', 'private'] },
	},
	{
		timestamps: true,
	},
);

const Room = mongoose.model('room', roomSchema);
module.exports = Room;
