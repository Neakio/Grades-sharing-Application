import React, { useEffect, useState } from "react";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import "./assets/styles.css";
import "react-toastify/dist/ReactToastify.css";

import Header from "./components/Header";
import Home from "./components/pages/Home";
import Classes from "./components/pages/ClassesRoot";
import Grades from "./components/pages/GradesRoot";
import UsersRoot from "./components/pages/UsersRoot";
import Modules from "./components/pages/ModulesRoot";
import Courses from "./components/pages/CoursesRoot";

function App() {
    //Verify if the user is log or not
    const [isLoggedIn, setIsLoggedIn] = useState(true);
    const [darkmode, setDarkmode] = useState(false);
    // Retrieve the role of the user
    let userRole = "Administrator Referent";

    return (
        <BrowserRouter>
            <div className={"app " + (darkmode ? "dark" : "")}>
                <ToastContainer theme={darkmode ? "dark" : "light"} />
                <Header
                    darkmode={darkmode}
                    setDarkmode={setDarkmode}
                    isLoggedIn={isLoggedIn}
                    logIn={() => setIsLoggedIn(!isLoggedIn)}
                    userRole={userRole}
                />
                <main>
                    <Routes>
                        <Route path="/" element={<Home isLoggedIn={isLoggedIn} />} />
                        <Route path="classes/*" element={<Classes userRole={userRole} />} />
                        <Route path="users/*" element={<UsersRoot />} />
                        <Route path="modules/*" element={<Modules />} />
                        <Route path="courses/*" element={<Courses />} />
                        <Route path="grades/*" element={<Grades />} />
                    </Routes>
                </main>
            </div>
        </BrowserRouter>
    );
}

export default App;
