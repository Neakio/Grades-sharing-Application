import axios from "./axios";

export const getClasses = () => {
    return axios.get("api/groups");
};

export const getActiveClasses = (isActive) => {
    return axios.get("api/groups?isActive=" + isActive);
};

export const getClass = (classId) => {
    return axios.get("api/groups/" + classId);
};

export const getUserfromClass = (studentId) => {
    return axios.get("api/groups?student=" + studentId);
};
export const createClass = (level, name, year, isActive) => {
    let payload = {
        level,
        name,
        year,
        isActive,
    };
    return axios.post("api/groups", payload);
};

export const deleteClass = (classId) => {
    return axios.delete("api/groups/" + classId);
};

export const editClass = (classId, level, name, year, isActive) => {
    let payload = {
        level,
        name,
        year,
        isActive,
    };
    return axios.put("api/groups/" + classId, payload);
};

export const classUser = (classId, level, name, year, isActive, referent, delegates, students) => {
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
