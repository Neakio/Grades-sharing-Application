import React from "react";

import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

function Classes() {
  return (
    <div className='d-flex flex-column justify-content-around'>
      <Link to="/classes/M2">
        <Button type="button" class="btn btn-outline-dark btn-block">
                    M2
        </Button>
      </Link>
      <Link to="/classes/M1">
        <Button type="button" class="btn btn-outline-dark btn-block">
                    M1
        </Button>
      </Link>
      <Link to="/classes/L3">
        <Button type="button" class="btn btn-outline-dark btn-block">
                    L3
        </Button>
      </Link>
    </div>
  );
}

function M2() {
  return null;
}

function M1() {
  return null;
}

function L3() {
  return null;
}

export default Classes;
