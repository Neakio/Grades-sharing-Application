import React from "react";
import { createClass, deleteClass, getClasses } from "../../services/api";

import ClassForm from "./classes/ClassForm";
import ClassTable from "./classes/ClassTable";
import ClassesTable from "./Classes/ClassTableAdmin";

import { Link, Route, Routes, useNavigate } from "react-router-dom";
import { Button, Container } from "react-bootstrap";
import { toastError, toastSuccess } from "../../services/toasts";
import { editClass } from "../../services/api/classes";







function Classes() {
  {
    GLOBALS.USER_ROLES[userData.role] === GLOBALS.USER_ROLES.AD || GLOBALS.USER_ROLES.AR ? (
      <Administration />) : <Teacher />
  }






}

function Administration() {
  const navigate = useNavigate();
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    fetchGroups();
  }, []);

  const fetchGroups = async () => {
    let groups = await getClasses();
    setGroups(groups);
  };

  const removeClass = async (groupId) => {
    deleteClass(groupId).then(() => {
      toastSuccess("Class successfully deleted");
      fetchGroups();
    });
  };

  const removeUser = async (userId) => {
    editUser(
        userId,
        user.group=null
    ).then(() => {
        toastSuccess("Successfully removed");
        redirectToTable();
      });
    };


  const redirectToTable = () => {
    fetchGroups();
    navigate("/groups");
  };

  const addGroups = async (group) => {
    createClass(group.title, group.year, group.isActive, group.referent)
      .then(() => {
        toastSuccess("Class successfully created");
        redirectToTable();
      })
      .catch((error) => {
        console.log(error);
        toastError(error.message);
      });
  };

  const modifyGroups = async (group, groupId) => {
    editClass(
      groupId,
      group.title,
      group.year,
      group.isActive,
      group.referent,
    ).then(() => {
      toastSuccess("Successfully edited");
      redirectToTable();
    });
  };
  console.log(groups);
  return (
    <Container>
      <Routes>
        <Route
          path=""
          element={
            <>
              <div className="text-center mb-3">
                <Link to="/groups/create">
                  <Button variant="success">Create class</Button>
                </Link>
              </div>
              <ClassesTable groups={groups} removeClass={removeClass}/>
            </>
          }
        />


        <Route
          path="/:id"
          element={<ClassForm title="Edit class" handleSubmitClass={modifyGroups} />}
        />
        <Route
          path="/create"
          element={<ClassForm title="Create class" handleSubmitClass={addGroups} />}
        />
      </Routes>
    </Container>
  );
}






function Teacher() {
  return (
    <Container>
      <Routes>
        <Route
          path=""
          element={
          <><div className='d-flex flex-column justify-content-around'>
      <Link to="/classes/M2">
        <Button type="button" class="btn btn-outline-dark btn-block">
          M2
        </Button>
      </Link>
      <Link to="/classes/M1">
        <Button type="button" class="btn btn-outline-dark btn-block">
          M1
        </Button>
      </Link>
      <Link to="/classes/L3">
        <Button type="button" class="btn btn-outline-dark btn-block">
          L3
        </Button>
      </Link>
    </div></>
    }
    />

    <Route
      path="/M2"
      element={<ClassTable title="Master 2" year={group.year} removeUser={removeUser}/>}
    />
    <Route
      path="/M1"
      element={<ClassTable title="Master 1" year={group.year} removeUser={removeUser}/>}
    />
    <Route
      path="/L3"
      element={<ClassTable title="Licence" year={group.year} removeUser={removeUser}/>}
    />
  </Routes></Container>

  );
}

export default Classes;
