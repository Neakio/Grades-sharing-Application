import React from "react";

import ReactTable from "../../render-components/ReactTable";

import { ReactComponent as Edit } from "../../../assets/images/edit.svg";
import { ReactComponent as Trash } from "../../../assets/images/trash.svg";

import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Util } from "../../../services/Util";

function CourseTable({ courses, modules, removeCourse }) {
    const columns = React.useMemo(
        () => [
            {
                Header: "Title",
                accessor: "title",
            },
            {
                Header: "Lead Teacher",
                accessor: ({leadTeacher}) => Util.userName(leadTeacher),
            },
            {
                Header: "Other Teachers",
                accessor: "otherTeachers",
                Cell: ({value}) => <div>{value.map((otherTeacher, i)=><tr key={"row"+i}><td key={"td"+i}>{Util.userName(otherTeacher)}</td></tr>)}</div>
            },
            {
                Header: "In module",
                accessor: "modules",
            },
            {
                Header: "Edit",
                Cell: ({ row, value }) => (
                    <Link to={"/courses/" + row.original.id}>
                        <Button variant="info">
                            <Edit />
                        </Button>
                    </Link>
                ),
            },
            {
                Header: "Delete",
                Cell: ({ row, value }) => (
                    <Button variant="danger" onClick={() => removeCourse(row.original.id)}>
                        <Trash />
                    </Button>
                ),
            },
        ],
        [],
    );

    return <ReactTable data={courses} columns={columns} />;
}

export default CourseTable;
