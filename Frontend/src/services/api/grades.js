import axios from "./axios";

export const getGrades = (courseId) => {
    let suffix = "";
    if (courseId) suffix = "?course=" + courseId.toString();
    return axios.get("api/grades" + suffix);
};

export const editGrade = (gradeId, number, comment, course, student, group) => {
    let payload = {
        number,
        comment,
        course,
        student,
        group,
    };
    return axios.put("api/grades/" + gradeId, payload);
};

export const deleteGrade = (gradeId) => {
    return axios.delete("api/grades/" + gradeId);
};

export const createGrade = (number, comment, course, student, group) => {
    let payload = {
        number,
        comment,
        course,
        student,
        group,
    };
    return axios.post("api/grades/", payload);
};
