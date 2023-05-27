import React, { Fragment } from "react";
import TeacherGrades from "./Grades/TeacherGrades";
import StudentGrades from "./Grades/StudentGrades";
import { Route, Routes } from "react-router-dom";

function Grades({ userId, userRole }) {
    const isReferent = userRole === "Administrator Referent";
    const isTeacher = userRole === "Teacher";

    const getGradesView = () => {
        switch (userRole) {
        case "Administrator Referent":
            return <div></div>;
        case "Teacher":
            return <TeacherGrades userRole={userRole} userId={userId} />;
        case "Student":
            return <StudentGrades userId={userId} userRole={userRole} />;
        default:
            return null;
        }
    };
    return (
        <Fragment>
            {getGradesView()}
            <Routes>
                <Route path="/:id" element={<StudentGrades userRole={userRole} />} />
            </Routes>
        </Fragment>
    );
}

export default Grades;
