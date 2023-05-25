import React, { useEffect, useState } from "react";

import {
    createGrade,
    editGrade,
    getActiveClasses,
    getCoursesByTeacher,
    getGrades,
} from "../../../services/api";
import TeacherTable from "./TeacherTable";
import { toastSuccess } from "../../../services/toasts";
import { Util } from "../../../services/Util";

function TeacherView() {
    const [grades, setGrades] = useState([]);
    const [courses, setCourses] = useState([]);
    const [groups, setGroups] = useState([]);

    let teacherId = 3;

    useEffect(() => {
        fetchCourses();
        fetchGrades();
        fetchGroups();
    }, []);

    const fetchCourses = async () => {
        let courses = await getCoursesByTeacher(teacherId);
        setCourses(courses);
    };
    const fetchGrades = async () => {
        let courseId = courses.map((course) => course.id);
        let grades = await getGrades(courseId);
        setGrades(grades);
    };
    const fetchGroups = async () => {
        let groups = await getActiveClasses(true);
        setGroups(groups);
    };
    //Initialize grades
    const init = groups.map((group) => {
        const students = group.students;

        students.map((student) => {
            console.log(student);
            student.courses?.map((course) => {
                if (!course.grade_id) {
                    // Create an empty grade entry object
                    const emptyGrade = {
                        id: null,
                        number: null,
                        coment: null,
                        course: course.id,
                        student: student.id,
                    };
                    //createGrade(emptyGrade)
                    console.log(emptyGrade);
                    // Add the empty grade entry to the student's course list
                    course.grade = emptyGrade;
                }
            });
        });
    });
    //console.log(init);

    //Data initializing for table
    const data = grades.map((grade) => {
        const userGroups = groups.filter((group) => {
            const groupUserIds = group.students.map((grade) => grade.student);
            return groupUserIds.includes(grade.student);
        });
        const activeGroups = userGroups.filter((group) => group.isActive);
        const groupsinfo = activeGroups.map((group) => {
            const groupString = Util.groupToStr(group);
            return { title: groupString };
        });
        return { ...grades, group: groupsinfo };
    });
    //console.log(data);

    // Function to handle grade changes
    const putGrade = async (grade) => {
        editGrade(grade.id, grade.number, grade.comment).then(() => {
            toastSuccess("Successfully saved");
        });
    };

    return <TeacherTable data={data} handleSubmit={putGrade} />;
}

export default TeacherView;
