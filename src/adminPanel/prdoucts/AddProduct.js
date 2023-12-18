import React, { useState, useEffect } from "react";
import {
  BASE_URL,
  END_POINT,
  ADD_PRODUCT_ENDPOINT,
  API_VERSION,
} from "../../utlis/apiUrls";
import { useSelector } from "react-redux";
import axios from "axios";
import { Button, Col, Form, Row, Modal } from "react-bootstrap";
import { uploadFile } from "react-s3";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { IoAddCircle } from 'react-icons/io5';
import { ProductCategory } from "../../utlis/services/product_category_services";


window.Buffer = window.Buffer || require("buffer").Buffer;

const BN =
  process.env.NODE_ENV == "development"
    ? `meditech-products`
    : `cosemedicos-prod`;
const config = {
  // bucketName: 'meditech-products',
  bucketName: BN,
  // dirName: 'media', /* optional */
  region: "ap-northeast-1",
  accessKeyId: "AKIA2GGOXYXVJBADABN5",
  secretAccessKey: "bvsMtgOK6qMVwsHo7kWl3sPxMdehAWJAJY5uWrxa",
  // s3Url: 'https:/your-custom-s3-url.com/', /* optional */
};

const AddProduct = ({ productList }) => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [brand, setBrand] = useState("");
  const [store, setStore] = useState("");
  const [categoriesData, setCategoriesData] = useState("");
  const [categoriesDataSelect, setCategoriesDataSelect] = useState("");
  const [selectImage, setSelectImage] = useState("");
  const [selectImage2, setSelectImage2] = useState("");
  const [selectImage3, setSelectImage3] = useState("");
  const [selectImage4, setSelectImage4] = useState("");
  const [stock_quantity, setStock_quantity] = useState("");
  const [discount_percentage, setdDiscount_percentage] = useState("");

  const [showAdd, setShowAdd] = useState(false);

  const userToken = useSelector((state) => state.user.token);
  // Add Product model functions
  const handleCloseAdd = () => setShowAdd(false);
  const handleShowAdd = () => setShowAdd(true);

  useEffect(() => {
    categoryData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  let headers = {};
  if (userToken) {
    headers = {
      "Content-Type": "application/json",
      Authorization: `Token ${userToken}`,
    };
  }

  const addProducts = async (e) => {
    e.preventDefault();
    let FInal = BASE_URL + API_VERSION() + END_POINT() + ADD_PRODUCT_ENDPOINT();
    let imageData = [selectImage];
    if (selectImage2) {
      imageData.push(selectImage2);
    }
    if (selectImage3) {
      imageData.push(selectImage3);
    }
    if (selectImage4) {
      imageData.push(selectImage4);
    }

    await axios
      .post(
        FInal,
        {
          title: title,
          description: description,
          images: imageData,
          category_id: categoriesDataSelect,
          price: price,
          brand: brand,
          store: store,
          stock_quantity: stock_quantity,
          discount_percentage: discount_percentage,
          specification: null, // str
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${userToken}`,
          },
        }
      )
      .then((resp) => {
        console.log(resp.ok);

        setShowAdd(false);
        toast.success("Product Add Successfully", {
          position: toast.POSITION.TOP_RIGHT,
          theme: "colored",
        });
        setTitle("");
        setDescription("");
        setSelectImage("");
        setBrand("");
        setPrice("");
        setStore("");
        setCategoriesDataSelect("");
        setdDiscount_percentage("")
        productList();
      })
      .catch((resp) => {
        setShowAdd(true);
        if (resp.response) {
          console.log(resp.response);
          // console.log(resp.response.data);
          // setField_error(resp.response.data)
          toast.error("please required these fields", {
            position: toast.POSITION.TOP_RIGHT,
            theme: "colored",
          });
        } else if (resp.request) {
          toast.warning("network error", {
            position: toast.POSITION.TOP_RIGHT,
            theme: "colored",
          });
        } else {
          console.log(resp);
        }
      });
  };

  const categoriesDataSelectFun = (e) => {
    setCategoriesDataSelect(e.target.value);
  };

  const categoryData = async () => {
    try {
      let res = await ProductCategory(headers);
      setCategoriesData(res.results);
    } catch (error) {
      console.log(error);
    }
  };

  // 1st image function
  const uploadImage = async (e) => {
    e.preventDefault();
    // let image_urls = []
    const myFiles = e.target.files[0];
    await uploadFile(myFiles, config)
      .then((data) => {
        setSelectImage(data.location);
      })
      .catch((err) => console.error(err));
  };

  // 2nd image function
  const uploadImage2 = async (e) => {
    e.preventDefault();
    // let image_urls = []
    const myFiles = e.target.files[0];
    await uploadFile(myFiles, config)
      .then((data) => {
        setSelectImage2(data.location);
      })
      .catch((err) => console.error(err));
  };

  // 3rd image function
  const uploadImage3 = async (e) => {
    e.preventDefault();
    // let image_urls = []
    const myFiles = e.target.files[0];
    await uploadFile(myFiles, config)
      .then((data) => {
        setSelectImage3(data.location);
      })
      .catch((err) => console.error(err));
  };

  // 4th image function
  const uploadImage4 = async (e) => {
    e.preventDefault();
    // let image_urls = []
    const myFiles = e.target.files[0];
    await uploadFile(myFiles, config)
      .then((data) => {
        setSelectImage4(data.location);
      })
      .catch((err) => console.error(err));
  };

  return (
    <div>
      <ToastContainer />
      <Button variant="outline-success" onClick={handleShowAdd}>
                    Add Product <IoAddCircle />
                  </Button>
      {/* Add Product Model */}
      <Modal show={showAdd} onHide={handleCloseAdd}>
        <Modal.Header closeButton>
          <Modal.Title>Add Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={addProducts}>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridTitle">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="text"
                  name="title"
                  placeholder="Enter Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridPrice">
                <Form.Label>Price</Form.Label>
                <Form.Control
                  type="text"
                  name="price"
                  placeholder="Price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridUploadImage1">
                <Form.Label>Upload Image 1st</Form.Label>
                <Form.Control
                  type="file"
                  onChange={uploadImage}
                  placeholder="Please upload your image here"
                />
                {/* {field_error.images ? <span>{field_error?.images[0]}</span> : '' } */}
              </Form.Group>

              <Form.Group as={Col} controlId="formGridUploadImage2">
                <Form.Label>Upload Image 2nd</Form.Label>
                <Form.Control
                  type="file"
                  onChange={uploadImage2}
                  placeholder="Please upload your image here"
                />
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridUploadImage3">
                <Form.Label>Upload Image 3rd</Form.Label>
                <Form.Control
                  type="file"
                  onChange={uploadImage3}
                  placeholder="Please upload your image here"
                />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridUploadImage4">
                <Form.Label>Upload Image 4th</Form.Label>
                <Form.Control
                  type="file"
                  onChange={uploadImage4}
                  placeholder="Please upload your image here"
                />
              </Form.Group>
            </Row>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlDescription1"
            >
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                name="description"
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Form.Group>

            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridBrand">
                <Form.Label>Brand</Form.Label>
                <Form.Control
                  type="text"
                  name="brand"
                  placeholder="Brand"
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridState">
                <Form.Label>Categories</Form.Label>
                <Form.Select
                  defaultValue="Choose..."
                  onChange={categoriesDataSelectFun}
                  name="categoriesDataSelect"
                  value={categoriesDataSelect}
                >
                  <option>Choose...</option>
                  {categoriesData &&
                    categoriesData.map((catee) => {
                      return (
                        <option key={catee.id} value={catee?.id}>
                          {catee?.name}
                        </option>
                      );
                    })}
                </Form.Select>
              </Form.Group>

              <Form.Group as={Col} controlId="formGridStore">
                <Form.Label>Store</Form.Label>
                <Form.Control
                  type="text"
                  name="Store"
                  placeholder="Store"
                  value={store}
                  onChange={(e) => setStore(e.target.value)}
                />
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridStock_quantity">
                <Form.Label>Quantity</Form.Label>
                <Form.Control
                  type="number"
                  name="stock_quantity"
                  placeholder="Stock_quantity 5"
                  value={stock_quantity}
                  onChange={(e) => setStock_quantity(e.target.value)}
                />
              </Form.Group>
              <Form.Group as={Col} controlId="formGridStock_quantity">
                <Form.Label>Discount</Form.Label>
                <Form.Control
                  type="number"
                  name="discount_percentage"
                  placeholder="discount_percentage 5"
                  value={discount_percentage}
                  onChange={(e) => setdDiscount_percentage(e.target.value)}
                />
              </Form.Group>
            </Row>

            <Button
              variant="success"
              // onClick={handleCloseAdd}
              type="submit"
            >
              Save Product
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer className="modal-footer d-flex justify-content-center align-items-center">
          <div>
            <p>Thanks For Add New Product</p>
          </div>
        </Modal.Footer>
      </Modal>
      {/* Add Product Model End */}
    </div>
  );
};

export default AddProduct;
