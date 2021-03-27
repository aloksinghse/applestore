import React, { useState } from "react";
import Base from "../core/Base";
import { isAuthenticated } from "../auth/helper";
import { Link } from "react-router-dom";
import { createCategory } from "./helper/adminapicall";

const AddCategory = () => {
  const [name, setName] = useState();
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

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

  const handleChange = (event) => {
    setError("");
    setName(event.target.value);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setError("");
    setSuccess(false);
    createCategory(user._id, token, { name })
      .then((data) => {
        if (data.error) {
          setError(data.error);
        } else {
          setError("");
          setSuccess(true);
          setName("");
        }
      })
      .catch((err) => console.log(err));
  };

  const successMessage = () =>
    success && (
      <div className="alert alert-info">Category Successfully Created.</div>
    );

  const errorMessage = () =>
    error && <div className="alert alert-danger">{error}</div>;

  const myCategoryForm = () => {
    return (
      <form>
        <div className="form-group">
          <label className="">Name :</label>
          <input
            type="text"
            className="form-control"
            onChange={handleChange}
            value={name}
            autoFocus
            required
            placeholder="For Ex. Summer"
          />
        </div>
        <button
          className="btn btn-outline btn-success btn-lg"
          onClick={onSubmit}
        >
          Submit
        </button>
      </form>
    );
  };

  return (
    <Base
      title="Create Category"
      description="Add a new category here"
      className="container p-4"
    >
      <div className="row bg-white rounded">
        <div className="col-md-8 offset-md-2 py-4">
          {goBack()}
          {successMessage()}
          {errorMessage()}
          {myCategoryForm()}
        </div>
      </div>
    </Base>
  );
};

export default AddCategory;
