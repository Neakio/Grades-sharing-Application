import axios from "./axios";

export const getClasses = () => {
    return axios.get("api/groups");
};

export const getClass = (classId, filterActive = true) => {
    let suffix = "";
    if (filterActive) suffix = "?active=" + filterActive.toString();
    return axios.get("api/groups/" + classId + suffix);
};

export const createClass = (firstname, lastname, group, isDelegate, role) => {
    let payload = {
        firstname,
        lastname,
        group,
        is_delegate: isDelegate,
        role,
    };
    return axios.post("api/groups", payload);
};

export const deleteClass = (classId) => {
    return axios.delete("api/groups/" + classId);
};
