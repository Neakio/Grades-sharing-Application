import React, { Fragment, useRef, useState } from "react";

import { Container } from "react-bootstrap";
import { Route, Routes, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/index.css";
import "react-toastify/dist/ReactToastify.css";

import Header from "./components/headers/Header";
import Footer from "./components/headers/Footer";
import Home from "./components/pages/Home";
import Classes from "./components/pages/ClassesRoot";
import Grades from "./components/pages/GradesRoot";
import UsersRoot from "./components/pages/UsersRoot";
import Modules from "./components/pages/ModulesRoot";
import Courses from "./components/pages/CoursesRoot";

function App() {
    const navigate = useNavigate();
    const appRef = useRef();
    //Verify if the user is log or not
    const [isLoggedIn, setIsLoggedIn] = useState(true);
    const [darkmode, setDarkmode] = useState(false);
    // Retrieve the role of the user
    let userRole = "Administrator Referent";

    const logIn = () => {
        if (isLoggedIn) navigate("/");
        setIsLoggedIn(!isLoggedIn);
    };

    const onSetDarkMode = () => {
        appRef.current.classList.toggle("dark");
        setDarkmode(!darkmode);
    };

    return (
        <Fragment>
            <div ref={appRef} className="app">
                <ToastContainer theme={darkmode ? "dark" : "light"} />
                <header>
                    <Header
                        darkmode={darkmode}
                        setDarkmode={onSetDarkMode}
                        isLoggedIn={isLoggedIn}
                        logIn={logIn}
                        userRole={userRole}
                    />
                </header>

                <main>
                    <Container>
                        <Routes>
                            <Route path="/" element={<Home isLoggedIn={isLoggedIn} />} />
                            <Route path="classes/*" element={<Classes userRole={userRole} />} />
                            <Route path="users/*" element={<UsersRoot />} />
                            <Route path="modules/*" element={<Modules />} />
                            <Route path="courses/*" element={<Courses />} />
                            <Route path="grades/*" element={<Grades userRole={userRole} />} />
                        </Routes>
                    </Container>
                </main>
                <footer>
                    <Footer />
                </footer>
            </div>
        </Fragment>
    );
}

export default App;
