import React, { useEffect, useState } from "react";
import Base from "../core/Base";
import { isAuthenticated } from "../auth/helper";
import { Link, Redirect } from "react-router-dom";
import {
  getCategories,
  getCategory,
  getProduct,
  updateCategory,
  updateProduct,
} from "./helper/adminapicall";

const UpdateCategory = ({ match }) => {
  const [values, setValues] = useState({
    name: "",
    description: "",
    loading: false,
    error: "",
    editedCategory: "",
    getRedirect: false,
    formData: "",
  });
  const {
    name,
    description,
    loading,
    error,
    editedCategory,
    getRedirect,
    formData,
  } = values;

  const [image, setImage] = useState("");

  const performRedirect = () => {
    if (getRedirect) {
      setTimeout(() => {
        return <Redirect to="/admin/categories" />;
      }, 2000);
    }
  };

  const preloadCategories = () => {
    getCategories()
      .then((data) => {
        if (data.error) {
          setValues({ ...values, error: data.error });
        } else {
          setValues({
            categories: data,
            formData: new FormData(),
          });
        }
      })
      .catch((error) => console.log(error));
  };

  const preloadCategory = (categoryId) => {
    getCategory(categoryId)
      .then((data) => {
        if (data.error) {
          setValues({ ...values, error: data.error });
        } else {
          preloadCategories();
          setValues({
            ...values,
            name: data.name,
            description: data.description,
            formData: new FormData(),
          });
        }
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    preloadCategory(match.params.categoryId);
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

  const editCategoryForm = () => (
    <form>
      {/* <img src={image} height={200} />
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
      </div>*/}
      <div className="form-group">
        <input
          onChange={handleChange("name")}
          name="name"
          className="form-control"
          placeholder="Name"
          value={name}
        />
      </div>
      {/*<div className="form-group">
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
          value={category}
        >
          <option>Select</option>
          {categories &&
            categories.map((cate) => {
              return (
                <option key={cate._id} value={cate._id}>
                  {cate.name}
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
      </div>*/}

      <button
        type="submit"
        onClick={onSubmit}
        className="btn btn-outline-success"
      >
        Update Category
      </button>
    </form>
  );

  const onSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, loading: true });

    updateCategory(match.params.categoryId, user._id, token, formData)
      .then((data) => {
        if (data.error) {
          setValues({ ...values, loading: false, error: data.error });
        } else {
          setValues({
            ...values,
            loading: false,
            error: "",
            editedCategory: data.name,
            getRedirect: true,
          });
        }
      })
      .catch((err) => console.log(err));
  };

  const successMessage = () => {
    if (editedCategory) {
      return (
        <div className="alert alert-info">
          {editedCategory} Successfully Updated.
        </div>
      );
    }
  };

  const errorMessage = () => {
    if (error) {
      return <div className="alert alert-info">{error}</div>;
    }
  };
  const loadingMessage = () => {
    if (loading) {
      return <div className="alert alert-info">Updating...</div>;
    }
  };

  return (
    <Base
      title="Update Category"
      description="Update a Category here"
      className="container p-4"
    >
      <div className="row bg-white rounded">
        <div className="col-md-8 offset-md-2 py-4">
          {goBack()}
          {performRedirect()}
          {successMessage()}
          {loadingMessage()}
          {errorMessage()}
          {editCategoryForm()}
        </div>
      </div>
    </Base>
  );
};

export default UpdateCategory;
