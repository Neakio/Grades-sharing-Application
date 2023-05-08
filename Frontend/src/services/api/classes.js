import axios from "./axios";

export const getClasses = () => {
    return axios.get("api/groups");
};

export const getClass = (classId) => {
    return axios.get("api/groups/" + classId);
};

export const createClass = (level, name, year, isActive, referent) => {
    let payload = {
        level,
        name,
        year,
        isActive,
        referent,
    };
    return axios.post("api/groups", payload);
};

export const deleteClass = (classId) => {
    return axios.delete("api/groups/" + classId);
};

export const editClass = (classId, level, name, year, isActive, referent) => {
    let payload = {
        level,
        name,
        year,
        isActive,
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
