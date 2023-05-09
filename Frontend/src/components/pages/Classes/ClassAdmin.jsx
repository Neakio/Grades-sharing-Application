import React from "react";
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import { Button, Container } from "react-bootstrap";
import { toastError, toastSuccess } from "../../../services/toasts";

import { editClass, createClass, deleteClass } from "../../../services/api";

import ClassForm from "./ClassForm";
import ClassView from "./ClassView";
import ClassesTable from "./ClassTableAdmin";

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
        createClass(group.level, group.name, group.year, group.isActive, group.referent)
            .then(() => {
                toastSuccess("Class successfully created");
                redirectToTable();
            })
            .catch((error) => {
                toastError(error.message);
            });
    };

    const modifyGroups = async (group, groupId) => {
        editClass(
            groupId,
            group.level,
            group.name,
            group.year,
            group.isActive,
            group.referent,
        ).then(() => {
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

export default Administration;
