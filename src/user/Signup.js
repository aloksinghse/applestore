import React, { useState } from "react";
import Base from "../core/Base";
import { signup } from "../auth/helper";
import { Link } from "react-router-dom";

const Signup = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    error: "",
    success: false,
  });
  const { name, email, password, error, success } = values;

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: "", name: event.target.value });
  };

  const signUpForm = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-md-3 text-left">
          <form>
            <div className="form-group">
              <label className="">Name</label>
              <input
                className="form-control"
                onChange={handleChange("name")}
                type="text"
                name="name"
                id="name"
              />
            </div>
            <div className="form-group">
              <label className="">Email</label>
              <input
                className="form-control"
                onChange={handleChange("email")}
                type="email"
                name="email"
                id="email"
              />
            </div>
            <div className="form-group">
              <label className="">Password</label>
              <input
                className="form-control"
                onChange={handleChange("password")}
                type="password"
                name="password"
                id="password"
              />
            </div>
            <button className="btn btn-success btn-block" onClick={onSubmit}>
              Submit
            </button>
          </form>
        </div>
      </div>
    );
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false });
    signup({ name, email, password })
      .then((data) => {
        if (data.error) {
          setValues({ ...values, error: data.error });
        } else {
          setValues({
            name: "",
            email: "",
            password: "",
            error: "",
            success: true,
          });
        }
      })
      .catch(console.log("Error in signup"));
  };

  const successMessage = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <div
            className="alert alert-success"
            style={{ display: success ? "" : "none" }}
          >
            New account was created successfully. Please{" "}
            <Link to="/signin">Login Here</Link>
          </div>
        </div>
      </div>
    );
  };

  const errorMessage = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <div
            className="alert alert-danger"
            style={{ display: error ? "" : "none" }}
          >
            {error}
          </div>
        </div>
      </div>
    );
  };

  return (
    <Base title="Sign up page" description="A page for user to sign up!">
      {successMessage()}
      {errorMessage()}
      {signUpForm()}
      <p className=" text-center">{JSON.stringify(values)}</p>
    </Base>
  );
};

export default Signup;
