import axios from "./axios";

export const getModule = () => {
    return axios.get("api/modules");
};

export const editModule = (moduleId) => {

};

export const deleteModule = (moduleId) => {
    return axios.delete("api/modules/" + moduleId);
};

export const createModule = () => {

}