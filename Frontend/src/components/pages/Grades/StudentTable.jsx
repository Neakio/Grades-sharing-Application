import React from "react";

import ReactTable from "../../render-components/ReactTable";
import { Util } from "../../../services/Util";

function StudentTable({ grades }) {
    const columns = React.useMemo(
        () => [
            {
                Header: "Course",
                accessor: "title",
            },
            {
                Header: "Lead Teacher",
                accessor: ({ leadTeacher }) => Util.formatUserName(leadTeacher),
            },
            {
                Header: "Other Teachers",
                accessor: "otherTeachers",
                Cell: ({ value }) => (
                    <div>
                        {value?.map((otherTeacher, i) => (
                            <tr key={"row" + i}>
                                <td key={"td" + i}>{Util.formatUserName(otherTeacher)}</td>
                            </tr>
                        ))}
                    </div>
                ),
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

export default StudentTable;
