const express = require('express');
const router = express.Router();
const passport = require('passport');

const roomController = require('../controllers/chats');

router.get(
	'/',
	// passport.authenticate('jwt', { session: false }),
	roomController.allRooms,
);

router.post(
	'/',
	// passport.authenticate('jwt', { session: false }),
	roomController.createChat,
);

router.get(
	'/history/:id',
	// passport.authenticate('jwt', { session: false }),
	roomController.getChatHistory,
);

router.post(
	'/messages/:id',
	// passport.authenticate('jwt', { session: false }),
	roomController.addMessage,
);

router.get(
	'/groups',
	// passport.authenticate('jwt', { session: false }),
	roomController.getChatGroups,
);

module.exports = router;
