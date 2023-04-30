import React, { useState } from "react";
import Menu from "./Menu";
import { Button } from "react-bootstrap";

function Header({ isLoggedIn, logIn, darkmode, setDarkmode }) {
  // Retrieve the role of the user
  let userRole = "Admin";

  const [showMenu, setShowMenu] = useState(false);

  return (
    <header>
      <div className="d-flex justify-content-between header">
        <div
          className="menu"
          
        >
          <div className="logo"
          onMouseOver={() => setShowMenu(true)}
          onMouseOut={() => setShowMenu(false)}>
            <img src="airnote.png" width="50" height="50" alt="Airnote" />
          </div>

          {/*  */}
          <Menu isOpen={showMenu} isLoggedIn={isLoggedIn} userRole={userRole} />
        </div>
        {/* Show the user role only if already connected */}
        <p>{isLoggedIn ? userRole : null}</p>
        <div>
          <Button
            onClick={() => {
              console.log(darkmode);
              setDarkmode((prev) => !darkmode);
            }}
          >
                        Darkmode {darkmode ? "on" : "off"}
          </Button>
          {/* Show the button of login/logout depending on the user status */}
          <button onClick={logIn}>{isLoggedIn ? "Logout" : "Login"}</button>
        </div>
      </div>
    </header>
  );
}

export default Header;
