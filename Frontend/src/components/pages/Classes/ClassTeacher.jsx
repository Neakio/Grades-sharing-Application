import React from "react";
import { Link, Route, Routes } from "react-router-dom";
import { Button, Container } from "react-bootstrap";

import ClassView from "./ClassView";

function Teacher(props) {
    return (
        <Container>
            <Routes>
                <Route
                    path=""
                    element={
                        <>
                            <h1>Groups</h1>

                            <div className="d-flex flex-column justify-content-around ">
                                
                                {props.groups.map((group) => {
                                    if (group.isActive) {
                                        return (
                                            <Link to={`/classes/${group.id}`} key={group.id}>
                                                <Button
                                                    type="button"
                                                    class="btn btn-outline-dark btn-block"
                                                >
                                                    {group.level} ({group.year})
                                                </Button>
                                            </Link>
                                        );
                                    } else {
                                        return null;
                                    }
                                })}
                            </div>
                        </>
                    }
                />
                <Route path="/:id" element={<ClassView />} />
            </Routes>
        </Container>
    );
}

export default Teacher;
