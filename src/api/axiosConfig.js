import axios from "axios";

const axiosInstance = axios.create({
	baseURL: "https://607e7c4b02a23c0017e8b5de.mockapi.io/",
	headers: {
		contentType: "application/json"
	},
});

export default axiosInstance;
