import React from "react";
import { Scrollbars } from "react-custom-scrollbars-2";
import { Card, Spinner } from "react-bootstrap";
import moment from "moment";

const ChatsCardDtata = ({ data, loading }) => {
  return (
    <div>
      <div className="row mt-2 d-flex justify-content-center">
        <div className="table-chat">
          {loading ? (
            <div className="text-center m-5">
              <Spinner animation="border" size="lg" variant="success" />
            </div>
          ) : data.length === 0 ? (
            <h3 className="text-center m-5 text-danger">
              No Questions available.
            </h3>
          ) : (
            <Scrollbars>
              <div>
                {data &&
                  data.map((item) => {
                    return (
                      <div className="col-12  mt-2" key={item.id}>
                        <Card border="success" className="shadow-sm">
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
                                  background: "#008080", // Set your preferred background color
                                  color: "#fff", // Set the text color
                                  fontSize: "16px", // Set the font size
                                }}
                              >
                                {item?.user_first_name.substring(0, 1)}
                              </div>
                              <div className="d-flex gap-2 w-100 justify-content-between">
                                <div>
                                  <span>Question By {item?.user_first_name} {item?.user_last_name} </span>
                                  <h6 className="mb-0">
                                    {item?.question_text}?
                                  </h6>
                                  <p className="mb-0 opacity-75">
                                    {item?.answer_text}
                                  </p>
                                </div>
                                <small className="opacity-50 text-nowrap">
                                  {moment(item?.created_at)
                                    .startOf("minutes")
                                    .fromNow()}
                                </small>
                              </div>
                            </a>
                          </Card.Body>
                        </Card>
                      </div>
                    );
                  })}
              </div>
            </Scrollbars>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatsCardDtata;
