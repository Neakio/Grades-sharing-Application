import React, { useEffect, useState } from "react";
import TeacherView from "./Grades/TeacherGrade";
import StudentView from "./Grades/StudentGrade";
import { getCourses, getGrades } from "../../services/api";
import { Container } from "react-bootstrap";

function Grades({ userRole }) {
    const isReferent = userRole.endsWith("Referent");
    const isTeacher = userRole === "Teacher";


    const [grades, setGrades] = useState([])
    const [courses, setCourses] = useState([])

    
    useEffect(() => {
        fetchGrades();
        fetchCourses();
    }, []);

    const fetchGrades = async () => {
        let grades = await getGrades();
        setGrades(grades);
    };
    const fetchCourses = async () => {
        let courses = await getCourses();
        setCourses(courses);
    }



    return (
        <Container>
            {isReferent || isTeacher ? (
                <TeacherView grades={grades}/>
            ) : (
                <StudentView courses={courses} />
            )}
        </Container>
    );
}

export default Grades;
