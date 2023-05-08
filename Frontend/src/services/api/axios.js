import axios from "axios";
import { toastError } from "../toasts";

axios.defaults.baseURL = "http://127.0.0.1:8000/";
axios.interceptors.response.use(
    (response) => {
        return response.data;
    },
    (error) => {
        toastError(error.message);
        throw error;
    },
);
export default axios;
