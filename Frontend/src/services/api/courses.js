import axios from "./axios";

export const getCourses = (courseId, moduleId) => {
    let suffix = "";
    if (courseId) suffix += "/" + courseId;
    if (moduleId) suffix += "?module=" + moduleId.toString();
    return axios.get("api/courses" + suffix);
};

export const editCourse = (courseId, title, leadTeacher, otherTeachers, modules) => {
    let payload = {
        title,
        leadTeacher,
        otherTeachers,
        modules,
    };
    return axios.put("api/courses" + courseId, payload);
};

export const deleteCourse = (courseId) => {
    return axios.delete("api/courses/" + courseId);
};

export const createCourse = (title, leadTeacher, otherTeachers, modules) => {
    let payload = {
        title,
        leadTeacher,
        otherTeachers,
        modules,
    };
    return axios.post("api/courses", payload);
};
