import React, { Fragment, useEffect, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import Select from "react-select";
import { useParams } from "react-router-dom";

import { getClass } from "../../../services/api/classes";
import { getUsersByRole } from "../../../services/api/users";

import { Util } from "../../../services/Util";
import { FormCheck, FormControl, FormSelect } from "../../render-components/Form";
import Loader from "../../render-components/Loader";

function ClassForm({ title, handleSubmitClass }) {
    const { id } = useParams();
    const [formValidated, setFormValidated] = useState(false);
    const [groupData, setGroupData] = useState({
        level: null,
        name: null,
        year: null,
        isActive: true,
        referent: null,
        delegates: [],
        students: [],
    });

    const [referentsOptions, setReferentsOptions] = useState(null);
    const [studentsOptions, setStudentsOptions] = useState(null);

    useEffect(() => {
        if (id) fetchClass();
        fetchReferents();
        fetchStudents();
    }, [id]);

    const fetchClass = async () => {
        let group = await getClass(id);
        group.referent = group.referent?.id;
        group.delegates = group.delegates.map(({ id }) => id);
        group.students = group.students.map(({ id }) => id);
        setGroupData(group);
    };

    const fetchReferents = async () => {
        let users = await getUsersByRole("AR");
        setReferentsOptions(users.map((user) => makeUserOption(user)));
    };

    const fetchStudents = async () => {
        let users = await getUsersByRole("ST");
        setStudentsOptions(users.map((user) => makeUserOption(user)));
    };

    const makeUserOption = (user) => {
        return {
            label: Util.formatUserName(user),
            value: user.id,
        };
    };

    const handleChange = (event) => {
        let name = event.target.name;
        let value = event.target.value;
        setGroupData({ ...groupData, [name]: value });
    };

    const handleSelect = (options, name) => {
        setGroupData({
            ...groupData,
            [name]: options,
        });
    };

    const onSubmit = (event) => {
        event.preventDefault();
        if (event.target.checkValidity()) {
            handleSubmitClass(groupData, id);
        }
        setFormValidated(true);
    };

    if (!referentsOptions || !studentsOptions) return <Loader />;
    return (
        <Fragment>
            <h1 className="text-center">{title}</h1>
            <Form onSubmit={onSubmit} validated={formValidated} noValidate>
                <FormSelect
                    label="Class"
                    name="level"
                    placeholder="Select a class..."
                    options={Util.getClassOptions()}
                    value={groupData.level}
                    onChange={(value) => setGroupData({ ...groupData, level: value })}
                    required
                />
                <FormControl
                    label="Name"
                    name="name"
                    placeholder="Concorde..."
                    value={groupData.name}
                    onChange={handleChange}
                    required
                />
                <FormControl
                    label="Year"
                    name="year"
                    placeholder="2022/2023..."
                    value={groupData.year}
                    onChange={handleChange}
                    required
                />
                <FormCheck
                    label="Active"
                    checked={groupData.isActive}
                    onChange={(checked) =>
                        setGroupData({
                            ...groupData,
                            isActive: checked,
                        })
                    }
                />
                <FormSelect
                    label="Referent"
                    name="referent"
                    placeholder="Select a referent..."
                    options={referentsOptions}
                    value={groupData.referent}
                    onChange={(value) => setGroupData({ ...groupData, referent: value })}
                    isClearable
                />
                <FormSelect
                    label="Delegates"
                    name="delegates"
                    placeholder="Select delegates..."
                    options={groupData.students.map((student) =>
                        studentsOptions.find(({ value }) => student == value),
                    )}
                    value={groupData.delegates}
                    onChange={(value) => setGroupData({ ...groupData, delegates: value })}
                    isClearable
                    isMulti
                />
                <FormSelect
                    label="Students"
                    name="students"
                    placeholder="Select students..."
                    options={studentsOptions}
                    value={groupData.students}
                    onChange={(value) => setGroupData({ ...groupData, students: value })}
                    isClearable
                    isMulti
                />
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
            <pre>{JSON.stringify(groupData, null, 2)}</pre>
        </Fragment>
    );
}

export default ClassForm;
