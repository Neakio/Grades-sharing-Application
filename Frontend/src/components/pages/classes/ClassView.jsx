import React, { useEffect, useState } from "react";
import { Button, Container } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";

import ReactTable from "../../render-components/ReactTable";
import { getClass, getUserByClass } from "../../../services/api";

import GLOBALS from "../../../Globals";

function SetTable({ students }) {
    const columns = React.useMemo(
        () => [
            {
                Header: "Lastname",
                accessor: "lastname",
            },
            {
                Header: "Firstname",
                accessor: "firstname",
            },
        ],
        [],
    );
    return <ReactTable data={students} columns={columns} />;
}

function ClassView() {
    const [students, setStudents] = useState([]);
    const [group, setGroup] = useState([]);
    const { id } = useParams();

    useEffect(() => {
        fetchGroup(id);
        fetchUserOfClass();
    }, []);

    const fetchGroup = async () => {
        let group = await getClass(id);
        setGroup(group);
    };

    const fetchUserOfClass = async () => {
        let students = await getUserByClass(id);
        setStudents(students);
    };
    console.log(group);
    return (
        <Container>
            <Link to={"/classes"}>
                <Button variant="info">Return</Button>
            </Link>
            <h1>
                {GLOBALS.GROUPS[group.level]} {"-"} {group.name} {"("}
                {group.year}
                {")"}
            </h1>
            <div>
                Delegate :{" "}
                {students
                    .filter((student) => student.isDelegate)
                    .map((student) => student.firstname + " " + student.lastname)
                    .join(",")}
            </div>
            <SetTable students={students} />
        </Container>
    );
}

export default ClassView;
