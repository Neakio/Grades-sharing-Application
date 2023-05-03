import React, { useEffect, useState } from "react";

import { Button, Container, Form } from "react-bootstrap";
import Select from "react-select";
import { useParams } from "react-router-dom";


function CourseForm({ title, handleSubmitCourse }) {
  const { id } = useParams();

  const [courseData, setcourseData] = useState({
    firstname: null,
    lastname: null,
    role: null,
    isDelegate: false,
    group: null,
  });
  const [lteacher, setLTeacher] = useState([]);
  const [oteacher, setOTeacher] = useState([]);
  const [modules, setModules] = useState([]);

  useEffect(() => {
    if (id) fetchCourse();
    fetchLTeacher();
    fetchOTeacher();
    fetchModules();
  }, [id]);

  const fetchUser = async () => {
    let user = await getUser(id);
    setcourseData(user);
  };
  const fetchClasses = async () => {
    let groups = await getClasses();
    setClasses(groups);
  };


  const handleChange = (event) => {
    let name = event.target.name;
    let value = event.target.value;
    setcourseData({ ...courseData, [name]: value });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    handleSubmitUser(courseData, id);
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
            options={getTeachers()}
            value={{
                label: courseData.lteachers,
                value: courseData.lteachers,
              }}
            onChange={(newValue) => setcourseData({ ...courseData, lteachers: newValue.value })}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Other Teacher</Form.Label>
          <Select 
          multiple= {true}
            placeholder="Select other(s) teacher(s)..."
            options={getTeachers()}
            value={{
                label: courseData.oteachers,
                value: courseData.oteachers,
              }}
            onChange={(newValue) => setcourseData({ ...courseData, oteachers: newValue.value })}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Module</Form.Label>
          <Select
            placeholder="Select a module..."
            options={getModule()}
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
