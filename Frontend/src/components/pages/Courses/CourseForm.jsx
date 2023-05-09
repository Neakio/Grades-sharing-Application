import React, { useEffect, useState } from "react";

import { Button, Container, Form } from "react-bootstrap";
import Select from "react-select";
import { useParams } from "react-router-dom";
import { getUsersByRole } from "../../../services/api/users";
import { getCourses } from "../../../services/api";

function CourseForm({ title, handleSubmitCourse }) {
    const { id } = useParams();

    const [courseData, setCourseData] = useState({
        title: null,
        leadTeacher: null,
        otherTeachers: null,
    });
    const [teachersOptions, setTeachersOptions] = useState([]);

    useEffect(() => {
        if (id) fetchCourse();
        fetchTeachers();
    }, [id]);

    const fetchCourse = async () => {
        let course = await getCourses(id);
        course.leadTeacher = course.leadTeacher.id;
        course.otherTeachers = course.otherTeachers.map((teacher) => teacher.id);
        setCourseData(course);
    };

    const fetchTeachers = async () => {
        let users = await getUsersByRole("TE");
        setTeachersOptions(users.map((aTeachers) => makeTeacherOption(aTeachers)));
    };

    const makeTeacherOption = (teacher) => {
        return {
            label: teacher.firstname + " " + teacher.lastname,
            value: teacher.id,
        };
    };

    const handleChange = (event) => {
        let name = event.target.name;
        let value = event.target.value;
        setCourseData({ ...courseData, [name]: value });
    };

    const onSubmit = (event) => {
        event.preventDefault();
        handleSubmitCourse(courseData, id);
    };

    return (
        <Container>
            <h1 className="text-center">{title}</h1>
            <Form onSubmit={onSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                        name="title"
                        placeholder="Python"
                        value={courseData.title}
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Lead Teacher</Form.Label>
                    <Select
                        placeholder="Select a lead teacher..."
                        options={teachersOptions}
                        value={teachersOptions.find(
                            (option) => option.value == courseData.leadTeacher,
                        )}
                        onChange={(newValue) =>
                            setCourseData({ ...courseData, leadTeacher: newValue.value })
                        }
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Other Teacher</Form.Label>
                    <Select
                        isMulti
                        placeholder="Select other(s) teacher(s)..."
                        options={teachersOptions.filter(
                            (teacher) => teacher.value !== courseData.leadTeacher,
                        )}
                        value={teachersOptions.filter((teacher) =>
                            courseData.otherTeachers?.includes(teacher.value),
                        )}
                        onChange={(newValues) =>
                            setCourseData({
                                ...courseData,
                                otherTeachers: newValues.map((option) => option.value),
                            })
                        }
                    />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
            {JSON.stringify(courseData)}
        </Container>
    );
}

export default CourseForm;
