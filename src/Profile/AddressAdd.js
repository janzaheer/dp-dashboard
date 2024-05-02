import React, { useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { Button, Col, Form, Row, Modal } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { MdAddLocationAlt } from 'react-icons/md';
import { CreateAddress } from "../utlis/services/address_services";

const AddressAdd = ({userList}) => {
  const [phone_number, setPhone_number] = useState("");
  const [email_address, setEmail_address] = useState("");
  const [address, setAddress] = useState("");
  const [show, setShow] = useState(false);
  const userToken = useSelector((state) => state.user.token);

  let headers = {};
  if (userToken) {
    headers = {
      "Content-Type": "application/json",
      Authorization: `Token ${userToken}`,
    };
  }
  const handleCloseAdd = () => setShow(false);
  const handleShowAdd = () => setShow(true);
  const addAddress = async (e) => {
    e.preventDefault();
    const payload = {
        phone_number: phone_number,
          email_address: email_address,
          address: address,
    }
    try {
        await CreateAddress(payload, headers);
      setShow(false);
      toast.success("new Address Added Successfully!", {
        position: toast.POSITION.TOP_RIGHT,
        theme: "colored",
      });
      setAddress("");
      setEmail_address("");
      setPhone_number("");
    userList();
    } catch (error) {
      console.log("add error", error);
      toast.error("Please Required These Fields", {
        position: toast.POSITION.TOP_RIGHT,
        theme: "colored",
      });
      setShow(true);
    }
  };

  return (
    <div>
      <ToastContainer />
      <Button className="add-address-btn" onClick={handleShowAdd}>
        Add Address <MdAddLocationAlt />
      </Button>

      <Modal show={show} onHide={handleCloseAdd}>
        <Modal.Header closeButton>
          <Modal.Title className="price-text">Add Address</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={addAddress}>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="text"
                  value={email_address}
                  name="email_address"
                  onChange={(e) => setEmail_address(e.target.value)}
                />
              </Form.Group>
              <Form.Group as={Col} controlId="formGridPhone_number">
                <Form.Label>Phone</Form.Label>
                <Form.Control
                  type="number"
                  value={phone_number}
                  name="phone_number"
                  onChange={(e) => setPhone_number(e.target.value)}
                />
              </Form.Group>
            </Row>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlDescription1"
            >
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                placeholder="1234 Main St"
                name="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </Form.Group>
            <Button
             className="add-address-btn"
              // onClick={handleCloseAdd}
              type="submit"
            >
              Save Address
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer className="modal-footer d-flex justify-content-center align-items-center">
          <div>
            <p>Thanks For Add New Address</p>
          </div>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AddressAdd;
// 