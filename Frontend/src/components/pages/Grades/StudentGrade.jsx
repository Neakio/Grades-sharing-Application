import React, { useEffect, useState } from "react";
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
}

export default StudentView;
