import React from "react";

import ReactTable from "../../render-components/ReactTable";
import { Util } from "../../../services/Util";

function TeacherTable({ grades }) {
    const updateMyData = (rowIndex, columnId, value) => {
        const columns = React.useMemo(
            () => [
                {
                    Header: "Student",
                    accessor: ({ student }) => Util.formatUserName(student),
                },
                {
                    Header: "Course",
                    accessor: ({ course }) => Util.courseToStr(course),
                    filter: "includes",
                },
                {
                    Header: "Grade",
                    accessor: "grade",
                    disableFilters: false,
                },
                {
                    Header: "Comment",
                    accessor: "comment",
                    disableFilters: false,
                },
            ],
            [],
        );

        return <ReactTable data={grades} columns={columns} updateMyData={updateMyData} />;
    };
}

export default TeacherTable;
