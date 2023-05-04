import React, { useEffect, useState } from "react";

import { Button, Container, Form } from "react-bootstrap";
import Select from "react-select";
import { useParams } from "react-router-dom";

import { Class } from "../../../services/Util";
import { getClass } from "../../../services/api/classes";
import { getUsersByRole } from "../../../services/api/users";

function ClassForm({ title, handleSubmitClass }) {
  const { id } = useParams();

  const [groupData, setGroupData] = useState({
    title: null,
    year: null,
    isActive: true,
    referent: null,
  });

  const [referents, setReferents] = useState([]);

  useEffect(() => {
    if (id) fetchClass();
    fetchReferents();
  }, [id]);

  const fetchClass = async () => {
    let group = await getClass(id);
    setGroupData(group);
  };

  const fetchReferents = async () => {
    let users = await getUsersByRole('AR');
    setReferents(users);
    console.log(users);
    };

  const getReferentOptions = (referents) => {
    return referents.map((aReferent) => ({
      label: aReferent.name,
      value: aReferent.id,
    }));
  };

  const handleChange = (event) => {
    let year = event.target.name;
    let value = event.target.value;
    setGroupData({ ...groupData, [year]: value });
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
            options={Class.getClassOptions()}
            value={Class.getClassOptions().find(
              (option) => option.value == groupData.title,
            )}
            onChange={(newValue) =>
              setGroupData({ ...groupData, title: newValue.value })
            }
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
          <Form.Label>Class</Form.Label>
          <Select
            placeholder="Select a class..."
            options={getReferentOptions(referents)}
            value={{
              label: groupData.referent,
              value: groupData.referent,
            }}
            onChange={(newValue) =>
              setGroupData({ ...groupData, referent: newValue.value })
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

export default ClassForm;
