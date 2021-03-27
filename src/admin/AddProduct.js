import React, { useEffect, useState } from "react";
import Base from "../core/Base";
import { isAuthenticated } from "../auth/helper";
import { Link, Redirect } from "react-router-dom";
import { createProduct, getCategories } from "./helper/adminapicall";
import { API } from "../backend";

const AddProduct = () => {
  const [values, setValues] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    photo: "",
    categories: [],
    category: "",
    loading: false,
    error: "",
    createdProduct: "",
    getaRedirect: false,
    formData: "",
  });
  const {
    name,
    description,
    price,
    stock,
    photo,
    category,
    categories,
    loading,
    error,
    createdProduct,
    getaRedirect,
    formData,
  } = values;
  const [success, setSuccess] = useState(false);
  const [image, setImage] = useState("");

  const performRedirect = () => {
    if (getaRedirect) {
      return <Redirect to="/admin/dashboard" />;
    }
  };

  const preloadCategories = () => {
    getCategories()
      .then((data) => {
        if (data.error) {
          setValues({ ...values, error: data.error });
        } else {
          setValues({
            ...values,
            categories: data,
            formData: new FormData(),
          });
        }
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    preloadCategories();
  }, []);

  const { user, token } = isAuthenticated();

  const goBack = () => {
    return (
      <div className="py-4">
        <Link to="/admin/dashboard" className="btn btn-warning btn-outline">
          <i className="fa fa-backward" /> GO TO DASHBOARD
        </Link>
      </div>
    );
  };

  const handleChange = (name) => (event) => {
    event.preventDefault();
    const value = name === "photo" ? event.target.files[0] : event.target.value;
    if (name === "photo") {
      setImage(URL.createObjectURL(event.target.files[0]));
    }
    formData.set(name, value);
    setValues({ ...values, [name]: value });
  };

  const createProductForm = () => (
    <form>
      <img src={image} height={200} />
      <br />

      <span>Post photo</span>
      <div className="form-group">
        <label className="btn btn-block btn-success">
          <input
            onChange={handleChange("photo")}
            type="file"
            name="photo"
            accept="image"
            placeholder="choose a file"
          />
        </label>
      </div>
      <div className="form-group">
        <input
          onChange={handleChange("name")}
          name="name"
          className="form-control"
          placeholder="Name"
          value={name}
        />
      </div>
      <div className="form-group">
        <textarea
          onChange={handleChange("description")}
          name="description"
          className="form-control"
          placeholder="Description"
          value={description}
        />
      </div>
      <div className="form-group">
        <input
          onChange={handleChange("price")}
          type="number"
          className="form-control"
          placeholder="Price"
          value={price}
        />
      </div>
      <div className="form-group">
        <select
          onChange={handleChange("category")}
          className="form-control"
          placeholder="Category"
        >
          <option>Select</option>
          {categories &&
            categories.map((category) => {
              return (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              );
            })}
        </select>
      </div>
      <div className="form-group">
        <input
          onChange={handleChange("stock")}
          type="number"
          className="form-control"
          placeholder="Quantity"
          value={stock}
        />
      </div>

      <button
        type="submit"
        onClick={onSubmit}
        className="btn btn-outline-success"
      >
        Create Product
      </button>
    </form>
  );

  const onSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, loading: true });
    createProduct(user._id, token, formData)
      .then((data) => {
        if (data.error) {
          setValues({ ...values, loading: false, error: data.error });
        } else {
          setValues({
            ...values,
            name: "",
            description: "",
            price: "",
            stock: "",
            photo: "",
            category: "",
            loading: false,
            error: "",
            createdProduct: data.name,
            getaRedirect: true,
            formData: "",
          });
        }
      })
      .catch((err) => console.log(err));
  };

  const successMessage = () =>
    success && (
      <div className="alert alert-info">
        {createdProduct} Product Successfully Created.
      </div>
    );

  const errorMessage = () =>
    error && <div className="alert alert-danger">{error}</div>;

  return (
    <Base
      title="Create Product"
      description="Add a new Product here"
      className="container p-4"
    >
      <div className="row bg-white rounded">
        <div className="col-md-8 offset-md-2 py-4">
          {goBack()}
          {performRedirect()}
          {successMessage()}
          {errorMessage()}
          {createProductForm()}
        </div>
      </div>
    </Base>
  );
};

export default AddProduct;
