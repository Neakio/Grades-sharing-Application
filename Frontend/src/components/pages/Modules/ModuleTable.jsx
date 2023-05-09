import React from "react";
import ReactTable from "../../render-components/ReactTable";

import { ReactComponent as Edit } from "../../../assets/images/edit.svg";
import { ReactComponent as Trash } from "../../../assets/images/trash.svg";

import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

function ModuleTable({ modules, removeModule }) {
    console.log(modules)
    const columns = React.useMemo(
        () => [
            {
                Header: "Title",
                accessor: "title",
            },
            {
                Header: "Classes linked",
                accessor: "classes",
            },
            {
                Header: "Courses contained",
                accessor: "courses"
            },
            {
                Header: "Edit",
                Cell: ({ row, value }) => (
                    <Link to={"/modules/" + row.original.id}>
                        <Button variant="info">
                            <Edit />
                        </Button>
                    </Link>
                ),
            },
            {
                Header: "Delete",
                Cell: ({ row, value }) => (
                    <Button variant="danger" onClick={() => removeModule(row.original.id)}>
                        <Trash />
                    </Button>
                ),
            },
        ],
        [],
    );

    return <ReactTable data={modules} columns={columns} />;
}

export default ModuleTable;
