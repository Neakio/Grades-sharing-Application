import React, { useEffect, useState } from "react";

import ReactTable from "../../render-components/ReactTable";
import { getCoursesByTeacher, getGrades } from "../../../services/api";
import TeacherTable from "./TeacherTable";



function TeacherView(grades, courses) {

    const [grades, setGrades] = useState([])
    const [courses, setCourses] = useState([])

    
    useEffect(() => {
        fetchGrades();
        fetchCourses();
    }, []);

    const fetchCourses = async () => {
        let courses = await getCoursesByTeacher(id);
        setCourses(courses);
    }
    const fetchGrades = async () => {
        let course = courses.map( (course) => course.id )
        let grades = await getGrades(course.Id);
        setGrades(grades);
    };




    return <TeacherTable grades={grades} courses={courses} students={students}/>;
}

export default TeacherView;
