import axios from "./axios";

export const getGrades = (studentId, courseId) => {
    suffix="";
    if (studentId) suffix = "?student=" + studentId.toString();
    if (courseId) suffix = "?course=" + courseId.toString();
    return axios.get("api/courses" + suffix);
};

export const editGrade = (gradeId, number, comment, exam_date, course, student) => {
    let payload = {
        number,
        comment,
        exam_date,
        course,
        student,
    };
    return axios.put("api/courses" + gradeId, payload);
};

export const deleteGrade = (gradeId) => {
    return axios.delete("api/grades/" + gradeId);
};

export const createGrade = (number, comment, exam_date, course, student) => {
    let payload = {
        number,
        comment,
        exam_date,
        course,
        student,
    };
    return axios.post("api/grades" + payload);
}