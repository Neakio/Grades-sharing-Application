import axios from "./axios";

export const getCourses = (courseId, moduleId) => {
    let suffix = "";
    if (courseId) suffix += "/" + courseId;
    return axios.get("api/courses" + suffix);
};

export const getCoursesByTeacher = (teacherId) => {
    return axios.get("api/courses?leadTeacher=" + teacherId + "?otherTeachers=" + teacherId);
}

export const editCourse = (courseId, title, leadTeacherId, otherTeachersIds) => {
    let payload = {
        title,
        leadTeacherId,
        otherTeachersIds,
    };
    return axios.put("api/courses/" + courseId, payload);
};

export const deleteCourse = (courseId) => {
    return axios.delete("api/courses/" + courseId);
};

export const createCourse = (title, leadTeacherId, otherTeachersIds) => {
    let payload = {
        title,
        leadTeacherId,
        otherTeachersIds,
    };
    return axios.post("api/courses", payload);
};
