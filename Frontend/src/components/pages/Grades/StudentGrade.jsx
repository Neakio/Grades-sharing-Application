import React, { useEffect, useState } from "react";

import StudentTable from "./StudentTable";
import { getGrades, getModules, getUserfromClass } from "../../../services/api";

function StudentView() {
    const [grades, setGrades] = useState([]);
    const [courses, setCourses] = useState([]); 
    let studentId = 3;


    useEffect(() => {
        fetchGroup();
        fetchGrades();
        fetchCourses();
    }, []);

    const fetchGroup = async () => {
        let group = await getUserfromClass(studentId);
        let groupId = group.id;

    }
    const fetchCourses = async () => {
        let courses = await getModules(groupId);
        setCourses(courses);
    };
    const fetchGrades = async () => {
        let grades = await getGrades(studentId);
        setGrades(grades);
    };
    return <StudentTable grades={grades} courses={courses}/>;
}

export default StudentView;
