import React, { useState } from "react";

import logo from "../../public/airnote.png";

import Menu from "./Menu";
import Darkmode from "./Darkmode";

function Header({ isLoggedIn, logIn, darkmode, setDarkmode, userRole }) {
    const [showMenu, setShowMenu] = useState(false);

    return (
        <header>
            <div className="d-flex justify-content-between header">
                <div className="menu">
                    <div
                        className="logo"
                        onMouseOver={() => setShowMenu(true)}
                        onMouseOut={() => setShowMenu(false)}
                    >
                        <img src={logo} width="50" height="50" alt="Airnote" />
                    </div>

                    {/*  */}
                    <Menu isOpen={showMenu} isLoggedIn={isLoggedIn} userRole={userRole} />
                </div>
                {/* Show the user role only if already connected */}
                <p>{isLoggedIn ? userRole : null}</p>
                <Darkmode darkmode={darkmode} setDarkmode={setDarkmode} />

                <div>
                    {/* Show the button of login/logout depending on the user status */}

                    <button onClick={logIn}>{isLoggedIn ? "Logout" : "Login"}</button>
                </div>
            </div>
        </header>
    );
}

export default Header;
