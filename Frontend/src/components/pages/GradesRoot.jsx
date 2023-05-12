import React, { useEffect, useState } from "react";
import TeacherView from "./Grades/TeacherGrade";
import StudentView from "./Grades/StudentGrade";
import { getCourses, getGrades } from "../../services/api";
import { Container } from "react-bootstrap";

function Grades({ userRole }) {
    const isReferent = userRole.endsWith("Referent");
    const isTeacher = userRole === "Teacher";


    const [courses, setCourses] = useState([])

    
    useEffect(() => {
        fetchCourses();
    }, []);


    const fetchCourses = async () => {
        let courses = await getCourses();
        setCourses(courses);
    }



    return (
        <Container>
            {isReferent || isTeacher ? (
                <TeacherView/>
            ) : (
                <StudentView courses={courses} />
            )}
        </Container>
    );
}

export default Grades;
