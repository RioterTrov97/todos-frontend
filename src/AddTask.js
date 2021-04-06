import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { instanceDeleteTask, instanceTask } from './axios';
import './AddTask.css';
import LoadingScreen from './LoadingScreen';
import { ReactComponent as TrashBin } from './icons/trash-bin.svg';

function AddTask() {
	const [description, setDescription] = useState('');
	const [changed, setChanged] = useState(false);
	const [loading, setLoading] = useState(false);

	const addTasks = (e) => {
		e.preventDefault();
		let formData = {
			description,
		};
		setLoading(true);
		instanceTask
			.post('/tasks', formData)
			.then((res) => {
				setChanged(!changed);
				console.log(res);
				setLoading(false);
			})
			.catch((e) => {
				setLoading(false);
				console.log('error', e);
			});
	};

	const [taskList, setTaskList] = useState([]);

	const fetchTasksList = (page, limit, sortBy, search) => {
		setLoading(true);
		let queryParams = '?sortBy=createdAt:desc';
		if (page === '') {
			page = 1;
		}
		if (limit === '' || limit === undefined) {
			limit = 10;
		}

		if (page) {
			queryParams += '&page=' + page;
		}
		if (limit) {
			queryParams += '&limit=' + limit;
		}

		if (sortBy || sortBy === false) {
			queryParams += '&completed=' + sortBy;
		}

		if (search) {
			queryParams += '&search=' + search;
		}

		instanceTask
			.get(`/tasks${queryParams}`)
			.then((res) => {
				setTaskList(res.data);
				setLoading(false);
			})
			.catch((e) => {
				console.log('error', e);
				setLoading(false);
				return e;
			});
	};

	const taskCompleteToggle = (e, id, completed) => {
		e.preventDefault();
		let checked = {
			completed: !completed,
		};
		setLoading(true);
		instanceTask
			.patch(`/tasks/${id}`, checked)
			.then((res) => {
				setChanged(!changed);
				setLoading(false);
			})
			.catch((e) => {
				console.log('error', e);
				setLoading(false);
			});
	};

	const deleteTask = (e, id) => {
		e.preventDefault();
		setLoading(true);
		instanceDeleteTask
			.delete(`/tasks/${id}`)
			.then((res) => {
				setLoading(false);
				setChanged(!changed);
			})
			.catch((e) => {
				setLoading(false);
				console.log(e, 'error');
			});
	};

	const taskListing = taskList.map((task) => {
		return (
			<div
				key={task._id}
				className={`task ${task.completed ? 'taskBg' : null}`}>
				<div className="taskLeft">
					<input
						className="task_check"
						type="checkbox"
						checked={task.completed}
						onChange={(e) =>
							taskCompleteToggle(e, task._id, task.completed)
						}
					/>
					<p
						className={`task_desc ${
							task.completed ? 'taskStrike' : null
						}`}>
						{task.description}
					</p>
				</div>
				<div className="taskRight">
					<button
						onClick={(e) => {
							deleteTask(e, task._id);
						}}>
						<TrashBin
							className={`svgIcon ${
								task.completed ? 'taskSvg' : null
							}`}
						/>
					</button>
				</div>
			</div>
		);
	});

	useEffect(() => {
		fetchTasksList();
	}, [changed]);

	return (
		<div className="body">
			<div className="bodyTop">
				<input
					value={description}
					onChange={(e) => setDescription(e.target.value)}
					placeholder="Add task here"
					type="text"
				/>
				<button onClick={(e) => addTasks(e)}>Add</button>
			</div>
			<div className="bodyBottom">
				<div className={`loadingHere ${loading ? 'load' : null}`}>
					{loading ? <LoadingScreen /> : null}
				</div>
				<div className="taskList">{taskListing}</div>
			</div>
		</div>
	);
}

export default AddTask;
