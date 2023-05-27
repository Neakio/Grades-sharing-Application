import axios from "axios";

const BASE_URL = "http://127.0.0.1:8000/api/";

export const login = (username, password) => {
    return axios
        .post(`${BASE_URL}token/`, { username, password })
        .then((response) => response.data)
        .catch((error) => {
            throw error.response.data;
        });
};
