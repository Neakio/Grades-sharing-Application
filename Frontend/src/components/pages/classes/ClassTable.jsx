import React from "react";

import ReactTable from "../../render-components/ReactTable";

import { ReactComponent as Edit } from "../../../assets/images/edit.svg";
import { ReactComponent as Trash } from "../../../assets/images/trash.svg";
import { ReactComponent as Plus } from "../../../assets/images/plus.svg";

import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import GLOBALS from "../../../Globals";


function SetTable({ title, year }) {

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
      <Link to={"/groups"}>
        <Button variant="info">
          Return
        </Button>
      </Link>      
      <h1> {title} </h1>
      <div>Delegate : {delegates}</div>
      <ClassTable />
    </Container>);
}

export default ClassTable;