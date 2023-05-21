import React, { useState, useEffect, Fragment } from "react";
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import { toastError, toastSuccess } from "../../services/toasts";

import { createModule, deleteModule, editModule, getModules } from "../../services/api";

import ModuleTable from "./Modules/ModuleTable";
import ModuleForm from "./Modules/ModuleForm";

function Modules() {
    const navigate = useNavigate();
    const [modules, setModules] = useState([]);

    useEffect(() => {
        fetchModules();
    }, []);

    const fetchModules = async () => {
        let modules = await getModules();
        setModules(modules);
    };

    const addModules = async (module) => {
        createModule(module.title, module.groups, module.courses)
            .then(() => {
                toastSuccess("Module successfully created");
                redirectToTable();
            })
            .catch((error) => {
                toastError(error.message);
            });
    };

    const removeModule = async (courseId) => {
        deleteModule(courseId).then(() => {
            toastSuccess("Module successfully deleted");
            fetchModules();
        });
    };

    const modifyModules = async (module, moduleId) => {
        editModule(moduleId, module.title, module.groups, module.courses).then(() => {
            toastSuccess("Successfully edited");
            redirectToTable();
        });
    };

    const redirectToTable = () => {
        fetchModules();
        navigate("/modules");
    };

    return (
        <Fragment>
            <Routes>
                <Route
                    path=""
                    element={
                        <Fragment>
                            <h1>Modules</h1>
                            <div className="mb-3">
                                <Link to="/modules/create">
                                    <Button variant="success">Create module</Button>
                                </Link>
                            </div>
                            <ModuleTable modules={modules} removeModule={removeModule} />
                        </Fragment>
                    }
                />

                <Route
                    path="/:id"
                    element={<ModuleForm title="Edit module" handleSubmitModule={modifyModules} />}
                />
                <Route
                    path="/create"
                    element={<ModuleForm title="Create module" handleSubmitModule={addModules} />}
                />
            </Routes>
        </Fragment>
    );
}

export default Modules;
