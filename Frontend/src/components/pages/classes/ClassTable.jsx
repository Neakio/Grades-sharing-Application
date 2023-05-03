import React, { useEffect, useState } from "react";

import { Button, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

import ReactTable from "../../render-components/ReactTable";
import { getClasses, getUsers } from "../../../services/api";

function SetTable() {
  const [group, setGroup] = useState([]);

  useEffect(() => {
    fetchGroup();
  }, []);

  const fetchGroup = async (title) => {
    let group = await getClasses(title);
    setGroup(group);
  };

  const columns = React.useMemo(
    () => [
      {
        Header: "First name",
        accessor: "firstname",
      },
      {
        Header: "Last name",
        accessor: "lastname",
      },
    ],
    [],
  );
  return <ReactTable data={group} columns={columns} />;
}

function ClassTable(title) {
  const [delegates, setDelegates] = useState([]);

  useEffect(() => {
    fetchDelegates();
  }, []);

  const fetchDelegates = async (isDelegate, groupId) => {
    let delegates = await getUsers(isDelegate, groupId);
    setDelegates(delegates);
  };

  return (
    <Container>
      <Link to={"/classes"}>
        <Button variant="info">Return</Button>
      </Link>
      <h1> {title} </h1>
      <div>Delegate : {delegates}</div>
      <SetTable />
    </Container>
  );
}

export default ClassTable;
