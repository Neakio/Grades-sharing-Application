import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import StudentTable from "./StudentTable";
import { getGrades } from "../../../services/api";

function StudentView({courses}) {
    const [grades, setGrades] = useState([])
    const { studentId } = useParams();
    
    useEffect(() => {
        fetchGrades();
    }, []);

    const fetchGrades = async () => {
        let grades = await getGrades(studentId);
        setGrades(grades);
    };
    return <StudentTable grades={grades} courses={courses}/>;
}

export default StudentView;
