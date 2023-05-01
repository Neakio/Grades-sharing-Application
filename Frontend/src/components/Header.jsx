import React, { useState } from "react";

import { Button } from "react-bootstrap";

import { ReactComponent as Light } from "../assets/images/light.svg";
import { ReactComponent as Dark } from "../assets/images/dark.svg";

import Menu from "./Menu";

function Header({ isLoggedIn, logIn, darkmode, setDarkmode }) {
  // Retrieve the role of the user
  let userRole = "Admin";

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
            <img src="./airnote.png" width="50" height="50" alt="Airnote" />
          </div>

          {/*  */}
          <Menu isOpen={showMenu} isLoggedIn={isLoggedIn} userRole={userRole} />
        </div>
        {/* Show the user role only if already connected */}
        <p>{isLoggedIn ? userRole : null}</p>
        <div>
          <Button
            variant="light"
            onClick={() => {
              console.log(darkmode);
              setDarkmode(!darkmode);
            }}
          >
            {darkmode ? <Light /> : <Dark />}
          </Button>
          {/* Show the button of login/logout depending on the user status */}
          <button onClick={logIn}>{isLoggedIn ? "Logout" : "Login"}</button>
        </div>
      </div>
    </header>
  );
}

export default Header;
