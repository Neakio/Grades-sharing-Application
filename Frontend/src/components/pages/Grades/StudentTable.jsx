import React from "react";

import ReactTable from "../../render-components/ReactTable";



function StudentTable({ grades, courses }) {
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

export default StudentTable;
