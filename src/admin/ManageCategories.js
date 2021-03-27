import React, { useEffect, useState } from "react";
import Base from "../core/Base";
import { deleteCategory, getCategories } from "./helper/adminapicall";
import { isAuthenticated } from "../auth/helper";
import { Link } from "react-router-dom";

const ManageCategories = () => {
  const [categories, setCategories] = useState([]);

  const { user, token } = isAuthenticated();

  const preload = () => {
    getCategories().then((data) => {
      if (data?.error) {
        console.log(data.error);
      } else {
        setCategories(data);
      }
    });
  };

  useEffect(() => {
    preload();
  }, []);

  const deleteThisCategory = (categoryId) => {
    deleteCategory(categoryId, user._id, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        preload();
      }
    });
  };
  useEffect(() => {
    preload();
  }, []);

  return (
    <Base
      title="Manage Categories"
      description="All Category can be managed from here.."
      className="container"
    >
      <Link className="btn btn-info" to={`/admin/dashboard`}>
        <i className="fa fa-backward" /> <span className="">Admin Home</span>
      </Link>

      <div className="row">
        <div className="col-12">
          {categories.map((category, index) => {
            return (
              <div className="row text-center mb-2" key={category._id}>
                <div className="col-8">
                  <p className="text-white text-left">
                    {" "}
                    {index + 1}. {category.name}
                  </p>
                </div>
                <div className="col-4 text-center">
                  <Link
                    className="btn btn-success mr-3"
                    to={`/admin/category/update/${category._id}`}
                  >
                    <i className="fa fa-pencil" />{" "}
                    <span className="">Update</span>
                  </Link>

                  <button
                    onClick={() => {
                      deleteThisCategory(category._id);
                    }}
                    className="btn btn-danger"
                  >
                    <i className="fa fa-trash" /> Delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Base>
  );
};

export default ManageCategories;
