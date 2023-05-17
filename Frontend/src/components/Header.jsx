import React, { useState } from "react";

import light from "../../public/airnote_light.png";
import dark from "../../public/airnote_dark.png";


import Darkmode from "./Darkmode";

function Header({ darkmode, isLoggedIn, logIn, userRole }) {
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
                        {darkmode ? <img src={dark} width="150" height="50" alt="Airnote" /> : <img src={light} width="150" height="50" alt="Airnote" />}
                        
                    </div>

                    {/*  */}
                </div>
                {/* Show the user role only if already connected */}
                <p>{isLoggedIn ? userRole : null}</p>

                <div>
                    {/* Show the button of login/logout depending on the user status */}

                    <button onClick={logIn}>{isLoggedIn ? "Logout" : "Login"}</button>
                </div>
            </div>
        </header>
    );
}

export default Header;
