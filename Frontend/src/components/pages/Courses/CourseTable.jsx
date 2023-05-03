import React from "react";

import ReactTable from "../../render-components/ReactTable";

import { ReactComponent as Edit } from "../../../assets/images/edit.svg";
import { ReactComponent as Trash } from "../../../assets/images/trash.svg";

import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

function CourseTable({ courses, removeCourse }) {
  const columns = React.useMemo(
    () => [
      {
        Header: "Title",
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
        Header: "In module",
        accessor: "in module",
      },
      {
        Header: "Edit",
        Cell: ({ row, value }) => (
          <Link to={"/users/" + row.original.id}>
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
