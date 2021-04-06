import { instanceTask, instanceDeleteTask } from './axios';

export const fetchTasksList = (page, limit, sortBy, search) => {
	console.log('fetchTasksList');
	let queryParams = '?sortBy=createdAt:desc';
	if (page === '') {
		page = 1;
	}
	if (limit === '' || limit === undefined) {
		limit = 5;
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
		.get(`/task${queryParams}`)
		.then((res) => {
			console.log(res);
		})
		.catch((e) => {
			console.log(e, 'eeeeeeeee');
			return e;
		});
};

export const addTasks = (formData) => {
	instanceTask
		.post('/task', formData)
		.then((res) => {
			console.log(res);
		})
		.catch((e) => {
			console.log('error', e);
		});
};

export const deleteTasks = (id) => {
	instanceDeleteTask
		.delete(`/task/${id}`)
		.then((res) => {
			console.log(res);
		})
		.catch((e) => {
			console.log('error', e);
		});
};

export const setTaskCompleteToggle = (id, completed) => {
	instanceTask
		.patch(`/task/${id}`, completed)
		.then((res) => {
			console.log(res);
		})
		.catch((e) => {
			console.log('error', e);
		});
};

export const saveTasksData = (id, description) => {
	instanceTask
		.patch(`/task/${id}`, description)
		.then((res) => {
			console.log(res);
		})
		.catch((e) => {
			console.log('error', e);
		});
};
