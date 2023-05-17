
import React, { useState } from "react";
import { Container } from "react-bootstrap";
import Darkmode from "./Darkmode";


const MenuButton = ({ handleMouseDown }) => {
    return (
        <button id="roundButton" onMouseDown={handleMouseDown}></button>
    );
};

const Menu = ({ darkmode, setDarkmode, userRole, isLoggedIn }) => {
    const [visible, setVisible] = useState(false);

    const toggleMenu = () => {
        setVisible(!visible);
    };

    const handleMouseDown = () => {
        toggleMenu();
    };

    const isAdmin = userRole.startsWith("Admin");
    const isTeacher = userRole === "Teacher";
    const isReferent = userRole === "Administrator Referent";



    return (
        <Container>
            {isLoggedIn ? (
                <>
                    <MenuButton handleMouseDown={handleMouseDown} />
                    <div
                        id="flyoutMenu"
                        onMouseLeave={handleMouseDown}
                        className={visible ? "show" : "hide"}
                    >
                        <h2><a href="/">Home</a></h2>

                        {isAdmin && (

                            <h2><a href="/users">Users</a></h2>

                        )}
                        {(isAdmin || isTeacher) && (

                            <h2><a href="/classes">Classes</a></h2>

                        )}
                        {isAdmin && (

                            <h2><a href="/modules">Modules</a></h2>

                        )}
                        {isAdmin && (
                            <h2><a href="/courses">Courses</a></h2>

                        )}
                        {(!isAdmin || isReferent) && (

                            <h2><a href="/grades">Grades</a></h2>

                        )}
                        <div className="additionalComponent">
                            <Darkmode darkmode={darkmode} setDarkmode={setDarkmode} />
                        </div>
                    </div>

                </>
            ) : null}

        </Container>
    );
};

export default Menu;