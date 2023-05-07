import axios from "./axios";

export const getModules = (groupId) => {
    let suffix = "";
    if (groupId) suffix = "?group=" + groupId.toString();
    return axios.get("api/modules" + suffix);
};

export const editModule = (moduleId, title, groups, courses) => {
    let payload = {
        title,
        groups,
        courses,
    };
    return axios.put("api/modules" + moduleId, payload);
};

export const deleteModule = (moduleId) => {
    return axios.delete("api/modules/" + moduleId);
};

export const createModule = (title, groups, courses) => {
    let payload = {
        title,
        groups,
        courses,
    };
    return axios.post("api/modules" + payload);
};
