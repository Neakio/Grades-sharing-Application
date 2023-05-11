import React, { useEffect, useState } from "react";

import ReactTable from "../../render-components/ReactTable";
import { getCourses, getGrades } from "../../../services/api";



function TeacherView() {

    const [grades, setGrades] = useState([])
    const [courses, setCourses] = useState([])

    
    useEffect(() => {
        fetchGrades();
        fetchCourses();
    }, []);

    const fetchGrades = async () => {
        let grades = await getGrades(courses.Id);
        setGrades(grades);
    };
    const fetchCourses = async () => {
        let courses = await getCourses();
        setCourses(courses);
    }




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
}

export default TeacherView;
