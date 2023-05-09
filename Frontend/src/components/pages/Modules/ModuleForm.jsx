import React, { useEffect, useState } from "react";

import { Button, Container, Form } from "react-bootstrap";
import Select from "react-select";
import { useParams } from "react-router-dom";
import { getClasses, getCourses, getModules } from "../../../services/api";
import { Util } from "../../../services/Util";

function ModuleForm({ title, handleSubmitModule }) {
    const { id } = useParams();

    const [moduleData, setModuleData] = useState({
        title: null,
        groups: null,
        courses: null,
    });
    const [coursesOptions, setCoursesOptions] = useState([]);
    const [classesOptions, setClassesOptions] = useState([]);

    useEffect(() => {
        if (id) fetchModule();
        fetchClasses();
        fetchCourses();
    }, [id]);

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
    const fetchCourses = async () => {
        let courses = await getCourses();
        setCoursesOptions(getCourseOptions(courses));
        console.log(courses)
    };
    const getCourseOptions = (courses) => {
        return courses.map((aCourse) => ({
            label: aCourse.title,
            value: aCourse.id,
        }));
    };
    const fetchModule = async () => {
        let module = await getModules(id);
        setModuleData(module);
    };

    const handleChange = (event) => {
        let name = event.target.name;
        let value = event.target.value;
        setModuleData({ ...moduleData, [name]: value });
    };

    const onSubmit = (event) => {
        event.preventDefault();
        handleSubmitModule(moduleData, id);
    };

    return (
        <Container>
            <h1 className="text-center">{title}</h1>
            <Form onSubmit={onSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                        name="title"
                        placeholder="Name ..."
                        value={moduleData.title ?? ""}
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Classes</Form.Label>
                    <Select
                        isMulti
                        placeholder="Select classes..."
                        options={classesOptions}
                        value={classesOptions.filter((group) =>
                            moduleData.groups?.includes(group.value),
                        )}
                        onChange={(newValues) =>
                            setModuleData({
                                ...moduleData,
                                groups: newValues.map((option) => option.value),
                            })
                        }
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Courses</Form.Label>
                    <Select
                        isMulti
                        placeholder="Select courses..."
                        options={coursesOptions}
                        value={coursesOptions.filter((course) =>
                            moduleData.courses?.includes(course.value),
                        )}
                        onChange={(newValues) => setModuleData({
                            ...moduleData,
                            courses: newValues.map((option) => option.value),
                        })}
                    />
                </Form.Group>
                ;
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
            {JSON.stringify(moduleData)}
        </Container>
    );
}

export default ModuleForm;
