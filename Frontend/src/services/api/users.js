import axios from "./axios";

export const getUsers = () => {
    return axios.get("api/users");
};

export const getReferent = () => {
    return axios
        .get("api/users")
        .then((response) => {
            const entries = Object.entries(response);
            const arUsers = entries.filter(([key, val]) => val === "AR");
            const output = Object.fromEntries(arUsers);
        })
        .catch((error) => {
            console.log(error);
        });
};

export const getUser = (userId) => {
    return axios.get("api/users/" + userId);
};

export const createUser = (firstname, lastname, group, isDelegate, role) => {
    let payload = {
        firstname,
        lastname,
        group,
        is_delegate: isDelegate,
        role,
    };
    return axios.post("api/users", payload);
};

export const deleteUser = (userId) => {
    return axios.delete("api/users/" + userId);
};

export const editUser = (userId, firstname, lastname, group, isDelegate, role) => {
    let payload = {
        firstname,
        lastname,
        group,
        is_delegate: isDelegate,
        role,
    };
    return axios.put("api/users/" + userId, payload);
};
