import React, { useState } from "react";

import ReactTable from "../../render-components/ReactTable";
import { Util } from "../../../services/Util";
import { NumberRangeColumnFilter, SelectColumnFilter } from "../../render-components/TableFilters";

function TeacherTable({ data, handleSubmit }) {
    const [gradeData, setGradeData] = useState({
        studentId: null,
        courseId: null,
        number: null,
        comment: null,
    });

    const handleChange = (row, event) => {
        let data = row.original;
        let name = event.target.name;
        let value = event.target.value;
        handleSubmit({ ...data, [name]: value });
    };

    const columns = React.useMemo(
        () => [
            {
                Header: "Student",
                accessor: ({ student }) => Util.formatUserName(student),
                filter: "includes",
            },
            {
                Header: "Class",
                accessor: "group",
                Filter: SelectColumnFilter,
                filter: "includes",
            },
            {
                Header: "Course",
                accessor: ({ course }) => Util.courseToStr(course),
                Filter: SelectColumnFilter,
                filter: "includes",
            },
            {
                Header: "Grade",
                accessor: "grade",
                Filter: NumberRangeColumnFilter,
                filter: "between",
                Cell: ({ row, value }) => (
                    <input
                        name="number"
                        defaultValue={value}
                        onBlur={(event) => handleChange(row, event)}
                    />
                ),
            },
            {
                Header: "Comment",
                accessor: "comment",
                disableFilters: true,
                Cell: ({ row, value }) => (
                    <input
                        name="comment"
                        defaultValue={value}
                        onBlur={(event) => handleChange(row, event)}
                    />
                ),
            },
        ],
        [],
    );

    return (
        <>
            <ReactTable data={data} columns={columns} />
            <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                <button className="btn btn-outline-success me-md-2" type="submit">
                    Submit
                </button>
            </div>
        </>
    );
}

export default TeacherTable;
