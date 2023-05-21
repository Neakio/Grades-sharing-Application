import axios from "./axios";

export const getClasses = () => {
    return axios.get("api/groups");
};

export const getClass = (classId) => {
    return axios.get("api/groups/" + classId);
};

export const createClass = (level, name, year, isActive, referent, delegates, students) => {
    let payload = {
        level,
        name,
        year,
        isActive,
        referent,
        delegates,
        students,
    };
    return axios.post("api/groups", payload);
};

export const deleteClass = (classId) => {
    return axios.delete("api/groups/" + classId);
};

export const editClass = (classId, level, name, year, isActive, referent, delegates, students) => {
    let payload = {
        level,
        name,
        year,
        isActive,
        referent,
        delegates,
        students,
    };
    return axios.put("api/groups/" + classId, payload);
};
