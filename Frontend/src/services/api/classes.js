import axios from "./axios";

export const getClassesUser = (filterActive = true) => {
    let suffix = "";
    if (filterActive) suffix = "?active=" + filterActive.toString();
    return axios.get("api/groups/" + suffix);
};

export const getClasses = () => {
    return axios.get("api/groups");
};

export const getClass = (classId, filterActive = true) => {
    let suffix = "";
    if (filterActive) suffix = "?active=" + filterActive.toString();
    return axios.get("api/groups/" + classId + suffix);
};

export const createClass = (title, year, isActive, referent) => {
    let payload = {
        title,
        year,
        is_active: isActive,
        referent,
    };
    return axios.post("api/groups" + payload);
};

export const deleteClass = (classId) => {
    return axios.delete("api/groups/" + classId);
};

export const getDelegate = (classId) => {
    return axios.get("api/user/?delegate=" + true + "?group=" + classId);
};

export const editClass = (classId, title, year, isActive, referent) => {
    let payload = {
        title,
        year,
        is_active: isActive,
        referent,
    };
    return axios.put("api/users/" + classId, payload);
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
