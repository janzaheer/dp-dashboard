import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import ReactStars from "react-rating-stars-component";
import { useSelector } from "react-redux";
import { CreateReview } from "../../utlis/review_services";

const AddReview = ({id}) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  let user = useSelector((state) => state.user.user.id);
  const userToken = useSelector((state) => state.user.token);
  const [feedback, setFeedback] = useState("");
  const [rat, setRat] = useState("");

  let headers = {};
  if (userToken) {
    headers = {
      "Content-Type": "application/json",
      Authorization: `Token ${userToken}`,
    };
  }

  const addFeedbackProduct = async (e) => {
    e.preventDefault();
    const payload = {
      user: user,
      item: id,
      text: feedback,
      rating: rat,
    };

    try {
        await CreateReview(id, payload, headers);
        setFeedback("");
        setRat("");
        toast.success("Product Feedback Add Successfully", {
        position: toast.POSITION.TOP_RIGHT,
        theme: "colored",
      });
      setShow(false);
    } catch (error) {
      console.log(error);
    }
  };

  const ratingChanged = (newRating) => {
    setRat(newRating)
};

  return (
    <div>
      <ToastContainer />
      <Button variant="primary" size="sm" onClick={handleShow}>
       Write a Review
      </Button>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Review</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={addFeedbackProduct}>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label mb-0">
                Click at Star for Rating
              </label>
              <ReactStars
                count={5}
                onChange={ratingChanged}
                size={24}
                activeColor="#ffd700"
              />
              <div className="mb-3">
                <label
                  htmlFor="exampleFormControlTextarea1"
                  className="form-label"
                >
                  Enter about Product Feedback'
                </label>
                <textarea
                  className="form-control"
                  id="exampleFormControlTextarea1"
                  rows={3}
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                />
              </div>
               <Modal.Footer>
                  <Button type="submit" variant="primary">Submit Review</Button>
                </Modal.Footer>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default AddReview;
