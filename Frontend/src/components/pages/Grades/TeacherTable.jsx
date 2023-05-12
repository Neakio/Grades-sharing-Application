import React from "react";

import ReactTable from "../../render-components/ReactTable";

function TeacherTable ({grades, courses, students}) {
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
                accessor: "leadTeacher",
            },
            {
                Header: "Other Teachers",
                accessor: "otherTeachers",
            },
            {
                Header: "Grade",
                accessor: "grade",
            },
            {
                Header: "Comment",
                accessor: "comment",
            },
        ],
        [],
    );

    return <ReactTable data={grades} columns={columns} />;
}

export default TeacherTable