import React, { Fragment, useEffect, useState } from "react";
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import { toastError, toastSuccess } from "../../services/toasts";

import { createUser, deleteUser, editUser, getUsers } from "../../services/api/users";

import UserTable from "./Users/UserTable";
import UserForm from "./Users/UserForm";

function Users() {
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        let users = await getUsers();
        setUsers(users);
    };

    const addUser = async (user) => {
        createUser(user.firstname, user.lastname, user.role)
            .then(() => {
                toastSuccess("User successfully created");
                redirectToTable();
            })
            .catch((error) => {
                toastError(error.message);
            });
    };
    const removeUser = async (userId) => {
        deleteUser(userId).then(() => {
            toastSuccess("User successfully deleted");
            fetchUsers();
        });
    };

    const modifyUser = async (user, userId) => {
        editUser(userId, user.firstname, user.lastname, user.role).then(() => {
            toastSuccess("Successfully edited");
            redirectToTable();
        });
    };

    const redirectToTable = () => {
        fetchUsers();
        navigate("/users");
    };

    return (
        <Fragment>
            <Routes>
                <Route
                    path=""
                    element={
                        <Fragment>
                            <h1>Users</h1>
                            <div className="mb-3">
                                <Link to="/users/create">
                                    <Button variant="success">Create User</Button>
                                </Link>
                            </div>
                            <UserTable users={users} removeUser={removeUser} />
                        </Fragment>
                    }
                />
                <Route
                    path="/:id"
                    element={<UserForm title="Edit user" handleSubmitUser={modifyUser} />}
                />
                <Route
                    path="/create"
                    element={<UserForm title="Create user" handleSubmitUser={addUser} />}
                />
            </Routes>
        </Fragment>
    );
}

export default Users;
