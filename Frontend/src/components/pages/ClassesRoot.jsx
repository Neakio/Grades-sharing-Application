import React, { useState, useEffect } from "react";
import { createClass, deleteClass, getClasses } from "../../services/api";

import ClassForm from "./classes/ClassForm";
import ClassTable from "./classes/ClassTable";
{
  /*import ClassesTable from "./classes/ClassTableAdmin";*/
}

import { Link, Route, Routes, useNavigate } from "react-router-dom";
import { Button, Container } from "react-bootstrap";
import { toastError, toastSuccess } from "../../services/toasts";
import { editClass } from "../../services/api/classes";
import ClassesTable from "./classes/ClassTableAdmin";

function Classes({ userRole }) {
  const [groups, setGroups] = useState([]);
  const isAdmin = userRole.startsWith("Admin");

  useEffect(() => {
    fetchGroups();
  }, []);

  const fetchGroups = async () => {
    let groups = await getClasses();
    setGroups(groups);
  };
  return (
    <Container>
      {isAdmin ? (
        <Administration groups={groups} fetchGroups={fetchGroups} />
      ) : (
        <Teacher groups={groups} />
      )}
    </Container>
  );
}

function Administration({ groups, fetchGroups }) {
  const navigate = useNavigate();

  const removeClass = async (groupId) => {
    deleteClass(groupId).then(() => {
      toastSuccess("Class successfully deleted");
      fetchGroups();
    });
  };

  const redirectToTable = () => {
    fetchGroups();
    navigate("/classes");
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
    editClass(groupId, group.title, group.year, group.isActive, group.referent).then(() => {
      toastSuccess("Successfully edited");
      redirectToTable();
    });
  };
  return (
    <Container>
      <Routes>
        <Route
          path=""
          element={
            <>
              <div className="text-center mb-3">
                <Link to="/classes/create">
                  <Button variant="success">Create class</Button>
                </Link>
              </div>
              <ClassesTable
                groups={groups}
                removeClass={removeClass}
                redirectToTable={redirectToTable}
              />
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

function Teacher(groups) {
  return (
    <Container>
      <Routes>
        <Route
          path=""
          element={
            <>
              <div className="d-flex flex-column justify-content-around">
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
              </div>
            </>
          }
        />

        <Route path="/M2" element={<ClassTable title="Master 2" year={groups.year} />} />
        <Route path="/M1" element={<ClassTable title="Master 1" year={groups.year} />} />
        <Route path="/L3" element={<ClassTable title="Licence" year={groups.year} />} />
      </Routes>
    </Container>
  );
}

export default Classes;
