import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

import ReactTable from "../../render-components/ReactTable";

import { ReactComponent as Edit } from "../../../assets/images/edit.svg";
import { ReactComponent as Trash } from "../../../assets/images/trash.svg";

import GLOBALS from "../../../Globals";

function ClassesTable({ groups, removeClass }) {
    const columns = React.useMemo(
        () => [
            {
                accessor: "id",
                isVisible: false,
            },
            {
                Header: "Level",
                accessor: "level",
            },
            {
                Header: "Class",
                accessor: "name",
                Cell: ({ row, value }) => (
                    <Link to={"/classes/" + row.original.id}>
                        <Button variant="info">{value}</Button>
                    </Link>
                ),
            },

            {
                Header: "Year",
                accessor: "year",
            },
            {
                Header: "Status",
                accessor: ({ isActive }) => GLOBALS.isActive[isActive],
            },
            {
                Header: "Edit",
                Cell: ({ row, value }) => (
                    <Link to={"/classes/edit/" + row.original.id}>
                        <Button variant="info">
                            <Edit />
                        </Button>
                    </Link>
                ),
            },
            {
                Header: "Delete",
                Cell: ({ row, value }) => (
                    <Button variant="danger" onClick={() => removeClass(row.original.id)}>
                        <Trash />
                    </Button>
                ),
            },
        ],
        [],
    );

    return <ReactTable data={groups} columns={columns} />;
}

export default ClassesTable;
