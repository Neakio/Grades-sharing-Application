import axios from "./axios";

export const getGrades = (studentId, courseId) => {
    let suffix = "";
    if (studentId) suffix = "?student=" + studentId.toString();
    if (courseId) suffix = "?course=" + courseId.toString();
    return axios.get("api/grades" + suffix);
};

export const editGrade = (gradeId, number, comment, course, student) => {
    let payload = {
        number,
        comment,
        course,
        student,
    };
    return axios.put("api/grades/" + gradeId, payload);
};

export const deleteGrade = (gradeId) => {
    return axios.delete("api/grades/" + gradeId);
};

export const createGrade = (number, comment, course, student) => {
    let payload = {
        number,
        comment,
        course,
        student,
    };
    return axios.post("api/grades/", payload);
};
