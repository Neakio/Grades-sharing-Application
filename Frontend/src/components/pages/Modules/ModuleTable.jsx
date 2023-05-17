import React from "react";
import ReactTable from "../../render-components/ReactTable";

import { ReactComponent as Edit } from "../../../assets/images/edit.svg";
import { ReactComponent as Trash } from "../../../assets/images/trash.svg";

import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Util } from "../../../services/Util";

function ModuleTable({ modules, removeModule }) {
    const columns = React.useMemo(
        () => [
            {
                Header: "Title",
                accessor: "title",
            },
            {
                Header: "Classes linked",
                accessor: "groups",
                Cell: ({value}) => <div>{value.map((group, i)=><tr key={"row"+i}><td key={"td"+i}>{Util.groupToStr(group)}</td></tr>)}</div>

            
            },
            {
                Header: "Courses contained",
                accessor: "courses",
                Cell: ({value}) => <div>{value.map((course, i)=><tr key={"row"+i}><td key={"td"+i}>{Util.courseToStr(course)}</td></tr>)}</div>
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
