import React, { useEffect, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import Select from "react-select";
import { useParams } from "react-router-dom";

import { getClass } from "../../../services/api/classes";
import { getUsersByRole } from "../../../services/api/users";

import { Util } from "../../../services/Util";

function ClassForm({ title, handleSubmitClass }) {
    const { id } = useParams();

    const [groupData, setGroupData] = useState({
        level: null,
        name: null,
        year: null,
        isActive: false,
        referentId: null,
    });

    const [referentsOptions, setReferentsOptions] = useState([]);

    useEffect(() => {
        if (id) fetchClass();
        fetchReferents();
    }, [id]);

    const fetchClass = async () => {
        let group = await getClass(id);
        group.referentId = group.referent?.id;
        console.log(group)
        setGroupData(group);
    };

    const fetchReferents = async () => {
        let users = await getUsersByRole("AR");
        setReferentsOptions(users.map((aReferent) => makeReferentOption(aReferent)));
    };

    const makeReferentOption = (referent) => {
        return {
            label: referent.firstname + " " + referent.lastname,
            value: referent.id,
        };
    };

    const handleChange = (event) => {
        let name = event.target.name;
        let value = event.target.value;
        setGroupData({ ...groupData, [name]: value });
    };

    const onSubmit = (event) => {
        event.preventDefault();
        handleSubmitClass(groupData, id);
    };

    return (
        <Container>
            <h1 className="text-center">{title}</h1>
            <Form onSubmit={onSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>Class</Form.Label>
                    <Select
                        placeholder="Select a class..."
                        options={Util.getClassOptions()}
                        value={Util.getClassOptions().find(
                            (option) => option.value == groupData.level,
                        )}
                        onChange={(newValue) =>
                            setGroupData({ ...groupData, level: newValue.value })
                        }
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        name="name"
                        placeholder="Concorde..."
                        value={groupData.name}
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Year</Form.Label>
                    <Form.Control
                        name="year"
                        placeholder="2022/2023"
                        value={groupData.year}
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
                        options={referentsOptions}
                        value={referentsOptions.find((ref) => ref.value == groupData.referentId)}
                        onChange={(newValue) =>
                            setGroupData({ ...groupData, referentId: newValue.value })
                        }
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
