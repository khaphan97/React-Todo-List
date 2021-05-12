import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import TaskApi from "../../api/taskApi";
export const addTaskAsync = createAsyncThunk("home/add", async (task) => {
	if (task.id) {
		return await TaskApi.editTask(task);
	}
	return await TaskApi.addTask(task);
});

export const getListTaskAsync = createAsyncThunk("home", async (params) => {
	const result = await TaskApi.getListTask();
	return result;
});

export const deleteTaskAsync = createAsyncThunk("home/delete", async (params) => {
	const { id } = params;
	const result = await TaskApi.deleteTask(id);
	return result;
});

const initialState = {
	isShowForm: false,
	listTask: [],
	orderBy: "title",
	orderDir: "asc",
	isLoading: false,
	strSearch: "",
	taskSelected: null,
};

const homeSlice = createSlice({
	name: "home",
	initialState,
	reducers: {
		toggleForm: (state) => {
			state.isShowForm = !state.isShowForm;
		},
		closeForm: (state) => {
			state.isShowForm = false;
		},
		openForm: (state) => {
			state.isShowForm = true;
		},
		searchAction: (state, action) => {
			state.strSearch = action.payload;
		},
		orderAction: (state, action) => {
			state.orderBy = action.payload.orderBy;
			state.orderDir = action.payload.orderDir;
		},
		setTaskSelected: (state, action) => {
			state.taskSelected = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(addTaskAsync.fulfilled, (state, action) => {
				const { success, taskNew, type } = action.payload;
				console.log(action.payload);
				if (success && type === "add") {
					state.listTask.push(taskNew);
				} else {
					const newListTask = state.listTask.map((task) => {
						return task.id === taskNew.id ? taskNew : task;
					});
					state.listTask = newListTask;
					state.taskSelected = null;
				}
			})
			.addCase(getListTaskAsync.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getListTaskAsync.fulfilled, (state, action) => {
				state.isLoading = false;
				const { listTask, success } = action.payload;
				if (success) {
					state.listTask = listTask;
				} else {
					state.listTask = [];
				}
			})
			.addCase(deleteTaskAsync.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(deleteTaskAsync.fulfilled, (state, action) => {
				state.isLoading = false;
				const { taskDeleted, success } = action.payload;
				if (success) {
					const newListTask = state.listTask.filter((task) => task.id !== taskDeleted.id);
					state.listTask = newListTask;
				}
			});
	},
});

const { reducer, actions } = homeSlice;

export const { toggleForm, closeForm, openForm, searchAction, orderAction, setTaskSelected } =
	actions;

export default reducer;