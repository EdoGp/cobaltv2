const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const messageSchema = new Schema(
	{
		text: { type: String, default: '' },
		room: { type: Schema.Types.ObjectId, ref: 'Room' },
		creator: { type: Schema.Types.ObjectId, ref: 'User' },
		type: { type: String, enum: ['Text', 'Image'] },
	},
	{
		timestamps: true,
	},
);

const Message = mongoose.model('Message', messageSchema);
module.exports = Message;
