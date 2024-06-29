import React, { useState, useEffect } from "react";
// import {
//   BASE_URL,
//   END_POINT,
//   ADD_PRODUCT_ENDPOINT,
//   API_VERSION,
// } from "../../utlis/apiUrls";
import { useSelector } from "react-redux";
// import axios from "axios";
import { Button, Col, Form, Row, Modal } from "react-bootstrap";
import { uploadFile } from "react-s3";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { IoAddCircle } from "react-icons/io5";
import { ProductCategory,AddSellerProduct } from "../../utlis/services/product_category_services";

window.Buffer = window.Buffer || require("buffer").Buffer;

let BN = process.env.REACT_APP_AWS_BUCKET_NAME
let AD = process.env.REACT_APP_AWS_ACCESS_KEY_ID
let SK = process.env.REACT_APP_AWS_SCRET_ACCESS_KEY
let R = process.env.REACT_APP_AWS_REGION

const config = {
  bucketName: BN,
  region: R,
  accessKeyId: AD,
  secretAccessKey: SK,
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
  const [weight, setWeight] = useState("");
  const [loadingImage1, setLoadingImage1] = useState(false);
  const [loadingImage2, setLoadingImage2] = useState(false);
  const [loadingImage3, setLoadingImage3] = useState(false);
  const [loadingImage4, setLoadingImage4 ] = useState(false);

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
    // let FInal = BASE_URL + API_VERSION() + END_POINT() + ADD_PRODUCT_ENDPOINT();
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

    try {
      const payload = {
        title,
        description,
        images: imageData,
        category_id: categoriesDataSelect,
        price,
        weight,
        dimensions: 0.00,
        brand,
        store,
        stock_quantity,
        discount_percentage,
        specification: null, // str
      };
  
       await AddSellerProduct(payload, headers);
  
      // if (resp.ok) {
        setShowAdd(false);
        toast.success("Product added successfully", {
          position: toast.POSITION.TOP_RIGHT,
          theme: "colored",
        });
  
        // Reset form fields after successful submission
        setTitle("");
        setDescription("");
        setSelectImage("");
        setBrand("");
        setPrice("");
        setStore("");
        setCategoriesDataSelect("");
        setStock_quantity("");
        setdDiscount_percentage("");
        setWeight("");
  
        // Fetch updated product list
        productList();
      // } 
    } catch (error) {
      setShowAdd(true);
  
      if (error.response) {
        console.error(error.response);
        toast.error("Please fill in required fields", {
          position: toast.POSITION.TOP_RIGHT,
          theme: "colored",
        });
      } else if (error.request) {
        toast.warning("Network error", {
          position: toast.POSITION.TOP_RIGHT,
          theme: "colored",
        });
      } else {
        console.error(error);
      }
    }  
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
  setLoadingImage1(true); // Set loading state
  const myFiles = e.target.files[0];
  await uploadFile(myFiles, config)
    .then((data) => {
      setSelectImage(data.location);
      setLoadingImage1(false); // Clear loading state
    })
    .catch((err) => {
      console.error(err);
      setLoadingImage1(false); // Clear loading state
    });
};


  // 2nd image function
  const uploadImage2 = async (e) => {
    e.preventDefault();
    // let image_urls = []
    setLoadingImage2(true);
    const myFiles = e.target.files[0];
    await uploadFile(myFiles, config)
      .then((data) => {
        setSelectImage2(data.location);
        setLoadingImage2(false)
      })
      .catch((err) => {
        console.error(err)
        setSelectImage2(false)
      });
  };

  // 3rd image function
  const uploadImage3 = async (e) => {
    e.preventDefault();
    // let image_urls = []
    setLoadingImage3(true)
    const myFiles = e.target.files[0];
    await uploadFile(myFiles, config)
      .then((data) => {
        setSelectImage3(data.location);
        setLoadingImage3(false)
      })
      .catch((err) => {
        console.error(err)
        setLoadingImage3(false)
      });
  };

  // 4th image function
  const uploadImage4 = async (e) => {
    e.preventDefault();
    // let image_urls = []
    setLoadingImage4(true)
    const myFiles = e.target.files[0];
    await uploadFile(myFiles, config)
      .then((data) => {
        setSelectImage4(data.location);
        setLoadingImage4(false)
      })
      .catch((err) =>{
         console.error(err)
          setLoadingImage4(false)
        });
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
                {loadingImage1 && <div>Loading...</div>} 
                {/* {field_error.images ? <span>{field_error?.images[0]}</span> : '' } */}
              </Form.Group>

              <Form.Group as={Col} controlId="formGridUploadImage2">
                <Form.Label>Upload Image 2nd</Form.Label>
                <Form.Control
                  type="file"
                  onChange={uploadImage2}
                  placeholder="Please upload your image here"
                />
                { loadingImage2 && <div>Loading...</div> }
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
                { loadingImage3 && <div>Loading...</div> }
              </Form.Group>

              <Form.Group as={Col} controlId="formGridUploadImage4">
                <Form.Label>Upload Image 4th</Form.Label>
                <Form.Control
                  type="file"
                  onChange={uploadImage4}
                  placeholder="Please upload your image here"
                />
                { loadingImage4 && <div>Loading...</div> }
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
                {/* <Form.Select
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
                </Form.Select> */}
                <Form.Select
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
              <Form.Group as={Col} controlId="formGridWeight">
                <Form.Label>Weight</Form.Label>
                <Form.Control
                  type="number"
                  name="weight"
                  placeholder="Weight"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
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
