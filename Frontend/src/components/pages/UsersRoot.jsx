import React, { useEffect, useState } from "react";

import { createUser, deleteUser, editUser, getUsers } from "../../services/api/users";

import UserTable from "./Users/UserTable";
import UserForm from "./Users/UserForm";

import { Link, Route, Routes, useNavigate } from "react-router-dom";
import { Button, Container } from "react-bootstrap";
import { toastError, toastSuccess } from "../../services/toasts";

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

    const removeUser = async (userId) => {
        deleteUser(userId).then(() => {
            toastSuccess("User successfully deleted");
            fetchUsers();
        });
    };

    const redirectToTable = () => {
        fetchUsers();
        navigate("/users");
    };

    const addUser = async (user) => {
        createUser(user.firstname, user.lastname, user.group, user.isDelegate, user.role)
            .then(() => {
                toastSuccess("User successfully created");
                redirectToTable();
            })
            .catch((error) => {
                toastError(error.message);
            });
    };

    const modifyUser = async (user, userId) => {
        editUser(
            userId,
            user.firstname,
            user.lastname,
            user.group,
            user.isDelegate,
            user.role,
        ).then(() => {
            toastSuccess("Successfully edited");
            redirectToTable();
        });
    };

    return (
        <Container>
            <Routes>
                <Route
                    path=""
                    element={
                        <>
                            <div className="text-center mb-3">
                                <Link to="/users/create">
                                    <Button variant="success">Create User</Button>
                                </Link>
                            </div>
                            <UserTable users={users} removeUser={removeUser} />
                        </>
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
        </Container>
    );
}

export default Users;