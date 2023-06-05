import React, { useEffect, useState } from "react";

import ReactTable from "../../render-components/ReactTable";
import { Util } from "../../../services/Util";
import { NumberRangeColumnFilter } from "../../render-components/TableFilters";
import { addGrade, editGrade, getClass, getTeacherGrades } from "../../../services/api";
import { Form } from "react-bootstrap";

function TeacherTable({ course, group }) {
    const [students, setStudents] = useState([]);
    const [tableData, setTableData] = useState([]);
    const [grades, setGrades] = useState([]);

    useEffect(() => {
        if (group) {
            fetchGrades();
            fetchStudents();
        }
    }, [group]);
    useEffect(() => {
        initializeTableData();
    }, [students, grades]);

    const fetchStudents = async () => {
        let studentgroup = await getClass(group);
        setStudents(studentgroup["students"]);
    };
    const fetchGrades = async () => {
        let grades = await getTeacherGrades(group, course);
        setGrades(grades);
    };
    const initializeTableData = () => {
        let data = students.map((student) => {
            let studentGrade = grades.find((grade) => student.id === grade.student.id);
            if (studentGrade) student.grade = studentGrade;
            else student.grade = { id: null, number: null, comment: "" };
            return student; // Added return statement
        });
        setTableData(data);
    };

    const handleGradeChange = async (e, row) => {
        const newGrade = parseFloat(e.target.value);
        const studentId = row.values.id;
        // Check if the student already has an entry or not
        const exist = row.values["grade.id"];

        // If there is an existing entry, update it with PUT request
        if (exist) {
            await editGrade(exist, newGrade, undefined, course, studentId, group);
        }
        // If there is no existing entry, create a new grade with POST request
        else {
            const response = await addGrade(newGrade, undefined, course, studentId, group);
            const createdGrade = response;
            const updatedData = [...tableData];
            console.log(row);
            updatedData[row.index]["grade.number"] = createdGrade.number;
            updatedData[row.index]["grade.id"] = createdGrade.id;
            console.log(row);
            console.log(createdGrade);
            setTableData(updatedData);
        }
    };

    const handleCommentChange = async (e, row) => {
        const newComment = e.target.value;
        const studentId = row.values.id;

        // Check if the student already has an entry or not
        const exist = row.values["grade.id"];
        // If there is an existing entry, update it with PUT request
        if (exist) {
            await editGrade(exist, undefined, newComment, course, studentId, group);
        }

        // If there is no existing entry, create a new comment with POST request
        else {
            const response = await addGrade(undefined, newComment, course, studentId, group);
            const createdComment = response;
            const updatedData = [...tableData];
            updatedData[row.index]["grade.comment"] = createdComment.comment;
            updatedData[row.index]["grade.id"] = createdComment.id;
            setTableData(updatedData);
        }
    };
    const columns = React.useMemo(
        () => [
            {
                Header: "ID",
                accessor: "id",
                isVisible: false,
            },
            {
                Header: "Grade ID",
                accessor: "grade.id",
                isVisible: true,
            },
            {
                Header: "Student",
                accessor: ({ firstname, lastname }) => Util.formatUserName({ firstname, lastname }),
                filter: "includes",
            },
            {
                Header: "Grade",
                accessor: "grade.number",
                Filter: NumberRangeColumnFilter,
                filter: "between",
                Cell: ({ row, value }) => (
                    <Form.Control
                        type="number"
                        as="textarea"
                        defaultValue={value || ""}
                        onBlur={(e) => handleGradeChange(e, row)}
                    />
                ),
            },
            {
                Header: "Comment",
                accessor: "grade.comment",
                disableFilters: true,
                Cell: ({ row, value }) => (
                    <Form.Control
                        as="textarea"
                        defaultValue={value || ""}
                        onBlur={(e) => handleCommentChange(e, row)}
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
