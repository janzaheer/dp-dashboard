import React from "react";
import Header from "../../common/header/Header";
import Footer from "../../common/footer/Footer";
import { Card, Form, Row, Col } from "react-bootstrap";
import { Scrollbars } from "react-custom-scrollbars-2";

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
          <div className="row mt-2 d-flex justify-content-center">
            <div className="table-chat">
              <Scrollbars>
                <div>
                  <div className="col-12  mt-2">
                    <Card border="success">
                      <Card.Body>
                        <a
                          href="#"
                          className="list-group-item list-group-item-action d-flex gap-3 py-3"
                          aria-current="true"
                        >
                          <div
                            className="rounded-circle flex-shrink-0 d-flex align-items-center justify-content-center"
                            style={{
                              width: "40px",
                              height: "40px",
                              background: "#007BFF", // Set your preferred background color
                              color: "#fff", // Set the text color
                              fontSize: "16px", // Set the font size
                            }}
                          >
                            A
                          </div>
                          <div className="d-flex gap-2 w-100 justify-content-between">
                            <div>
                              <span>Question By Atif </span>
                              <h6 className="mb-0">List group item heading?</h6>
                              <p className="mb-0 opacity-75">
                                Some placeholder content in a paragraph.
                              </p>
                            </div>
                            <small className="opacity-50 text-nowrap">
                              12-3-2024
                            </small>
                          </div>
                        </a>
                      </Card.Body>
                    </Card>
                  </div>
                  <div className="col-12  mt-2">
                    <Card border="success">
                      <Card.Body>
                        <a
                          href="#"
                          className="list-group-item list-group-item-action d-flex gap-3 py-3"
                          aria-current="true"
                        >
                          <div
                            className="rounded-circle flex-shrink-0 d-flex align-items-center justify-content-center"
                            style={{
                              width: "40px",
                              height: "40px",
                              background: "#007BFF", // Set your preferred background color
                              color: "#fff", // Set the text color
                              fontSize: "16px", // Set the font size
                            }}
                          >
                            H
                          </div>
                          <div className="d-flex gap-2 w-100 justify-content-between">
                            <div>
                              <span>Question By Hasnan </span>
                              <h6 className="mb-0">List group item heading?</h6>
                              <p className="mb-0 opacity-75">
                                Some placeholder content in a paragraph.
                              </p>
                            </div>
                            <small className="opacity-50 text-nowrap">
                              12-3-2024
                            </small>
                          </div>
                        </a>
                      </Card.Body>
                    </Card>
                  </div>
                  <div className="col-12  mt-2">
                    <Card border="success">
                      <Card.Body>
                        <a
                          href="#"
                          className="list-group-item list-group-item-action d-flex gap-3 py-3"
                          aria-current="true"
                        >
                          <div
                            className="rounded-circle flex-shrink-0 d-flex align-items-center justify-content-center"
                            style={{
                              width: "40px",
                              height: "40px",
                              background: "#007BFF", // Set your preferred background color
                              color: "#fff", // Set the text color
                              fontSize: "16px", // Set the font size
                            }}
                          >
                            A
                          </div>
                          <div className="d-flex gap-2 w-100 justify-content-between">
                            <div>
                              <span>Question By Ali </span>
                              <h6 className="mb-0">List group item heading?</h6>
                              <p className="mb-0 opacity-75">
                                Some placeholder content in a paragraph.
                              </p>
                            </div>
                            <small className="opacity-50 text-nowrap">
                              12-3-2024
                            </small>
                          </div>
                        </a>
                      </Card.Body>
                    </Card>
                  </div>
                  <div className="col-12  mt-2">
                    <Card border="success">
                      <Card.Body>
                        <a
                          href="#"
                          className="list-group-item list-group-item-action d-flex gap-3 py-3"
                          aria-current="true"
                        >
                          <div
                            className="rounded-circle flex-shrink-0 d-flex align-items-center justify-content-center"
                            style={{
                              width: "40px",
                              height: "40px",
                              background: "#007BFF", // Set your preferred background color
                              color: "#fff", // Set the text color
                              fontSize: "16px", // Set the font size
                            }}
                          >
                            W
                          </div>
                          <div className="d-flex gap-2 w-100 justify-content-between">
                            <div>
                              <span>Question By Wali </span>
                              <h6 className="mb-0">List group item heading?</h6>
                              <p className="mb-0 opacity-75">
                                Some placeholder content in a paragraph.
                              </p>
                            </div>
                            <small className="opacity-50 text-nowrap">
                              12-3-2024
                            </small>
                          </div>
                        </a>
                      </Card.Body>
                    </Card>
                  </div>
                  <div className="col-12  mt-2">
                    <Card border="success">
                      <Card.Body>
                        <a
                          href="#"
                          className="list-group-item list-group-item-action d-flex gap-3 py-3"
                          aria-current="true"
                        >
                          <div
                            className="rounded-circle flex-shrink-0 d-flex align-items-center justify-content-center"
                            style={{
                              width: "40px",
                              height: "40px",
                              background: "#007BFF", // Set your preferred background color
                              color: "#fff", // Set the text color
                              fontSize: "16px", // Set the font size
                            }}
                          >
                            B
                          </div>
                          <div className="d-flex gap-2 w-100 justify-content-between">
                            <div>
                              <span>Question By Boss </span>
                              <h6 className="mb-0">List group item heading?</h6>
                              <p className="mb-0 opacity-75">
                                Some placeholder content in a paragraph.
                              </p>
                            </div>
                            <small className="opacity-50 text-nowrap">
                              12-3-2024
                            </small>
                          </div>
                        </a>
                      </Card.Body>
                    </Card>
                  </div>
                  <div className="col-12  mt-2">
                    <Card border="success">
                      <Card.Body>
                        <a
                          href="#"
                          className="list-group-item list-group-item-action d-flex gap-3 py-3"
                          aria-current="true"
                        >
                          <div
                            className="rounded-circle flex-shrink-0 d-flex align-items-center justify-content-center"
                            style={{
                              width: "40px",
                              height: "40px",
                              background: "#007BFF", // Set your preferred background color
                              color: "#fff", // Set the text color
                              fontSize: "16px", // Set the font size
                            }}
                          >
                            J
                          </div>
                          <div className="d-flex gap-2 w-100 justify-content-between">
                            <div>
                              <span>Question By John </span>
                              <h6 className="mb-0">List group item heading?</h6>
                              <p className="mb-0 opacity-75">
                                Some placeholder content in a paragraph.
                              </p>
                            </div>
                            <small className="opacity-50 text-nowrap">
                              12-3-2024
                            </small>
                          </div>
                        </a>
                      </Card.Body>
                    </Card>
                  </div>
                </div>
              </Scrollbars>
            </div>
          </div>
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
