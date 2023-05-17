import React, { useEffect, useState } from "react";

import { getCoursesByTeacher, getGrades } from "../../../services/api";
import TeacherTable from "./TeacherTable";



function TeacherView() {

    const [grades, setGrades] = useState([])
    const [courses, setCourses] = useState([])

    
    useEffect(() => {
        fetchGrades();
        fetchCourses();
    }, []);

    const fetchCourses = async () => {
        let courses = await getCoursesByTeacher();
        setCourses("cours : " + courses);
    }
    console.log(courses)
    const fetchGrades = async () => {
        let course = courses.map( (course) => course)
        let grades = await getGrades(course);
        setGrades(grades);
    };
    console.log("notes : " + grades)




    return <TeacherTable grades={grades} courses={courses} />;
}

export default TeacherView;
