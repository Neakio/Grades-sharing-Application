import React from "react";

import ReactTable from "../../render-components/ReactTable";

function TeacherTable({ grades}) {
    const updateMyData = (rowIndex, columnId, value) => {
    const columns = React.useMemo(
        () => [
            { Header: "Student", accessor: "student.name" },
            { Header: "Course", accessor: "course.name" },
            { Header: "Grade", accessor: "grade", Cell: EditableCell },
            { Header: "Comment", accessor: "comment", Cell: EditableCell },
        ],
        [],
    );

    return <ReactTable data={grades} columns={columns} updateMyData={updateMyData} />;
}

export default TeacherTable;
