import axios from "./axios";

export const getCourses = (moduleId) => {
    suffix="";
    if (moduleId) suffix = "?module=" + moduleId.toString();
    return axios.get("api/courses" + suffix);
};

export const editCourse = (courseId, title, lead_teacher, other_teachers, modules) => {
    let payload = {
        title,
        lead_teacher,
        other_teachers,
        modules,
    };
    return axios.put("api/courses" + courseId, payload);
};

export const deleteCourse = (courseId) => {
    return axios.delete("api/courses/" + courseId);
};

export const createCourse = (title, lead_teacher, other_teachers, modules) => {
    let payload = {
        title,
        lead_teacher,
        other_teachers,
        modules,
    };
    return axios.post("api/courses" + payload);
}