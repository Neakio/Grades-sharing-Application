import React, { useEffect, useState } from "react";
<<<<<<< HEAD
import { useParams } from "react-router-dom";

import GradesTable from "./StudentTable";
import { getGrades } from "../../../services/api";

function StudentView({courses}) {
    const [grades, setGrades] = useState([])
    const { id } = useParams();
    
    useEffect(() => {
        fetchGrades();
    }, []);

    const fetchGrades = async () => {
        let grades = await getGrades(id);
        setGrades(grades);
    };
    return <GradesTable grades={grades} courses={courses}/>;
=======

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
    }
    const fetchGrades = async () => {
        let grades = await getGrades(studentId);
        setGrades(grades);
    };
    return <StudentTable grades={grades} courses={courses}/>;
>>>>>>> bc0518620206a0f8355490672af5944d29064a08
}

export default StudentView;
