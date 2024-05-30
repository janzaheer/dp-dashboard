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
      <div className="container-fluid chat-CLass">
        <Card
          className="bg-secondary text-white text-center shadow mt-5 mt-md-4 mt-lg-3"
          style={{ height: "auto"}}>
          <Card.Body>
            <Card.Text>FAQs</Card.Text>
            <Card.Title className="question-title">
              Your Question is Answer By Professional Vet Doctors
            </Card.Title>
            <Card.Text className="mt-2 question-text">Have any questions? We're here to assist you</Card.Text>
            <Row className="d-flex justify-content-center">
              <Col xs={12} sm={8} md={6} lg={3}>
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
            <div className="d-flex justify-content-end">
              <p className="mt-2 price-text">Ask Us Anything</p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Chats;
