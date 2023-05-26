import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

import ReactTable from "../../render-components/ReactTable";

import { ReactComponent as Edit } from "../../../assets/images/edit.svg";
import { ReactComponent as Trash } from "../../../assets/images/trash.svg";

import GLOBALS from "../../../Globals";
import { SelectColumnFilter } from "../../render-components/TableFilters";

function ClassesTable({ groups, removeClass}, darkmode ) {
    const columns = React.useMemo(
        () => [
            {
                accessor: "id",
                isVisible: false,
            },
            {
                Header: "Level",
                accessor: "level",
                Filter: SelectColumnFilter,
                filter: "includes",
            },
            {
                Header: "Class",
                accessor: "name",
                Cell: ({ row, value }) => (
                    <Link to={"/classes/" + row.original.id}>
                        <button className={`btn btn-outline-${darkmode ? "dark" : "light"}`}>{value}</button>
                    </Link>
                ),
            },

            {
                Header: "Year",
                accessor: "year",
                Filter: SelectColumnFilter,
                filter: "includes",
            },
            {
                Header: "Status",
                accessor: ({ isActive }) => GLOBALS.isActive[isActive],
                Filter: SelectColumnFilter,
                filter: "includes",
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
