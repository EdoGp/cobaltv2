import React, { Component } from 'react';
import socketIOClient from 'socket.io-client';
// import AutoScroll from 'react-scroll-to-bottom';

import './room.css';
export default class Chat extends Component {
	constructor(props) {
		super(props);
		this.state = {
			// user: this.props.user,
			user: {
				_id: '5d53929c72edd1d2cb12be2c',
				contacts: [],
				room: ['5d538fc27379c4ce22e5a261'],
				files: [],
				verifiedEmail: false,
				firstName: 'Eduardo',
				familyName: 'Gonzalez',
				email: 'eduardgp@gmail.com',
				createdAt: '2019-08-14T04:48:28.758Z',
				updatedAt: '2019-08-14T04:48:28.758Z',
			},
			spaces: [],
			rooms: [],
			currentRoom: null,
			fetchingSpaces: true,
			fetchingRooms: true,
			messageInput: '',
			socket: socketIOClient(`${process.env.REACT_APP_SOCKET}`, {
				query: { username: 'test' },
			}),
		};
		// this.service = new AuthService();
	}

	componentDidMount() {
		this.getListOfNamespaces();
	}

	componentDidUpdate() {
		this.getListOfRooms();
	}

	getListOfNamespaces() {
		this.state.socket.on('nsList', (data) => {
			// data.endpoint
			// console.log('The list of .rooms has arrived!!', data);
			this.setState({ spaces: data, fetchingSpaces: false });
			// this.addMessage(data);
		});
	}

	getListOfRooms() {
		if (!this.state.fetchingSpaces && this.state.fetchingRooms) {
			// console.log('Spaces:', this.state.spaces);
			this.state.spaces.forEach((space) => {
				let nsSocket = socketIOClient(`http://localhost:3000${space.endpoint}`);
				nsSocket.on('nsRoomLoad', (nsRooms) => {
					// console.log('This are the rooms: ', nsRooms);
					this.setState({ rooms: nsRooms, fetchingRooms: false });
					this.setState({ currentRoom: nsRooms[0] });
					nsRooms.forEach((room) => {
						// console.log(room);
						// nsSocket.emit('joinRoom', room, (numberOfMembers) => {
						// 	console.log('Number of users in room: ', numberOfMembers);
						// });
						nsSocket.on('history', (history) => {
							console.log('Room history messages: ', history);
						});
						// nsSocket.on('updateMembers', (numberOfMembers) => {
						// 	console.log('Number of users in the room:', numberOfMembers);
						// });
					});
				});
			});
		}
	}

	inputOnChange = (e) => {
		if (e.key === 'Enter') {
			this.sendMessage(e);
		}
		this.setState({ [e.target.name]: e.target.value });
	};

	sendMessage = (e) => {
		e.preventDefault();
		this.state.socket.emit('message', {
			text: this.state.messageInput,
			type: 'text',
			// time: msg.time,
			user: this.state.user,
			// creator: this.state.user._id,
			// content: this.state.message,
		});
		// this.saveMessage(this.state.message);

		this.setState({ messageInput: '' });
		e.target.value = '';
	};

	availableSpaces() {
		return this.state.spaces.map((space) => {
			return (
				<div
					className="main__sidebar__channels__info"
					key={`space-${space.name}`}
				>
					{space.name}
				</div>
			);
		});
	}

	availableRooms() {
		return this.state.rooms.map((room) => {
			return (
				<div className="main__sidebar__rooms__info" key={`space-${room.name}`}>
					{room.name}
				</div>
			);
		});
	}

	currentRoomData() {
		if (this.state.currentRoom === null) {
			return <div>Loading...</div>;
		} else {
			return (
				<div className="main__container">
					<div className="main__container__roomInfo">
						{this.state.currentRoom.name}
					</div>
					<div className="main__container__messages">
						{this.currentRoomMessages()}
					</div>
					<div className="main__container__input">
						<form
							className="main__container__input__form"
							onSubmit={(e) => {
								e.preventDefault();
							}}
						>
							<input
								className="main__container__input__form__input"
								type="text"
								name="messageInput"
								placeholder="Type your message here..."
								value={this.state.messageInput}
								onChange={(e) => {
									this.inputOnChange(e);
								}}
							/>
							<button
								className="main__container__input__form__button button"
								onClick={this.sendMessage}
							>
								Send
							</button>
							<button className="main__container__input__form__button button">
								Gifs
							</button>
						</form>
					</div>
				</div>
			);
		}
	}

	currentRoomMessages() {
		if (this.state.currentRoom.messages.length > 0) {
			return this.state.currentRoom.messages.map((message) => {
				return (
					<div className="main__messages__item">
						<div>user info</div>
						<div>actual message</div>
					</div>
				);
			});
		} else {
			return <div className="main__messages__item">no messages</div>;
		}
	}

	render() {
		return (
			<div className="main">
				<div className="main__sidebar">
					<div className="main__sidebar__top">user info</div>
					<div className="main__sidebar__channels">
						{this.availableSpaces()}
					</div>
					<div className="main__sidebar__rooms">{this.availableRooms()}</div>
				</div>
				{this.currentRoomData()}
			</div>
		);
	}
}
