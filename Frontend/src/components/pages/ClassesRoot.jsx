import React, { useState, useEffect } from "react";
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import { Button, Container } from "react-bootstrap";
import { toastError, toastSuccess } from "../../services/toasts";

import { createClass, deleteClass, getClasses } from "../../services/api";
import { editClass } from "../../services/api/classes";

import ClassForm from "./Classes/ClassForm";
import ClassView from "./Classes/ClassView";
import ClassesTable from "./Classes/ClassTableAdmin";

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

    const addGroup = async (group) => {
        createClass(group.level, group.year, group.isActive, group.referent)
            .then(() => {
                toastSuccess("Class successfully created");
                redirectToTable();
            })
            .catch((error) => {
                toastError(error.message);
            });
    };

    const modifyGroups = async (group, groupId) => {
        editClass(groupId, group.level, group.year, group.isActive, group.referent).then(() => {
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
                            <ClassesTable groups={groups} removeClass={removeClass} />
                        </>
                    }
                />
                <Route path="/:id" element={<ClassView />} />
                <Route
                    path="/edit/:id"
                    element={<ClassForm title="Edit class" handleSubmitClass={modifyGroups} />}
                />
                <Route
                    path="/create"
                    element={<ClassForm title="Create class" handleSubmitClass={addGroup} />}
                />
            </Routes>
        </Container>
    );
}

function Teacher(props) {
    return (
        <Container>
            <Routes>
                <Route
                    path=""
                    element={
                        <>
                            <h1>Groups</h1>

                            <div className="d-flex flex-column justify-content-around ">
                                {props.groups.map((group) => {
                                    if (group.is_active) {
                                        return (
                                            <Link to={`/classes/${group.id}`} key={group.id}>
                                                <Button
                                                    type="button"
                                                    class="btn btn-outline-dark btn-block"
                                                >
                                                    {group.level} ({group.year})
                                                </Button>
                                            </Link>
                                        );
                                    } else {
                                        return null;
                                    }
                                })}
                            </div>
                        </>
                    }
                />
                <Route path="/:id" element={<ClassView />} />
            </Routes>
        </Container>
    );
}

export default Classes;
