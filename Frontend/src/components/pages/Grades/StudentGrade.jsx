import React, { useEffect, useState } from "react";

import StudentTable from "./StudentTable";
import { getCourses, getGrades } from "../../../services/api";

function StudentView() {
    const [grades, setGrades] = useState([]);
    const [courses, setCourses] = useState([]); 
    
    useEffect(() => {
        fetchGrades();
        fetchCourses();
    }, []);

    const fetchCourses = async () => {
        let courses = await getCourses();
        setCourses(courses);
    };
    const fetchGrades = async () => {
        let grades = await getGrades();
        setGrades(grades);
    };
    return <StudentTable grades={grades} courses={courses}/>;
}

export default StudentView;
