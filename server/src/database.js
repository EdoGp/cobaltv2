const mongoose = require('mongoose');

module.exports.connect = () => {
	mongoose.connect(process.env.MONGOURI, {
		useCreateIndex: true,
		useNewUrlParser: true,
		useFindAndModify: false,
	});
	const db = mongoose.connection;
	console.log('Database connection started...');
	db.on('error', console.error.bind(console, 'Connection Error...'));
	db.once('open', function(callback) {
		console.log(`Connection to ${process.env.MONGODB} DB Succeeded...`);
	});
	return db;
};
2;
