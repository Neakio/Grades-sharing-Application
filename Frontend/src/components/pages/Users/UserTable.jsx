import React from "react";

import ReactTable from "../../render-components/ReactTable";
import SelectColumnFilter from "../../render-components/tablefilter";
import { ReactComponent as Edit } from "../../../assets/images/edit.svg";
import { ReactComponent as Trash } from "../../../assets/images/trash.svg";

import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import GLOBALS from "../../../Globals";
import { Util } from "../../../services/Util";

function UserTable({ users, removeUser }) {
    const columns = React.useMemo(
        () => [
            {
                accessor: "id",
                isVisible: false,
            },
            {
                Header: "First name",
                accessor: "firstname",
            },
            {
                Header: "Last name",
                accessor: "lastname",
            },
            {
                Header: "Role",
                accessor: ({ role }) => GLOBALS.USER_ROLES[role],
                Filter: SelectColumnFilter,
                filter: 'includes',
            },
            {
                Header: "Class",
                accessor: ({ group }) => Util.groupToStr(group),
            },
            {
                Header: "Edit",
                Cell: ({ row }) => (
                    <Link to={"/users/" + row.original.id}>
                        <Button variant="info">
                            <Edit />
                        </Button>
                    </Link>
                ),
            },
            {
                Header: "Delete",
                Cell: ({ row }) => (
                    <Button variant="danger" onClick={() => removeUser(row.original.id)}>
                        <Trash />
                    </Button>
                ),
            },
        ],
        [],
    );

    return (
        <div>
            <ReactTable data={users} columns={columns} />;
        </div>)
}

export default UserTable;
