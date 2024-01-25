import React from "react";
import Header from "../../common/header/Header";
import Footer from "../../common/footer/Footer";
import { Card, Form, Row, Col } from "react-bootstrap";
import ChatsCardDtata from "./ChatsCardData";
import AddChat from "./AddChat";
import "./Chat.css";

const Chats = () => {
  return (
    <>
      <Header />
      <div className="container-fluid mt-3 mb-1 newCLass">
        <Card
          className="bg-secondary text-white text-center shadow"
          style={{ height: "14rem" }}
        >
          <Card.Body>
            <Card.Text>FAQs</Card.Text>
            <Card.Title className="mt-2" style={{ fontSize: "25px" }}>
              Your Question is Answer By Professional vet Doctors
            </Card.Title>
            <Card.Text>Have any questions? We're here to assist you</Card.Text>
            <Row className="d-flex justify-content-center">
              <Col xs={3}>
                <Form>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Control type="text" placeholder="Search here" />
                  </Form.Group>
                </Form>
              </Col>
            </Row>
          </Card.Body>
        </Card>
        <div className="container">
          <ChatsCardDtata />
         
          <div>
            <AddChat />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Chats;
