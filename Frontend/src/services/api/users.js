import axios from "./axios";

export const getUsers = () => {
    return axios.get("api/users");
};

export const getUsersByRole = (role) => {
    return axios.get("/api/users?role=" + role);
};

export const getUserByClass = (groupId) => {
    return axios.get("api/users?groupId=" + groupId);
};

export const getUser = (userId) => {
    return axios.get("api/users/" + userId);
};

export const createUser = (firstname, lastname, role) => {
    let payload = {
        firstname,
        lastname,
        role,
    };
    return axios.post("api/users", payload);
};

export const deleteUser = (userId) => {
    return axios.delete("api/users/" + userId);
};

export const editUser = (userId, firstname, lastname, role) => {
    let payload = {
        firstname,
        lastname,
        role,
    };
    return axios.put("api/users/" + userId, payload);
};
