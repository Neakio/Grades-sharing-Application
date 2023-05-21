import React, { useState, useRef, Fragment } from "react";

import Darkmode from "./Darkmode";

// const MenuButton = ({ handleMouseDown }) => {
//     return <button id="rContaineroundButton" onMouseDown={handleMouseDown}></button>;
// };

const Menu = ({ darkmode, setDarkmode, userRole, isLoggedIn }) => {
    const [visible, setVisible] = useState(false);
    const menuRef = useRef(null);
    const toggleMenu = () => {
        setVisible(!visible);
    };

    const handleMouseDown = () => {
        toggleMenu();
        menuRef.current.classList.toggle("change");
    };

    const isAdmin = userRole.startsWith("Admin");
    const isTeacher = userRole === "Teacher";
    const isReferent = userRole === "Administrator Referent";

    return (
        <Fragment>
            {isLoggedIn ? (
                <Fragment>
                    <div
                        ref={menuRef}
                        className="menu-container"
                        //id="rContaineroundButton"
                        onMouseDown={handleMouseDown}
                    >
                        <div className="bar1"></div>
                        <div className="bar2"></div>
                        <div className="bar3"></div>
                    </div>
                    <div
                        id="flyoutMenu"
                        onMouseLeave={handleMouseDown}
                        className={visible ? "show" : "hide"}
                    >
                        <h2>
                            <a href="/">Home</a>
                        </h2>

                        {isAdmin && (
                            <h2>
                                <a href="/users">Users</a>
                            </h2>
                        )}
                        {(isAdmin || isTeacher) && (
                            <h2>
                                <a href="/classes">Classes</a>
                            </h2>
                        )}
                        {isAdmin && (
                            <h2>
                                <a href="/modules">Modules</a>
                            </h2>
                        )}
                        {isAdmin && (
                            <h2>
                                <a href="/courses">Courses</a>
                            </h2>
                        )}
                        {(!isAdmin || isReferent) && (
                            <h2>
                                <a href="/grades">Grades</a>
                            </h2>
                        )}
                        <div className="additionalComponent">
                            <Darkmode darkmode={darkmode} setDarkmode={setDarkmode} />
                        </div>
                    </div>
                </Fragment>
            ) : null}
        </Fragment>
    );
};

export default Menu;