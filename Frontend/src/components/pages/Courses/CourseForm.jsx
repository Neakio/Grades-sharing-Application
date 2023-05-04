import React, { useEffect, useState } from "react";

import { Button, Container, Form } from "react-bootstrap";
import Select from "react-select";
import { useParams } from "react-router-dom";
import { getUsersByRole } from "../../../services/api/users";


function CourseForm({ title, handleSubmitCourse }) {
  const { id } = useParams();

  const [courseData, setcourseData] = useState({
    title: null,
    lteacher: null,
    oteacher: null,
    module: null,
  });
  const [teachers, setTeachers] = useState([]);
  const [modules, setModules] = useState([]);

  useEffect(() => {
    if (id) fetchCourse();
    fetchTeachers();
    fetchModules();
  }, [id]);

  const fetchCourse = async () => {
    let course = await getCourse(id);
    setcourseData(course);
  };
  const fetchModules = async () => {
    let groups = await getModules();
    setModules(groups);
  };
  const fetchTeachers = async () => {
    let user = await getUsersByRole('TE');
    setTeachers(user);
  };

  const getTeachersOptions = (teachers) => {
    return teachers.map((aTeacher) => ({
      label: aTeacher.name,
      value: aTeacher.id,
    }));
  };
  const getModulesOptions = (modules) => {
    return modules.map((aModule) => ({
      label: aModule.name,
      value: aModule.id,
    }));
  };
  

  const handleChange = (event) => {
    let name = event.target.name;
    let value = event.target.value;
    setcourseData({ ...courseData, [name]: value });
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
            defaultValue={courseData.title}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group classname="mb-3">
          <Form.Label>Lead Teacher</Form.Label>
          <Select 
            placeholder="Select a lead teacher..."
            options={getTeachersOptions()}
            value={{
                label: courseData.lteacher,
                value: courseData.lteacher,
              }}
            onChange={(newValue) => setcourseData({ ...courseData, lteacher: newValue.value })}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Other Teacher</Form.Label>
          <Select 
          multiple= {true}
            placeholder="Select other(s) teacher(s)..."
            options={getTeachersOptions()}
            value={{
                label: courseData.oteacher,
                value: courseData.oteacher,
              }}
            onChange={(newValue) => setcourseData({ ...courseData, oteacher: newValue.value })}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Module</Form.Label>
          <Select
            placeholder="Select a module..."
            options={getModulesOptions()}
            value={{
              label: courseData.module,
              value: courseData.module,
            }}
            onChange={(newValue) => setcourseData({ ...courseData, module: newValue.value })}
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
