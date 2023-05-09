import axios from "./axios";

export const getCourses = (courseId, moduleId) => {
    let suffix = "";
    if (courseId) suffix += "/" + courseId;
    return axios.get("api/courses" + suffix);
};

export const editCourse = (courseId, title, leadTeacher, otherTeachers) => {
    let payload = {
        title,
        leadTeacher,
        otherTeachers,
    };
    return axios.put("api/courses/" + courseId, payload);
};

export const deleteCourse = (courseId) => {
    return axios.delete("api/courses/" + courseId);
};

export const createCourse = (title, leadTeacher, otherTeachers) => {
    let payload = {
        title,
        leadTeacher,
        otherTeachers,
    };
    return axios.post("api/courses", payload);
};
