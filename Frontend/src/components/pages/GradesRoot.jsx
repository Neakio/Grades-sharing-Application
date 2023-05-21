import React, { Fragment } from "react";
import TeacherView from "./Grades/TeacherGrade";
import StudentView from "./Grades/StudentGrade";

function Grades({ userRole }) {
    const isReferent = userRole === "Administrator Referent";
    const isTeacher = userRole === "Teacher";

    return <Fragment>{isReferent || isTeacher ? <TeacherView /> : <StudentView />}</Fragment>;
}

export default Grades;
