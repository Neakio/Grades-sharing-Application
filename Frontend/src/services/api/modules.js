import axios from "./axios";

export const getModules = (moduleId) => {
    let suffix = "";
    if (moduleId) suffix += "/" + moduleId;
    return axios.get("api/modules" + suffix);
};

export const getModulesByGroup = (groupId) => {
    return axios.get("api/modules?groups" + groupId);
};

export const createModule = (title, groups, courses) => {
    let payload = {
        title,
        groups,
        courses,
    };
    return axios.post("api/modules", payload);
};

export const editModule = (moduleId, title, groups, courses) => {
    let payload = {
        title,
        groups,
        courses,
    };
    return axios.put("api/modules/" + moduleId, payload);
};

export const deleteModule = (moduleId) => {
    return axios.delete("api/modules/" + moduleId);
};
