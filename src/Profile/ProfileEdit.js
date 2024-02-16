import React, { useState } from "react";
import "./ManageProfile.css";
import { Modal, Button, Form, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { userUpdate } from "../utlis/services/user_services";
import { useSelector } from "react-redux";

const ProfileEdit = ({
  userName,
  first_name,
  last_name,
  Email,
  DOB,
  phoneNumber,
  City,
  country,
  userList
}) => {
  const [show, setShow] = useState(false);
  const [username, setUsername] = useState("");
  const [firstname, setFirstname] = useState("");
  const [Lastname, setLastname] = useState("");
  const [email, setEmailname] = useState("");
  const [phone, setPhone] = useState("");
  const [dob, setDob] = useState("");
  const [city, setCity] = useState("");
  const [Country, setCountry] = useState("");

  const userToken = useSelector((state) => state.user.token);
  let headers = {};
  if (userToken) {
    headers = {
      "Content-Type": "application/json",
      Authorization: `Token ${userToken}`,
    };
  }

  const handleClose = () => setShow(false);
  const handleShow = () => {
    setUsername(userName);
    setFirstname(first_name);
    setLastname(last_name);
    setEmailname(Email);
    setPhone(phoneNumber);
    setDob(DOB || "");
    setCity(City);
    setCountry(country);
    setShow(true);
  };

  const handleUserUpdate = async () => {
    const payload = {
      first_name: firstname,
      last_name: Lastname,
      phone_number: phone,
      username: username,
      email: email,
      dob: dob,
      city: city,
      country: Country,
    };
    // console.log("payload", payload);

    try {
      let result = await userUpdate(payload, headers);
      console.log("result", result);
      userList()
      setUsername('');
      setFirstname('');
      setLastname('');
      setEmailname('');
      setPhone('');
      setDob('');
      setCity('');
      setCountry('');
      setShow(false)
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <div>
      {/* <Button variant="primary" >
        Launch demo modal
      </Button> */}
      <Link to="#" onClick={handleShow} className="text-secondary">
        Edit
      </Link>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Your Information</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <Form>
              <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridFirstname">
                  <Form.Label>First name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="First name"
                    value={firstname}
                    onChange={(e) => setFirstname(e.target.value)}
                  />
                </Form.Group>
                <Form.Group as={Col} controlId="formGridLastname">
                  <Form.Label>Last name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Last name"
                    value={Lastname}
                    onChange={(e) => setLastname(e.target.value)}
                  />
                </Form.Group>
              </Row>
              <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridName">
                  <Form.Label>User name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="User name"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </Form.Group>
                <Form.Group as={Col} controlId="formGridEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmailname(e.target.value)}
                  />
                </Form.Group>
              </Row>
              <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridPhone">
                  <Form.Label>Phone number</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Phone number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </Form.Group>
                <Form.Group as={Col} controlId="formGridDOB">
                  <Form.Label>DOB</Form.Label>
                  <Form.Control
                    type="date"
                    placeholder="Enter Dob"
                    value={dob}
                    onChange={(e) => setDob(e.target.value)}
                  />
                </Form.Group>
              </Row>
              <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridCity">
                  <Form.Label>City</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="enter city"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                  />
                </Form.Group>
                <Form.Group as={Col} controlId="formGridCity">
                  <Form.Label>Country</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Country"
                    value={Country}
                    onChange={(e) => setCountry(e.target.value)}
                  />
                </Form.Group>
              </Row>
              <Button variant="success" onClick={handleUserUpdate}>
                save changes
              </Button>
            </Form>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default ProfileEdit;
