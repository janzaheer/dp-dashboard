import React, { useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { Button, Col, Form, Row, Modal } from "react-bootstrap";
import { useSelector } from "react-redux";
import { MdAddLocationAlt } from "react-icons/md";
import { CreateAddress } from "../utlis/services/address_services";

const AddressAdd = ({ userList }) => {
  const [phone_number, setPhone_number] = useState("");
  const [email_address, setEmail_address] = useState("");
  const [address, setAddress] = useState("");
  const [provinces, setProvinces] = useState("");
  const [show, setShow] = useState(false);
  const userToken = useSelector((state) => state.user.token);

  const [errors, setErrors] = useState({
    phone_number: "",
    email_address: "",
    address: "",
    province: "",
  });

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

    const newErrors = {};
    if (!phone_number) newErrors.phone_number = "Phone number is required";
    if (!email_address) newErrors.email_address = "Email address is required";
    if (!address) newErrors.address = "Address is required";
    if (!provinces) newErrors.province = "Province is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const payload = {
      phone_number: phone_number,
      email_address: email_address,
      address: address,
      province : provinces
    };
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
      setProvinces("");
      userList();
    } catch (error) {
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
          <Modal.Title className="price-text">Add Address {provinces}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={addAddress}>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridEmail">
                <Form.Label>Email</Form.Label>
                {errors.email_address && (
                  <div className="text-danger">{errors.email_address}</div>
                )}
                <Form.Control
                  type="text"
                  value={email_address}
                  name="email_address"
                  onChange={(e) => {
                    setEmail_address(e.target.value);
                    setErrors((prev) => ({ ...prev, email_address: "" }));
                  }}
                />
              </Form.Group>
              <Form.Group as={Col} controlId="formGridPhone_number">
                <Form.Label>Phone</Form.Label>
                {errors.phone_number && (
                  <div className="text-danger">{errors.phone_number}</div>
                )}
                <Form.Control
                  type="number"
                  value={phone_number}
                  name="phone_number"
                  onChange={(e) => {
                    setPhone_number(e.target.value);
                    setErrors((prev) => ({ ...prev, phone_number: "" }));
                  }}
                />
              </Form.Group>
            </Row>
            <Form.Group className="mb-3" controlId="exampleForm.ControlProvince">
              <Form.Label>Select Province</Form.Label>
              {errors.province && (
                <div className="text-danger">{errors.province}</div>
              )}
              <Form.Select
                aria-label="Default select example"
                defaultValue="Choose..."
                onChange={(e) => {
                  setProvinces(e.target.value);
                  setErrors((prev) => ({ ...prev, province: "" }));
                }}
                name="provinceDataSelect"
              >
                <option>Select Your Province</option>
                <option value="Balochistan">Balochistan</option>
                <option value="Punjab">Punjab</option>
                <option value="Sindh">Sindh</option>
                <option value="KPK">KPK</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlDescription1">
              <Form.Label>Address</Form.Label>
              {errors.address && (
                <div className="text-danger">{errors.address}</div>
              )}
              <Form.Control
                type="text"
                placeholder="1234 Main St"
                name="address"
                value={address}
                onChange={(e) => {
                  setAddress(e.target.value);
                  setErrors((prev) => ({ ...prev, address: "" }));
                }}
              />
            </Form.Group>
            <Button className="add-address-btn" type="submit">
              Save Address
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer className="modal-footer d-flex justify-content-center align-items-center">
          <div>
            <p>Thanks For Adding New Address</p>
          </div>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AddressAdd;
//
