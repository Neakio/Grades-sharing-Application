import React, { useEffect, useState } from "react";
import TeacherView from "./Grades/TeacherGrade";
import StudentView from "./Grades/StudentGrade";
import { getCourses, getGrades } from "../../services/api";
import { Container } from "react-bootstrap";

function Grades({ userRole }) {
    const isReferent = userRole.endsWith("Referent");
    const isTeacher = userRole === "Teacher";


<<<<<<< HEAD
    const [grades, setGrades] = useState([])
=======
>>>>>>> bc0518620206a0f8355490672af5944d29064a08
    const [courses, setCourses] = useState([])

    
    useEffect(() => {
<<<<<<< HEAD
        fetchGrades();
        fetchCourses();
    }, []);

    const fetchGrades = async () => {
        let grades = await getGrades();
        setGrades(grades);
    };
=======
        fetchCourses();
    }, []);


>>>>>>> bc0518620206a0f8355490672af5944d29064a08
    const fetchCourses = async () => {
        let courses = await getCourses();
        setCourses(courses);
    }



    return (
        <Container>
            {isReferent || isTeacher ? (
<<<<<<< HEAD
                <TeacherView grades={grades}/>
=======
                <TeacherView/>
>>>>>>> bc0518620206a0f8355490672af5944d29064a08
            ) : (
                <StudentView courses={courses} />
            )}
        </Container>
    );
}

export default Grades;
