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
    const [finished, setFinished] = useState(false)

    useEffect(() => {
        if (group) {
            fetchGrades();
            fetchStudents();
        }
        Promise.all([fetchGrades(), fetchStudents()]).then(() => {setFinished(true)})        
    }, [group]);
    useEffect(()=> {
        if (finished) {initializeTableData()}
    },[finished])

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
                grades.map(async (grade) => {
                    let studentGrade = grades.find((grade) => student.id === grade.student.id);
                    if (studentGrade) {student.grade = studentGrade;}
                    else {
                        grade = await addGrade(null, "", course, student.id, group)
                    };})
                return student; // Added return statement
            });
            setTableData(data);
        };

    const handleGradeChange = async (e, row) => {
        const newGrade = parseFloat(e.target.value);
        const studentId = row.values.id;
        const id = row.values["grade.id"];
        await editGrade(id, newGrade, undefined, course, studentId, group);
        
    };

    const handleCommentChange = async (e, row) => {
        const newComment = e.target.value;
        const studentId = row.values.id;
        const id = row.values["grade.id"];
        await editGrade(id, undefined, newComment, course, studentId, group);
    
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
                isVisible: false,
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