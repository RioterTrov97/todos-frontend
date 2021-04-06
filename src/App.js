import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import { instanceAuth } from './axios';
import axios from 'axios';
import { login, logout, selectUser } from './features/userSlice';
import Login from './Login';
import LoadingScreen from './LoadingScreen';
import AddTask from './AddTask';

function App() {
	const [loading, setLoading] = useState(true);
	const user = useSelector(selectUser);
	const dispatch = useDispatch();

	const headers = {
		'Content-Type': '',
		Authorization: 'Bearer ' + window.localStorage.getItem('token'),
	};

	useEffect(() => {
		setLoading(true);
		if (window.localStorage.getItem('token')) {
			instanceAuth
				.get('/users/me')
				.then((response) => {
					setLoading(false);
					dispatch(
						login({
							name: response.data.name,
							email: response.data.email,
							token: window.localStorage.getItem('token'),
						})
					);
				})
				.catch((err) => {
					console.log(err);
					setLoading(false);
				});
		} else {
			setLoading(false);
		}
	}, [dispatch]);

	const loggingOut = (e) => {
		e.preventDefault();
		setLoading(true);
		axios
			.post(
				'https://ashish5061-task-manager.herokuapp.com/users/logout',
				'',
				{ headers }
			)
			.then((response) => {
				console.log(response);
				window.localStorage.removeItem('token');
				dispatch(logout());
				setLoading(false);
			})
			.catch((err) => {
				console.log(err);
				setLoading(false);
			});
	};

	const style = {
		color: '#f72b2b',
		textAlign: 'center',
		fontWeight: 450,
	};

	return (
		<div className="App">
			{!user ? (
				loading ? (
					<LoadingScreen />
				) : (
					<Login />
				)
			) : loading ? (
				<div>
					<LoadingScreen />
					<p style={style}>Logging Out</p>
				</div>
			) : (
				<div className="appBody">
					<div className="appBody__Header">
						<p>
							Hi <span>{user.name.toUpperCase()}</span>, Welcome
							to your task manager
						</p>
						<button onClick={loggingOut}>Log Out</button>
					</div>

					<AddTask />
				</div>
			)}
		</div>
	);
}

export default App;
