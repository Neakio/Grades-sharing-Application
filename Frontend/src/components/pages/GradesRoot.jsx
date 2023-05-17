import React, { useEffect, useState } from "react";
import TeacherView from "./Grades/TeacherGrade";
import StudentView from "./Grades/StudentGrade";
import { Container } from "react-bootstrap";

function Grades({ userRole }) {
    const isReferent = userRole === "Administrator Referent";
    const isTeacher = userRole === "Teacher";

    return (
        <Container>
            {isReferent || isTeacher ? (
                <TeacherView/>
            ) : (
                <StudentView  />
            )}
        </Container>
    );
}

export default Grades;
