import axios from 'axios';

const tokenAuthenticate = axios.create({
	baseURL: 'https://ashish5061-task-manager.herokuapp.com',
	headers: {
		'Content-Type': '',
		Authorization: 'Bearer ' + window.localStorage.getItem('token'),
	},
});

export default tokenAuthenticate;
