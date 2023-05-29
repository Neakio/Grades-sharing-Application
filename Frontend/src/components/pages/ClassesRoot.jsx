import React, { useState, useEffect, Fragment } from "react";

import { getClasses } from "../../services/api";

import Administration from "./Classes/ClassAdmin";
import Teacher from "./Classes/ClassTeacher";

function Classes({ userRole, userId, darkmode }) {
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
        <Fragment>
            {isAdmin ? (
                <Administration
                    groups={groups}
                    fetchGroups={fetchGroups}
                    isAdmin={isAdmin}
                    userId={userId}
                    darkmode={darkmode}
                />
            ) : (
                <Teacher groups={groups} userId={userId} darkmode={darkmode} />
            )}
        </Fragment>
    );
}

export default Classes;
