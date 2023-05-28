import React, { Fragment, useState } from "react";

import light from "/airnote_light.png";
import dark from "/airnote_dark.png";

import Menu from "./Menu";
import { Button } from "react-bootstrap";
import UserInfo from "../render-components/Form/Info";

function Header({ setDarkmode, darkmode, isLoggedIn, userRole }) {
    const [showMenu, setShowMenu] = useState(false);
    return (
        <Fragment>
            <div className="d-flex justify-content-between header">
                <div className="menu">
                    <div
                        className="logo"
                        onMouseOver={() => setShowMenu(true)}
                        onMouseOut={() => setShowMenu(false)}
                    >
                        <Menu
                            darkmode={darkmode}
                            setDarkmode={setDarkmode}
                            isLoggedIn={isLoggedIn}
                            userRole={userRole}
                        />
                        {darkmode ? (
                            <img src={dark} width="150" height="50" alt="Airnote" />
                        ) : (
                            <img src={light} width="150" height="50" alt="Airnote" />
                        )}
                    </div>

                    {/*  */}
                </div>
                {/* Show the user role only if already connected */}
                <p>{isLoggedIn ? userRole : null}</p>

                <div>
                    {/* Show the button of login/logout depending on the user status */}
                    {isLoggedIn ? (
                        <Button variant="dark" onClick={<UserInfo logout={true} />}>
                            Logout
                        </Button>
                    ) : (
                        <Button variant="dark" onClick={(window.location.href = "/login")}>
                            Login
                        </Button>
                    )}
                </div>
            </div>
        </Fragment>
    );
}

export default Header;
