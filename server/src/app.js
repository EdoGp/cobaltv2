require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
// const favicon = require('serve-favicon');

const logger = require('../components/log/log.controller');
const authRoute = require('./../routes/auth/auth');
const userRoute = require('./../routes/users');
const roomRoutes = require('../routes/rooms');

const app = express();

app.use(
	cors({
		credentials: true,
		origin: ['http://localhost:3001', 'https://cobalt-chat.herokuapp.com/'],
	}),
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(logger);

require('./../components/passport')(app);

app.use('/api/', authRoute);
app.use('/api/user', userRoute);
app.use('/api/room', roomRoutes);
const root = path.join(__dirname, '/../public/');
app.use(express.static(root));

app.use((req, res, next) => {
	if (
		req.method === 'GET' &&
		req.accepts('html') &&
		!req.is('json') &&
		!req.path.includes('.')
	) {
		res.sendFile('index.html', { root });
	} else next();
});

module.exports = app;
