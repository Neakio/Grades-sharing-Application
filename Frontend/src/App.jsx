import React, { useState } from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import { Button } from "react-bootstrap";

function App() {
  const [darkmode, setDarkmode] = useState(false);

  return (
    <>
      <div className={"app " + (darkmode ? "" : "dark")}>
        <Button
          onClick={() => {
            console.log(darkmode);
            setDarkmode((prev) => !darkmode);
          }}
        >
          Darkmode {darkmode ? "on" : "off"}
        </Button>
      </div>
    </>
  );
}

export default App;
