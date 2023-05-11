import React, { useEffect, useState } from "react";

import { Button, Container, Form } from "react-bootstrap";
import Select from "react-select";
import GLOBALS from "../../../Globals";
import { useParams } from "react-router-dom";
import { getClasses, getUser } from "../../../services/api";
import { Util } from "../../../services/Util";

function UserForm({ title, handleSubmitUser }) {
    const { id } = useParams();

    const [userData, setUserData] = useState({
        firstname: null,
        lastname: null,
        role: null,
        isDelegate: false,
        group: null,
    });
    const [classesOptions, setClassesOptions] = useState([]);

    useEffect(() => {
        if (id) fetchUser();
        fetchClasses();
    }, [id]);

    const fetchUser = async () => {
        let user = await getUser(id);
        user.group = user.group?.id;
        setUserData(user);
    };

    const fetchClasses = async () => {
        let groups = await getClasses();
        setClassesOptions(getClassOptions(groups));
    };

    const getClassOptions = (classes) => {
        return classes.map((aClass) => ({
            label: Util.groupToStr(aClass),
            value: aClass.id,
        }));
    };

    const handleChange = (event) => {
        let name = event.target.name;
        let value = event.target.value;
        setUserData({ ...userData, [name]: value });
    };

    const onSubmit = (event) => {
        event.preventDefault();
        handleSubmitUser(userData, id);
    };

    return (
        <Container>
            <h1 className="text-center">{title}</h1>
            <Form onSubmit={onSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>First name</Form.Label>
                    <Form.Control
                        name="firstname"
                        placeholder="John"
                        defaultValue={userData.firstname}
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Last name</Form.Label>
                    <Form.Control
                        name="lastname"
                        placeholder="Smith"
                        defaultValue={userData.lastname}
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Role</Form.Label>
                    <Select
                        placeholder="Select a role..."
                        options={Util.getRoleOptions()}
                        value={Util.getRoleOptions().find(
                            (option) => option.value == userData.role,
                        )}
                        onChange={(newValue) => setUserData({ ...userData, role: newValue.value })}
                    />
                </Form.Group>
                {GLOBALS.USER_ROLES[userData.role] === GLOBALS.USER_ROLES.ST ? (
                    <Form.Group className="mb-3">
                        <Form.Check
                            type="checkbox"
                            label="Delegate"
                            checked={userData.isDelegate}
                            onChange={(event) =>
                                setUserData({
                                    ...userData,
                                    isDelegate: event.target.checked,
                                })
                            }
                        />
                    </Form.Group>
                ) : null}
                {GLOBALS.USER_ROLES[userData.role] === GLOBALS.USER_ROLES.ST ? (
                    <Form.Group className="mb-3">
                        <Form.Label>Class</Form.Label>
                        <Select
                            placeholder="Select a class..."
                            options={classesOptions}
                            value={classesOptions.find((group) => group.value == userData.group)}
                            onChange={(newValue) =>
                                setUserData({ ...userData, group: newValue.value })
                            }
                        />
                    </Form.Group>
                ) : null}
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
            {JSON.stringify(userData)}
        </Container>
    );
}

export default UserForm;
