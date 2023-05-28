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
import LoginForm from "./components/render-components/Form/LogForm";
import UserInfo from "./components/render-components/Form/Info";

function App() {
    const appRef = useRef();
    //Verify if the user is log or not
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [darkmode, setDarkmode] = useState(false);
    // Retrieve the role of the user
    if (isLoggedIn == true) {
        const userinfo = <UserInfo />;
        console.log(userinfo);
    }
    const userRole = "";
    const userId = "";
    console.log(isLoggedIn);
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
                        userRole={userRole}
                    />
                </header>

                <main>
                    <Container className="h-100">
                        <Routes>
                            <Route path="/" element={<Home isLoggedIn={isLoggedIn} />} />
                            <Route
                                path="/login"
                                element={
                                    <LoginForm
                                        isLoggedIn={isLoggedIn}
                                        setIsLoggedIn={setIsLoggedIn}
                                    />
                                }
                            />
                            <Route
                                path="classes/*"
                                element={<Classes userRole={userRole} userId={userId} />}
                            />
                            <Route
                                path="users/*"
                                element={<UsersRoot userRole={userRole} userId={userId} />}
                            />
                            <Route
                                path="modules/*"
                                element={<Modules userRole={userRole} userId={userId} />}
                            />
                            <Route
                                path="courses/*"
                                element={<Courses userRole={userRole} userId={userId} />}
                            />
                            <Route
                                path="grades/*"
                                element={<Grades userId={userId} userRole={userRole} />}
                            />
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
