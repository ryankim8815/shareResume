import React, { useState } from "react";
import { Button, Form, Col, Row } from "react-bootstrap";
import DatePicker from "react-datepicker";
import * as Api from "../../api";

function ProjectEditForm({ currentProject, setProjects, setIsEditing }) {
  
  // const [projTitle, setProjTitle] = useState(currentProject.projectTitle);
  // const [projDetail, setProjDetail] = useState(currentProject.projectDetail);

  const [projectForm, setProjectForm] = useState({
    projTitle: currentProject.projTitle,
    projDetail: currentProject.projDetail,
  })
  
  function handleOnchange(e) {
    const { name, value } = e.target;
    setProjectForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  const [from_Date, setFrom_Date] = useState(new Date(currentProject.fromDate));
  const [to_Date, setTo_Date] = useState(new Date(currentProject.toDate));

  const handleSubmit = async (e) => {
    e.preventDefault();

    
    const id = currentProject.id;
    const fromDate = from_Date.toISOString().split("T")[0];
    const toDate = to_Date.toISOString().split("T")[0];

    try {
    await Api.put(`project/${currentProject.projId}/update`, {
      id,
      ...projectForm,
      fromDate,
      toDate,
    });
  } catch (err) {
    console.log("project 편집에 실패하였습니다.", err);
  }
    
    const res = await Api.get("project");
    
    if (!Array.isArray(res.data)) {
      console.log("res.data is not array");
      return;
    }
    setProjects(res.data);
    setIsEditing((prev) => !prev);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="projectEditTitle">
        <Form.Control
          type="text"
          placeholder="프로젝트 제목"
          name="projTitle"
          value={projectForm.projTitle}
          onChange={handleOnchange}
        />
      </Form.Group>

      <Form.Group controlId="projectEditDescription" className="mt-3">
        <Form.Control
          type="text"
          placeholder="상세내역"
          name="projDetail"
          value={projectForm.projDetail}
          onChange={handleOnchange}
        />
      </Form.Group>

      <Form.Group as={Row} className="mt-3">
        <Col xs="auto">
          <DatePicker
            selected={from_Date}
            onChange={(date) => setFrom_Date(date)}
          />
        </Col>
        <Col xs="auto">
          <DatePicker selected={to_Date} onChange={(date) => setTo_Date(date)} />
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mt-3 text-center mb-4">
        <Col sm={{ span: 20 }}>
          <Button variant="primary" type="submit" className="me-3">
            확인
          </Button>
          <Button variant="secondary" onClick={() => setIsEditing(false)}>
            취소
          </Button>
        </Col>
      </Form.Group>
    </Form>
  );
}

export default ProjectEditForm;
