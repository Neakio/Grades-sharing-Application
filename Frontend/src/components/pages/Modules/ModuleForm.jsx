import React, { useEffect, useState } from "react";

import { Button, Container, Form } from "react-bootstrap";
import Select from "react-select";
import { useParams } from "react-router-dom";
import { getCourses, getModules } from "../../../services/api";



function ModuleForm({ title, handleSubmitClass }) {
  const { id } = useParams();

  const [moduleData, setModuleData] = useState({
    title: null,
    courses : null,
    groups : null,
  });
  const [classes, setClasses] = useState([]);
  const [courses, setCourses] = useState([]);


  useEffect(() => {
    if (id) fetchModule();
    fetchClasses();
    fetchCourses();
  }, [id]);

  const fetchClasses = async () => {
    let groups = await getClasses();
    setClasses(groups);
  };
  const getClassOptions = (classes) => {
    return classes.map((aClass) => ({
      label: aClass.name,
      value: aClass.id,
    }));
  };
  const fetchCourses = async () => {
    let courses = await getCourses();
    setCourses(courses);
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
            defaultValue={moduleData.title}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Classes</Form.Label>
          <Select
            multiple
            placeholder="Select classes..."
            options={getClassOptions(classes)}
            value={{
              label: moduleData.groups,
              value: moduleData.groups,
            }}
            onChange={(newValue) => setModuleData({ ...moduleData, groups: newValue.value })}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Courses</Form.Label>
          <Select
            multiple
            placeholder="Select courses..."
            options={getCourseOptions(courses)}
            value={{
              label: moduleData.courses,
              value: moduleData.courses,
            }}
            onChange={(newValue) =>
              setModuleData({ ...moduleData, courses: newValue.value })
            }
          />
        </Form.Group>
                ;
        <Button variant="primary" type="submit">
                    Submit
        </Button>
      </Form>
      {JSON.stringify(groupData)}
    </Container>
  );
}

export default ModuleForm;
