import React, { Fragment, useEffect, useState } from "react";

import { Button, Form } from "react-bootstrap";
import { useParams } from "react-router-dom";

import Loader from "../../render-components/Loader";
import { FormControl, FormSelect } from "../../render-components/Form";

import { getClasses, getCourses, getModules } from "../../../services/api";
import { Util } from "../../../services/Util";

function ModuleForm({ title, handleSubmitModule }) {
    const { id } = useParams();
    const [formValidated, setFormValidated] = useState(false);
    const [moduleData, setModuleData] = useState({
        title: null,
        groups: [],
        courses: [],
    });
    const [coursesOptions, setCoursesOptions] = useState(null);
    const [classesOptions, setClassesOptions] = useState(null);

    useEffect(() => {
        if (id) fetchModule();
        fetchClasses();
        fetchCourses();
    }, [id]);

    const fetchClasses = async () => {
        let groups = await getClasses();
        setClassesOptions(groups.map((group) => makeClassOption(group)));
    };

    const makeClassOption = (group) => {
        return {
            label: Util.groupToStr(group),
            value: group.id,
        };
    };

    const fetchCourses = async () => {
        let courses = await getCourses();
        setCoursesOptions(courses.map((course) => makeCourseOption(course)));
    };

    const makeCourseOption = (course) => {
        return {
            label: course.title,
            value: course.id,
        };
    };
    const fetchModule = async () => {
        let module = await getModules(id);
        module.groups = module.groups.map(({ id }) => id);
        module.courses = module.courses.map(({ id }) => id);
        setModuleData(module);
    };

    const handleChange = (event) => {
        let name = event.target.name;
        let value = event.target.value;
        setModuleData({ ...moduleData, [name]: value });
    };

    const onSubmit = (event) => {
        event.preventDefault();
        if (event.target.checkValidity()) {
            handleSubmitModule(moduleData, id);
        }
        setFormValidated(true);
    };

    if (!coursesOptions || !classesOptions) return <Loader />;
    return (
        <Fragment>
            <h1 className="text-center">{title}</h1>
            <Form onSubmit={onSubmit} validated={formValidated} noValidate>
                <FormControl
                    label="Title"
                    name="title"
                    placeholder="Programmation..."
                    value={moduleData.title}
                    onChange={handleChange}
                    required
                />
                <FormSelect
                    label="Classes"
                    name="groups"
                    placeholder="Select classes..."
                    options={classesOptions}
                    value={moduleData.groups}
                    onChange={(value) => setModuleData({ ...moduleData, groups: value })}
                    isMulti
                    isClearable
                />
                <FormSelect
                    label="Courses"
                    name="courses"
                    placeholder="Select courses..."
                    options={coursesOptions}
                    value={moduleData.courses}
                    onChange={(value) => setModuleData({ ...moduleData, courses: value })}
                    isMulti
                    isClearable
                />
                <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                <Button variant="btn btn-outline-success me-md-2" type="submit">
                    Submit
                </Button>
                </div>
            </Form>
            <pre>{JSON.stringify(moduleData, null, 2)}</pre>
        </Fragment>
    );
}

export default ModuleForm;
