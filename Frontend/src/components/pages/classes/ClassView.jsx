import React, { useEffect, useState } from "react";

import { Button, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

import ReactTable from "../../render-components/ReactTable";
import { getClass, getUserByClass, getUsersByRoleAndGroup } from "../../../services/api";
import GLOBALS from "../../../Globals";

function SetTable(groupId) {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async (groupId) => {
    let group = await getUserByClass(groupId);
    setUsers(group);
  };

  const columns = React.useMemo(
    () => [
      {
        Header: "Firsnamte",
        accessor: "firstname"
      },
      {
        Header: "Lastname",
        accessor: "lastname",
      },
    ],
    [],
  );
  return <ReactTable data={users} columns={columns} />;
}

function ClassView(groupId) {
  const [delegates, setDelegates] = useState([]);
  const [group, setGroup] = useState([]);


  useEffect(() => {
    fetchGroup(groupId);
    fetchDelegates();
  }, []);

  const fetchGroup = async () => {
    let group = await getClass();
    setGroup(group);
  };

  const fetchDelegates = async (isDelegate, groupId) => {
    let delegates = await getUsersByRoleAndGroup(isDelegate, groupId);
    setDelegates(delegates);

  };

  return (
    <Container>
      <Link to={"/classes"}>
        <Button variant="info">Return</Button>
      </Link>
      <h1> {GLOBALS.USER_ROLES[group.role]} {group.year} </h1>
      <div>Delegate : {delegates}</div>
      <SetTable groupId={groupId}/>
    </Container>
  );
}



export default ClassView;
