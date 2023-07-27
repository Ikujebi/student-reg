import { Button, Col, Form, Input, Modal, Row, message } from "antd";
import React, { useState } from "react";
import { baseUrl } from "./baseUrl";
import { endPoints } from "./endpoints";

const FormModal = ({ open, setOpen }) => {
  // use this state to get user input
  const [formRequest, setFormRequest] = useState({
    fullName: "",
    lga: "",
    code: "",
  });

  // use this function to get the value of the input by call this function in the onChange event in the input
  const setRequest = (value, key) => {
    setFormRequest((prev) => {
      return {
        ...prev,
        [key]: value,
      };
    });
  };

  const onFinish = () => {
    setOpen(!open)
    fetch(baseUrl + endPoints.getAllStudentClockedIn, {
      method: "POST",
      body: JSON.stringify({...formRequest, id: 2})
    }).then((response) => {
      return response.json()
    }).then(data => {
      message.success("Clocked in successfully")
      console.log(data);
    }).catch((err) => {
      console.log(err);
      message.error("Clocked in unsuccessful")
    })
  }

  return (
    <Modal
      width="25rem"
      open={open}
      centered
      footer={false}
      onCancel={() => setOpen(!open)}
    >
      <Form layout="vertical" onFinish={onFinish} labelCol={{ span: 24 }} wrapperCol={{ span: 24 }}>
        <Row style={{ width: "100%" }}>
          <Col span={24}>
            <Form.Item
              label="Full Name"
              name="fullName"
              rules={[{ required: true, message: "full name is required" }]}
            >
              <Input
                value={formRequest.fullName}
                onChange={(e) => setRequest(e.target.value, "fullName")}
              />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              label="LGA"
              name="lga"
              rules={[{ required: true, message: "local govt is required" }]}
            >
              <Input
                value={formRequest.lga}
                onChange={(e) => setRequest(e.target.value, "lga")}
              />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              label="Code"
              name="code"
              rules={[{ required: true, message: "code is required" }]}
            >
              <Input
                value={formRequest.code}
                onChange={(e) => setRequest(e.target.value, "code")}
              />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Button
              type="primary"
              htmlType="submit"
              block
              className="bg-blue-800 px-5 font-semibold"
            >
              Submit
            </Button>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default FormModal;
