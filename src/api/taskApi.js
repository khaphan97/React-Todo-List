import axiosInstance from "./axiosConfig";

class TaskApi {
	static async getListTask() {
		const response = await axiosInstance.get("listTask");
		if (response.status === 200) {
			return {
				success: true,
				statusText: response.statusText,
				listTask: response.data,
			};
		}
		return {
			success: false,
			statusText: response.statusText,
		};
	}

	static async deleteTask(id) {
		const response = await axiosInstance.delete(`listTask/${id}`);
		if (response.status === 200) {
			return {
				success: true,
				statusText: response.statusText,
				taskDeleted: response.data,
			};
		}
		return {
			success: false,
			statusText: response.statusText,
		};
	}

	static async addTask(task) {
		const response = await axiosInstance.post("listTask", task);
		if (response.status === 201) {
			return {
				success: true,
				type: "add",
				statusText: response.statusText,
				taskNew: response.data,
			};
		}
		return {
			success: false,
			statusText: response.statusText,
		};
	}

	static async editTask(task) {
		const { id, title, level } = task;
		const response = await axiosInstance.put(`listTask/${id}`, { title, level });
		console.log(response);
		if (response.status === 200) {
			return {
				success: true,
				type: "edit",
				statusText: response.statusText,
				taskNew: response.data,
			};
		}
		return {
			success: false,
			statusText: response.statusText,
		};
	}
}

export default TaskApi;
