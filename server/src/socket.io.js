const socketIo = require('socket.io');
const server = require('./server');

const io = socketIo(server);

const Room = require('./../models/Namespace');

io.on('connection', async (socket) => {
	socket.emit('nsList', 'main');
});

// const Rooms =
Room.find()
	.then((rooms) => {
		io.of('/').on('connection', (nsSocket) => {
			const username = nsSocket.handshake.query.username;
			nsSocket.emit('nsRoomLoad', rooms);
			nsSocket.on('joinRoom', (roomToJoin, numberOfUsersCb) => {
				const roomToLeave = Object.keys(nsSocket.rooms)[1];
				nsSocket.leave(roomToLeave);
				// updateUsersInRoom(namespace, roomToLeave);
				nsSocket.join(roomToJoin);
				const nsRoom = namespace.rooms.find((room) => {
					return room.roomTitle === roomToJoin;
				});
				nsSocket.emit('history', nsRoom.history);
				// updateUsersInRoom(namespace, roomToJoin);
			});
			nsSocket.on('messageRecive', (msg) => {
				const fullMsg = {
					text: msg.text,
					time: Date.now(),
					username: username,
					avatar: 'https://via.placeholder.com/30',
				};
				const roomTitle = Object.keys(nsSocket.rooms)[1];
				const nsRoom = rooms.find((room) => {
					return room.roomTitle === roomTitle;
				});
				nsRoom.addMessage(fullMsg);
				// io.of(namespace.endpoint)
				io.of('/main')
					.to(roomTitle)
					.emit('messageSend', fullMsg);
			});
		});
	})
	.catch((error) => {
		console.log(error);
	});

function updateUsersInRoom(namespace, roomToJoin) {
	// Send back the number of users in this room to ALL sockets connected to this room
	io.of(namespace.endpoint)
		.in(roomToJoin)
		.clients((error, clients) => {
			// console.log(`There are ${clients.length} in this room`);
			io.of(namespace.endpoint)
				.in(roomToJoin)
				.emit('updateMembers', clients.length);
		});
}
