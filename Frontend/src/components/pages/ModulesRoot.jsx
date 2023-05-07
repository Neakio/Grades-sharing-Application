import React, { useState, useEffect } from "react";
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import { Button, Container } from "react-bootstrap";
import { toastError, toastSuccess } from "../../services/toasts";


import ModuleTable from "./Modules/ModuleTable";
import { createModule, deleteModule, editModule, getModules } from "../../services/api";


function Modules (){

    const [modules, setModules] = useState([]);


    const redirectToTable = () => {
        fetchModules();
        navigate("/modules");
      };

      useEffect(() => {
        fetchModules();
      }, []);

      const fetchModules = async () => {
        let modules = await getModules();
        setModules(modules);
      };
      const removeModule = async (groupId) => {
        deleteModule(groupId).then(() => {
          toastSuccess("Module successfully deleted");
          fetchModules();
        });
      };
      const addModules = async (module) => {
        createModule(module.title, module.courses, module.classes)
          .then(() => {
            toastSuccess("Module successfully created");
            redirectToTable();
          })
          .catch((error) => {
            console.log(error);
            toastError(error.message);
          });
      };
    
      const modifyModules = async (module, moduleId) => {
        editModule(moduleId, module.title, module.courses, module.classes).then(() => {
          toastSuccess("Successfully edited");
          redirectToTable();
        });


    return (
        <Container>
          <Routes>
            <Route
              path=""
              element={
                <>
                  <div className="text-center mb-3">
                    <Link to="/modules/create">
                      <Button variant="success">Create module</Button>
                    </Link>
                  </div>
                  <ModuleTable
                    modules={modules}
                    removeModule={removeModule}
                  />
                </>
              }
            />
    
            <Route
              path="/:id"
              element={<ModuleForm title="Edit module" handleSubmitClass={modifyModules} />}
            />
            <Route
              path="/create"
              element={<ModuleForm title="Create module" handleSubmitClass={addModules} />}
            />
          </Routes>
        </Container>
      );
}
}