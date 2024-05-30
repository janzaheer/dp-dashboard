import React, { useState } from "react";
import { RiQuestionnaireLine } from "react-icons/ri";
import { Button, Modal, Form } from "react-bootstrap";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { SubmitUserQuestion } from "../../utlis/services/ques-ans-services";
import { Link } from "react-router-dom";

const AddChat = () => {
  const [show, setShow] = useState(false);
  const [question_text, setQuestion_text] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const userId = useSelector((state) => state.user.user?.id);
  const userToken = useSelector((state) => state.user?.token);
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);

  let headers = {};
  if (userToken) {
    headers = {
      "Content-Type": "application/json",
      Authorization: `Token ${userToken}`,
    };
  }

  const handleSubmit = async (e) => {
    // e.preventDefault();
    const payload = {
      user: userId, // Replace with the actual user ID
      question_text: question_text,
    };
    try {
      let res = await SubmitUserQuestion(payload, headers);
      console.log("form", res);
      toast.success("Your Question is Submit Successffully", {
        position: toast.POSITION.TOP_RIGHT,
        theme: "colored",
      });
      setQuestion_text("");
      setShow(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="d-flex justify-content-end">
        <div className="roundedCircle">
          {isAuthenticated ? (
            <Button
              variant="light"
              onClick={handleShow}
              style={{
                width: "100%", // Make the button fill the circle
                height: "100%",
                borderRadius: "50%", // Ensure the button remains circular
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: "none", // Remove border for a cleaner look
                background: "transparent", // Make the button background transparent
              }}>
              <RiQuestionnaireLine size={30} color="green" />
            </Button>
          ) : (
            <Link to="/login">
              <RiQuestionnaireLine size={30} color="green" />
            </Link>
          )}
        </div>
      </div>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title className="text-just">Ask us Anything</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Type your question</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={question_text}
                onChange={(e) => setQuestion_text(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button className="add-address-btn" onClick={handleSubmit}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AddChat;
