import React from "react";

import ReactTable from "../../render-components/ReactTable";

import { ReactComponent as Edit } from "../../../assets/images/edit.svg";
import { ReactComponent as Trash } from "../../../assets/images/trash.svg";
import { ReactComponent as Plus } from "../../../assets/images/plus.svg";

import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import GLOBALS from "../../../Globals";


function ClassesTable({ groups, removeClass }) {
    const columns = React.useMemo(
      () => [
        {
          Header: "Class",
          accessor: ({ group }) => GLOBALS.GROUPS[group],
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
            <Link to={"/class/" + row.original.id}>
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
        }
      ],
      [],
    );
  
    return <ReactTable data={groups} columns={columns} />;
  }
  


  function ClassTable () {
    null;
  }

  export default ClassesTable;