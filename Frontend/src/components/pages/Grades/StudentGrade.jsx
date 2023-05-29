import React, { useEffect, useState } from "react";

import StudentTable from "./StudentTable";
import { getGrades, getModules, getUserfromClass } from "../../../services/api";

function StudentView() {
    const [grades, setGrades] = useState([]);
    const [modules, setCourses] = useState([]);
    const [groupId, setGroupId] = useState([]);
    let studentId = 2;

    useEffect(() => {
        fetchGroup();
        fetchGrades();
        fetchModules();
    }, []);

    const fetchGroup = async () => {
        let group = await getUserfromClass(studentId);
        setGroupId(group.id);
    };
    const fetchModules = async () => {
        let modules = await getModules(null, groupId);
        setCourses(modules);
    };
    const fetchGrades = async () => {
        let grades = await getGrades(studentId);
        setGrades(grades);
    };

    // Create an object to store modules and their corresponding grades
    const moduleData = {};

    // Iterate over each grade
    grades.map((grade) => {
        const module = modules.find((module) => module.courses.includes(grade.courseId));

        // Create a new grade object
        const gradeObject = {
            student: grade.student,
            course: grade.course,
            grade: grade.grade,
            comment: grade.comment,
        };

        // Check if the module already exists in moduleData
        if (moduleData[module.id]) {
            // Add the grade to the existing module
            moduleData[module.id].push(gradeObject);
        } else {
            // Create a new module entry and add the grade
            moduleData[module.id] = [gradeObject];
        }
    });

    // Convert the moduleData object into an array of modules
    const data = Object.keys(moduleData).map((moduleId) => ({
        module: moduleId,
        grades: moduleData[moduleId],
    }));
    data.map;

return <StudentTable data={data} courses={courses} />;
}

export default StudentView;
