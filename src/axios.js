import axios from 'axios';

const instance = axios.create({
	baseURL: 'https://ashish5061-task-manager.herokuapp.com',
	headers: {
		'Content-Type': 'application/json',
	},
});

export const instanceAuth = axios.create({
	baseURL: 'https://ashish5061-task-manager.herokuapp.com',
	headers: {
		Authorization: 'Bearer ' + window.localStorage.getItem('token'),
	},
});

export const instanceTask = axios.create({
	baseURL: 'https://ashish5061-task-manager.herokuapp.com',
	headers: {
		'Content-Type': 'application/json',
		Authorization: 'Bearer ' + window.localStorage.getItem('token'),
	},
});

export const instanceDeleteTask = axios.create({
	baseURL: 'https://ashish5061-task-manager.herokuapp.com',
	headers: {
		'Content-Type': 'application/x-www-form-urlencoded',
		Authorization: 'Bearer ' + window.localStorage.getItem('token'),
	},
});

export default instance;
