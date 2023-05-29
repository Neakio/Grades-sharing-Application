import React, { useEffect, useState } from "react";

import ReactTable from "../../render-components/ReactTable";
import { Util } from "../../../services/Util";
import { NumberRangeColumnFilter } from "../../render-components/TableFilters";
import { addGrade, editGrade, getClass, getTeacherGrades } from "../../../services/api";

function TeacherTable({ course, group }) {
    const [students, setStudents] = useState([]);
    const [tableData, setTableData] = useState([]);

    useEffect(() => {
        if (group) {
            fetchGrades();
            fetchStudents();
        }
    }, [group]);
    useEffect(() => {
        initializeTableData();
    }, [students]);

    const fetchStudents = async () => {
        let studentgroup = await getClass(group);
        setStudents(studentgroup["students"]);
        console.log(students);
        console.log(studentgroup);
    };
    const initializeTableData = () => {
        const initialData = students.map((student) => ({
            studentId: student.id,
            name: Util.formatUserName(student),
            grade: null, // Set initial grade as null
            comment: "", // Set initial comment as empty string
        }));
        setTableData(initialData);
    };
    const fetchGrades = async () => {
        let grades = await getTeacherGrades(group, course);
        const tableData = grades.data;

        // Update the tableData state with the retrieved grades/comments
        const updatedData = tableData.map((student) => {
            const grade = tableData.find((grade) => grade.student === student.studentId);
            if (grade) {
                student.grade = grade.number;
                student.comment = grade.comment;
            }
            return student;
        });

        setTableData(updatedData);
    };

    const handleGradeChange = async (e, row) => {
        const newGrade = parseFloat(e.target.value);
        const studentId = tableData[row.index].studentId;

        // Check if the student already has a grade or not
        const existingGrade = tableData[row.index].grade;

        // If there is an existing grade, update it with PUT request
        if (existingGrade) {
            try {
                await editGrade(existingGrade.id, { number: newGrade });
            } catch (error) {
                console.error(error);
            }
        }
        // If there is no existing grade, create a new grade with POST request
        else {
            const response = await addGrade({
                number: newGrade,
                student: studentId,
            });
            const createdGrade = response.data;
            const updatedData = [...tableData];
            updatedData[row.index].grade = createdGrade.number;
            setTableData(updatedData);
        }
    };

    const handleCommentChange = async (e, row) => {
        const newComment = e.target.value;
        const studentId = tableData[row.index].studentId;

        // Check if the student already has a comment or not
        const existingComment = tableData[row.index].comment;

        // If there is an existing comment, update it with PUT request
        if (existingComment) {
            await editGrade(existingComment.id, {
                comment: newComment,
            });
        }
        // If there is no existing comment, create a new comment with POST request
        else {
            const response = await addGrade({
                comment: newComment,
                student: studentId,
            });
            const createdComment = response.data;
            const updatedData = [...tableData];
            updatedData[row.index].comment = createdComment.comment;
            setTableData(updatedData);
        }
    };
    console.log(tableData);
    const columns = React.useMemo(
        () => [
            {
                Header: "Student",
                accessor: "name",
                filter: "includes",
            },
            {
                Header: "Grade",
                accessor: "grade",
                Filter: NumberRangeColumnFilter,

                filter: "between",
                Cell: ({ row }) => (
                    <input
                        type="number"
                        value={row.original.grade || ""}
                        onChange={(e) => handleGradeChange(e, row)}
                    />
                ),
            },
            {
                Header: "Comment",
                accessor: "comment",
                disableFilters: true,

                Cell: ({ row }) => (
                    <textarea
                        value={row.original.comment || ""}
                        onChange={(e) => handleCommentChange(e, row)}
                    />
                ),
            },
        ],
        [],
    );

    return (
        <>
            {/*            

             */}
            <ReactTable data={tableData} columns={columns} />
        </>
    );
}

export default TeacherTable;
