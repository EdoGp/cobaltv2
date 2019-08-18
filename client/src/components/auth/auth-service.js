import axios from 'axios';

export default class AuthService {
	constructor() {
		let token = localStorage.getItem('jwt');
		let service = axios.create({
			baseURL: process.env.REACT_APP_API_URL,
			timeout: 5000,
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		this.service = service;
	}

	signup = (email, password, confirmPassword, firstName, familyName) => {
		return this.service
			.post('/signup', {
				email,
				password,
				confirmPassword,
				firstName,
				familyName,
			})
			.then((response) => {
				localStorage.setItem('jwt', response.data.token);
				return response.data;
			})
			.catch((error) => {
				console.log(error);
			});
	};

	loggedin = () => {
		return this.service
			.get('/profile')
			.then((response) => {
				return response.data.user;
			})
			.catch((error) => {
				return false;
			});
	};

	login = (email, password) => {
		return this.service.post('/login', { email, password }).then((response) => {
			localStorage.setItem('jwt', response.data.token);
			return response.data;
		});
	};

	logout = () => {
		localStorage.removeItem('jwt');
	};

	checkRoute = (route) => {
		return this.service
			.get(`/${route}`)
			.then((response) => {
				return response.data;
			})
			.catch((error) => {
				console.log(error);
				return false;
			});
	};

	postRoute = (route, body) => {
		return this.service
			.post(`/${route}`, body)
			.then((response) => {
				localStorage.setItem('jwt', response.data.token);
				return response.data;
			})
			.catch((err) => {
				console.log(err);
			});
	};
}
