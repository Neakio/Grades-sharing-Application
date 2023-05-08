import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";

import { getClasses } from "../../services/api";

import Administration from "./Classes/ClassAdmin";
import Teacher from "./Classes/ClassTeacher";

function Classes({ userRole }) {
    const [groups, setGroups] = useState([]);
    const isAdmin = userRole.startsWith("Admin");

    useEffect(() => {
        fetchGroups();
    }, []);

    const fetchGroups = async () => {
        let groups = await getClasses();
        setGroups(groups);
    };
    return (
        <Container>
            {isAdmin ? (
                <Administration groups={groups} fetchGroups={fetchGroups} />
            ) : (
                <Teacher groups={groups} />
            )}
        </Container>
    );
}

export default Classes;
