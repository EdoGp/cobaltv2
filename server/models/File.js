const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const fileSchema = new Schema(
	{
		name: { type: String, minlength: 1 },
		mimeType: { type: String, enum: ['js', 'txt', 'pdf'] },
		url: { type: String, enum: ['group', 'private'] },
		creator: { type: Schema.Types.ObjectId, ref: 'User' },
		room: { type: Schema.Types.ObjectId, ref: 'Room' },
		// collaborators: [{ type: Schema.Types.ObjectId, ref: 'User' }],
		// editable: { type: Boolean },
	},
	{
		timestamps: true,
	},
);

const File = mongoose.model('File', fileSchema);
module.exports = File;
