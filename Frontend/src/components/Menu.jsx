
import React, { useState } from "react";
import { Button, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";


const MenuButton = ({ handleMouseDown }) => {
    return (
        <button id="roundButton" onMouseDown={handleMouseDown}></button>
    );
};

const Menu = ({ userRole, isLoggedIn }) => {
    const [visible, setVisible] = useState(false);

    const toggleMenu = () => {
        setVisible(!visible);
    };

    const handleMouseDown = () => {
        toggleMenu();
    };

    const isAdmin = userRole.startsWith("Admin");
    const isTeacher = userRole === "Teacher";

    return (
        <Container>
            {isLoggedIn ? (
                <>
                    <MenuButton handleMouseDown={handleMouseDown} />
                    <div
                        id="flyoutMenu"
                        onMouseDown={handleMouseDown}
                        className={visible ? "show" : "hide"}
                    >
                        <nav >
                            <Row>
                                <Link to="/">
                                    <Button>Home</Button>
                                </Link>
                            </Row>
                            {isAdmin && (
                                <Row>
                                    <Link to="/users">
                                        <Button>Users</Button>
                                    </Link>
                                </Row>
                            )}
                            {isAdmin && (
                                <Row>
                                    <Link to="/modules">
                                        <Button>Modules</Button>
                                    </Link>
                                </Row>
                            )}
                            {isAdmin && (
                                <Row>
                                    <Link to="/courses">
                                        <Button>Courses</Button>
                                    </Link>
                                </Row>
                            )}
                            {(isAdmin || isTeacher) && (
                                <Row>
                                    <Link to="/classes">
                                        <Button>Classes</Button>
                                    </Link>
                                </Row>
                            )}
                            {!isAdmin && (
                                <Row>
                                    <Link to="/grades">
                                        <Button>Grades</Button>
                                    </Link>
                                </Row>
                            )}
                        </nav>
                    </div>
                </>
            ) : null}
        </Container>
    );
};

const MenuContainer = () => {
    // Define your userRole and isLoggedIn state here
    const userRole = "Admin";
    const isLoggedIn = true;

    return (
        <>
            <Menu userRole={userRole} isLoggedIn={isLoggedIn} />
        </>
    );
};

export default MenuContainer;