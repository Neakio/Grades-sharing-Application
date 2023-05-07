import axios from "./axios";

export const getClasses = () => {
    return axios.get("api/groups");
};

export const getClass = (classId) => {
    return axios.get("api/groups/" + classId);
};

export const getUserByClass = (groupId) => {
    return axios.get("api/users?groupId=" + groupId);
};

export const createClass = (title, year, isActive, referent) => {
    let payload = {
        title,
        year,
        is_active: isActive,
        referent,
    };
    return axios.post("api/groups", payload);
};

export const deleteClass = (classId) => {
    return axios.delete("api/groups/" + classId);
};

export const editClass = (classId, title, year, isActive, referent) => {
    let payload = {
        title,
        year,
        is_active: isActive,
        referent,
    };
    return axios.put("api/groups/" + classId, payload);
};

{
    /*export const addUser = () => {
  let payload = {
    firstname,
    lastname,
    group,
        
  };
  return axios.put("api/groups/" + payload);
};*/
}

export const getReferent = () => {
    return axios.get("api/users/?role=AR");
};
