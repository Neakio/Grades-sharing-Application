import React, { Fragment, useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useParams } from "react-router-dom";

import { getClass } from "../../../services/api/classes";

import { Util } from "../../../services/Util";
import { FormCheck, FormControl, FormSelect } from "../../render-components/Form";

function ClassForm({ title, handleSubmitClass }) {
    const { id } = useParams();
    const [formValidated, setFormValidated] = useState(false);
    const [groupData, setGroupData] = useState({
        level: null,
        name: null,
        year: null,
        isActive: true,
    });

    useEffect(() => {
        if (id) fetchClass();
    }, [id]);

    const fetchClass = async () => {
        let group = await getClass(id);
        group.referent = group.referent?.id;
        setGroupData(group);
    };

    const handleChange = (event) => {
        let name = event.target.name;
        let value = event.target.value;
        setGroupData({ ...groupData, [name]: value });
    };

    const onSubmit = (event) => {
        event.preventDefault();
        if (event.target.checkValidity()) {
            handleSubmitClass(groupData, id);
        }
        setFormValidated(true);
    };

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
                <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                <Button variant="btn btn-outline-success me-md-2" type="submit">
                    Submit
                </Button>
                </div>
            </Form>
            <pre>{JSON.stringify(groupData, null, 2)}</pre>
        </Fragment>
    );
}

export default ClassForm;
