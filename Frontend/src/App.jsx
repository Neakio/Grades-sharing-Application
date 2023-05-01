import React, { useState } from "react";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import "./assets/styles.css";
import "react-toastify/dist/ReactToastify.css";

import Header from "./components/Header";
import Home from "./components/pages/Home";
import Classes from "./components/pages/Classes";
import Grades from "./components/pages/Grades";
import UsersRoot from "./components/pages/UsersRoot";

function App() {
  //Verify if the user is log or not
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [darkmode, setDarkmode] = useState(false);

  return (
    <BrowserRouter>
      <div className={"app " + (darkmode ? "" : "dark")}>
        <ToastContainer theme={darkmode ? "light" : "dark"} />
        <Header
          darkmode={darkmode}
          setDarkmode={setDarkmode}
          isLoggedIn={isLoggedIn}
          logIn={() => setIsLoggedIn(!isLoggedIn)}
        />
        <main>
          <Routes>
            <Route path="/" element={<Home isLoggedIn={isLoggedIn} />} />
            <Route path="classes/*" element={<Classes />} />
            <Route path="grades/*" element={<Grades />} />
            <Route path="users/*" element={<UsersRoot />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );

  /*

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
*/
}

export default App;
