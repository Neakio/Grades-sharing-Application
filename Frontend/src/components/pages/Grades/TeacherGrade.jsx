import React, { useEffect, useState } from "react";

<<<<<<< HEAD
import ReactTable from "../../render-components/ReactTable";
import { getCourses, getGrades } from "../../../services/api";
=======
import { getCoursesByTeacher, getGrades } from "../../../services/api";
import TeacherTable from "./TeacherTable";
>>>>>>> bc0518620206a0f8355490672af5944d29064a08



function TeacherView() {

    const [grades, setGrades] = useState([])
    const [courses, setCourses] = useState([])

    
    useEffect(() => {
        fetchGrades();
        fetchCourses();
    }, []);

<<<<<<< HEAD
    const fetchGrades = async () => {
        let grades = await getGrades(courses.Id);
        setGrades(grades);
    };
    const fetchCourses = async () => {
        let courses = await getCourses();
        setCourses(courses);
    }
=======
    const fetchCourses = async () => {
        let courses = await getCoursesByTeacher(id);
        setCourses(courses);
    }
    const fetchGrades = async () => {
        let course = courses.map( (course) => course.id )
        let grades = await getGrades(course.Id);
        setGrades(grades);
    };
>>>>>>> bc0518620206a0f8355490672af5944d29064a08




<<<<<<< HEAD
    const columns = React.useMemo(
        () => [
            {
                Header: "Student",
                accessor: "student",
            },
            {
                Header: "Course",
                accessor: "title",
            },
            {
                Header: "Lead Teacher",
                accessor: "lead teacher",
            },
            {
                Header: "Other Teachers",
                accessor: "other teachers",
            },
            {
                Header: "Grade",
                accessor: "grade",
            },
            {
                Header: "Comment",
                accessor: "Comment",
            },
        ],
        [],
    );

    return <ReactTable data={grades} columns={columns} />;
=======
    return <TeacherTable grades={grades} courses={courses} />;
>>>>>>> bc0518620206a0f8355490672af5944d29064a08
}

export default TeacherView;
