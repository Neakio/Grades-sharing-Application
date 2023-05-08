import React from "react";
import { Button, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

function Menu({ userRole, isLoggedIn }) {
    const isAdmin = userRole.startsWith("Administrator");
    const isTeacher = userRole === "Teacher";
    const isReferent = userRole.endsWith("Referent");

    return (
        <Container>
            {isLoggedIn ? (
                <nav className="navbar">
                    <Row>
                        <Link to="/">
                            <Button>Home</Button>
                        </Link>
                    </Row>
                    {isAdmin ? (
                        <Row>
                            <Link to="/users">
                                <Button>Users</Button>
                            </Link>
                        </Row>
                    ) : null}
                    {isAdmin || isTeacher ? (
                        <Row>
                            <Link to="/classes">
                                <Button>Classes</Button>
                            </Link>
                        </Row>
                    ) : null}
                    {isAdmin ? (
                        <Row>
                            <Link to="/modules">
                                <Button>Modules</Button>
                            </Link>
                        </Row>
                    ) : null}
                    {isAdmin ? (
                        <Row>
                            <Link to="/courses">
                                <Button>Courses</Button>
                            </Link>
                        </Row>
                    ) : null}
                    {!isAdmin || isReferent ? (
                        <Row>
                            <Link to="/grades">
                                <Button>Grades</Button>
                            </Link>
                        </Row>
                    ) : null}
                </nav>
            ) : null}
        </Container>
    );
}

export default Menu;
