import React from "react";

import ReactTable from "../../render-components/ReactTable";



<<<<<<< HEAD
function GradesTable({ grades, courses }) {
=======
function StudentTable({ grades, courses }) {
>>>>>>> bc0518620206a0f8355490672af5944d29064a08
    const columns = React.useMemo(
        () => [
            {
                Header: "Course",
                accessor: "title",
            },
            {
                Header: "Lead Teacher",
                accessor: "lead teacher",
            },
            {
                Header: "Other Teachers",
                accessor: "other teachers",
            },
            {
                Header: "Grade",
                accessor: "grade",
            },
            {
                Header: "Comment",
                accessor: "Comment",
            },
        ],
        [],
    );

    return <ReactTable data={grades} columns={columns} />;
}

<<<<<<< HEAD
export default GradesTable;
=======
export default StudentTable;
>>>>>>> bc0518620206a0f8355490672af5944d29064a08
