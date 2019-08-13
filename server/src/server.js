const app = require('./app');

const port = process.env.PORT || 4000;
const database = require('./database');

database.connect();
const server = app.listen(port, () => {
	console.log('Express server successfully started...');
	console.log(`Sever IP address: http://${process.env.IP}:${port}`);
	console.log(`Express server listening on port ${port}`);
});

module.exports = server;
