import React, { useEffect, useState } from "react";

import { Button, Container, Form } from "react-bootstrap";
import Select from "react-select";
import { useParams } from "react-router-dom";
import { Class } from "../../../services/Util";
import { getUsers } from "../../../services/api";

function ClassForm({ title, handleSubmitClass }) {
    const { id } = useParams();

    const [groupData, setGroupData] = useState({
        title: null,
        year: null,
        isActive: true,
        referent: null,
    });


    const [users, setUsers] = useState([]);

    useEffect(() => {
        if (id) fetchClass();
        fetchUser();
    }, [id]);


    const fetchClass = async () => {
        let group = await getClass(id);
        setClassData(group);
    };

    const fetchUser = async () => {
        let users = await getUsers();
        setUsers(users);
    };

    const getUserOptions = (user) => {
        return user.map((aUser) => ({
            label: aUser.name,
            value: aUser.id,
            role: aUser.role,
        }));
    };

    const handleChange = (event) => {
        let year = event.target.name;
        let value = event.target.value;
        setClassData({ ...classData, [year]: value });
    };

    const onSubmit = (event) => {
        event.preventDefault();
        handleSubmitClass(userData, id);
    };

    console.log(Class.getGroupOptions().find((option) => option.value == classData.title));
    return (
        <Container>
            <h1 className="text-center">{title}</h1>
            <Form onSubmit={onSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>Class</Form.Label>
                    <Select
                        placeholder="Select a class..."
                        options={Class.getClassOptions()}
                        value={Class.getClassOptions().find(
                            (option) => option.value == groupData.title,
                        )}
                        onChange={(newValue) => setGroupData({ ...groupData, title: newValue.value })}
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Year</Form.Label>
                    <Form.Control
                        name="year"
                        placeholder="2022/2023"
                        defaultValue={groupData.year}
                        onChange={handleChange}
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Check
                        type="checkbox"
                        label="Active"
                        checked={groupData.isActive}
                        onChange={(event) =>
                            setGroupData({
                                ...groupData,
                                isActive: event.target.checked,
                            })
                        }
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Referent</Form.Label>
                    <Select
                        placeholder="Select a referent..."
                        options={GLOBALS.USER_ROLES[users.role] === GLOBALS.USER_ROLES.AR ? (getUserOptions(users)):null}
                        value={{
                            label: groupData.referent,
                            value: groupData.referent,
                        }}
                        onChange={(newValue) => setGroupData({ ...groupData, referent: newValue.value })}
                    />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
            {JSON.stringify(groupData)}
        </Container>
    );
}

export default ClassForm;
