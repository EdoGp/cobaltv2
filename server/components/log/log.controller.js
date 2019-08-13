const winston = require('winston');
const expressWinston = require('express-winston');
const path = require('path');
const filePath = path.resolve(__dirname, '../../log/');
const cFormat = winston.format.printf((info) => {
	const { timestamp, level, message, ...args } = info;
	return (
		`[${timestamp}][${level}]` +
		`[${args['meta']['req']['method']}] ` +
		`${args['meta']['res']['statusCode']} ` +
		`${args['meta']['req']['originalUrl']} ` +
		`${args['meta']['responseTime']}ms`
	);
});
const fFormat = winston.format.printf((info) => {
	const { timestamp, level, message, ...args } = info;
	return `[${timestamp}]: [${message}] ${
		Object.keys(args).length ? JSON.stringify(args, null, 2) : ''
	}`;
});

const transports = [
	new winston.transports.Console({
		format: winston.format.combine(
			winston.format.timestamp(),
			winston.format.colorize(),
			winston.format.align(),
			cFormat,
		),
	}),
	new winston.transports.File({
		level: 'info',
		filename: `${filePath}/info/info.log`,
		json: true,
		colorize: true,
		zippedArchive: true,
		maxFiles: 50,
		maxSize: 625000,
		tailable: true,
		format: winston.format.combine(
			winston.format.timestamp(),
			winston.format.colorize(),
			winston.format.align(),
			fFormat,
		),
	}),
	new winston.transports.File({
		level: 'error',
		filename: `${filePath}/error/error.log`,
		json: true,
		colorize: true,
		zippedArchive: true,
		maxFiles: 50,
		maxsize: 625000,
		tailable: true,
		format: winston.format.combine(
			winston.format.timestamp(),
			winston.format.colorize(),
			winston.format.align(),
			fFormat,
		),
	}),
	new winston.transports.File({
		level: 'warn',
		json: true,
		filename: `${filePath}/warn/warn.log`,
		colorize: true,
		zippedArchive: true,
		maxFiles: 50,
		maxSize: 625000,
		tailable: true,
		format: winston.format.combine(
			winston.format.timestamp(),
			winston.format.colorize(),
			winston.format.align(),
			fFormat,
		),
	}),
];

const logger = expressWinston.logger({
	winstonInstance: winston.createLogger({
		format: winston.format.json(),
		transports: transports,
	}),
});
logger.exitOnError = false;

module.exports = logger;
