const socketIo = require('socket.io');
const server = require('./server');

const io = socketIo(server);

const Room = require('./../models/Namespace');
const User = require('./../models/User');
const Namespaces = require('./../models/Namespace');

const getNamespaces = async () => {
	// let newUser = new User({
	// 	firstName: 'Eduardo',
	// 	familyName: 'Gonzalez',
	// 	password: 'test',
	// 	email: 'eduardgp@gmail.com',
	// 	room: ['5d538fc27379c4ce22e5a261'],
	// });
	// newUser.save((error) => {
	// 	console.log(error);
	// });
	// let newNamespace = new Namespace({
	// 	users: ['5d53929c72edd1d2cb12be2c'],
	// 	name: 'Main',
	// 	endpoint: '/main',
	// 	rooms: ['5d538fc27379c4ce22e5a261'],
	// });
	// newNamespace.save((error) => {
	// 	console.log(error, 'test');
	// });
	// let namespaces = await Namespaces.find();
};

const startSockets = async () => {
	try {
		let namespaces = await Namespaces.find();
		namespaces.forEach((namespace) => {
			io.of(namespace.endpoint).on('connection', (nsSocket) => {
				const user = nsSocket.handshake.query.user;
				// console.log(namespace.rooms);
				nsSocket.emit('nsRoomLoad', namespace.rooms);
				nsSocket.on('joinRoom', (roomToJoin) => {
					// console.log('Rooms: ', nsSocket.rooms);
					// console.log('Rooms: ', roomToJoin);
					const roomToLeave = Object.keys(nsSocket.rooms)[1];
					nsSocket.leave(roomToLeave);
					updateUsersInRoom(namespace, roomToLeave);
					nsSocket.join(roomToJoin);
					const nsRoom = namespace.rooms.find((room) => {
						return (room.roomTitle = roomToJoin);
					});
					nsSocket.emit('history', nsRoom.history);
					updateUsersInRoom(namespace, roomToJoin);
				});
				nsSocket.on('message', (msg) => {
					const message = {
						text: msg.text,
						type: msg.type,
						time: msg.time,
						user: user,
					};
					const roomTitle = Object.keys(nsSocket.rooms)[1];
					const nsRoom = namespace.rooms.find((room) => {
						return room.roomTitle === roomTitle;
					});
					nsRoom.addMessage(message);
					io.of(namespace.endpoint)
						.to(roomTitle)
						.emit('message', message);
				});
			});
		});
	} catch (error) {
		console.log(error);
	}
};

io.on('connection', async (socket) => {
	console.log(socket.handshake.query.username, 'logged in ');
	socket.emit('nsList', {
		img: 'https://upload.wikimedia.org/wikipedia/commons/a/af/Tux.png',
		endpoint: '/main',
	});
});

startSockets();

function updateUsersInRoom(namespace, roomToJoin) {
	io.of(namespace.endpoint)
		.in(roomToJoin)
		.clients((error, clients) => {
			io.of(namespace.endpoint)
				.in(roomToJoin)
				.emit('updateMembers', clients.length);
		});
}
