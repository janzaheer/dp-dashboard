import React, { useEffect, useState } from "react";
import Header from "../../common/header/Header";
import Footer from "../../common/footer/Footer";
import { Card, Form, Row, Col } from "react-bootstrap";
import ChatsCardDtata from "./ChatsCardData";
import AddChat from "./AddChat";
import "./Chat.css";
import {
  GetPublicQuestionListings,
  GetPublicQuestionListingsSearch,
} from "../../utlis/services/ques-ans-services";

const Chats = () => {
  useEffect(() => {
    publicQuestionListData();
  }, []);

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const publicQuestionListData = async () => {
    try {
      let data = await GetPublicQuestionListings();
      setData(data.results);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  const handleSearchTerm = async (e) => {
    e.preventDefault();
    try {
      let value = e.target.value;
      setLoading(true);
      let data = await GetPublicQuestionListingsSearch(value);
      if (data && data.results) {
        setData(data.results);
      } else {
        console.log("No data received from the API");
      }
    } catch (error) {
      console.log("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <div className="container-fluid mt-5 mb-1 newCLass">
        <Card
          className="bg-secondary text-white text-center shadow"
          style={{ height: "14rem" }}
        >
          <Card.Body>
            <Card.Text>FAQs</Card.Text>
            <Card.Title className="mt-2" style={{ fontSize: "25px" }}>
              Your Question is Answer By Professional Vet Doctors
            </Card.Title>
            <Card.Text>Have any questions? We're here to assist you</Card.Text>
            <Row className="d-flex justify-content-center">
              <Col xs={3}>
                <Form>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Control
                      type="text"
                      placeholder="Search here"
                      onChange={(e) => handleSearchTerm(e)}
                      autoComplete="off"
                    />
                  </Form.Group>
                </Form>
              </Col>
            </Row>
          </Card.Body>
        </Card>
        <div className="container">
          <ChatsCardDtata data={data} loading={loading} />
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
