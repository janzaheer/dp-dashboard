import React, { useState } from "react";
import { RiQuestionnaireLine } from "react-icons/ri";
import { Button, Modal, Form } from "react-bootstrap";

const AddChat = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmit = (e) => {
    // e.preventDefault();
    setShow(false);
  };

  return (
    <>
      <div className="d-flex justify-content-end">
        <div className="roundedCircle">
          <Button
            variant="light"
            onClick={handleShow}
            style={{
                width: '100%', // Make the button fill the circle
                height: '100%',
                borderRadius: '50%', // Ensure the button remains circular
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: 'none', // Remove border for a cleaner look
                background: 'transparent', // Make the button background transparent
              }}
          >
            <RiQuestionnaireLine size={30} color='green' />
          </Button>
        </div>
      </div>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Ask us Anything</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Type your question</Form.Label>
              <Form.Control as="textarea" rows={3} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AddChat;
