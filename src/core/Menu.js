import React, { useState } from "react";
import { Link, useHistory, withRouter } from "react-router-dom";
import { signout, isAuthenticated } from "../auth/helper";
import { cartItemCount } from "./helper/cartHelper";

const currentTabClass = (history, path) => {
  if (history.location.pathname === path) {
    return "nav-link active";
  } else {
    return "nav-link";
  }
};

const Menu = (history) => {
  let history2 = useHistory();
  const [user, setUser] = useState(
    isAuthenticated() ? isAuthenticated() : false
  );

  function navLink(slug, name, icon) {
    function showicon() {
      if (icon) {
        return <i className={icon} />;
      }
    }
    return (
      <li className="nav-item">
        <Link className={currentTabClass(history, slug)} to={slug}>
          {showicon()} {name}
        </Link>
      </li>
    );
  }

  return (
    <div className="container-fluid sticky-top p-0 shadow-sm bg-dark">
      <nav className="container navbar navbar-expand-md navbar-dark">
        <Link className="navbar-brand" to="/">
          Apple Store
        </Link>

        <span className="navbar-nav mr-auto"></span>
        <ul className="navbar-nav d-md-none mr-2">
          {user ? (
            <li className="nav-item">
              <Link className={currentTabClass(history, "/cart")} to="/cart">
                <i className="fa fa-shopping-cart" /> Cart
                {cartItemCount() >= 1 ? (
                  <span className="badge badge-warning lblCount ml-2">
                    {cartItemCount()}
                  </span>
                ) : (
                  ""
                )}
              </Link>
            </li>
          ) : (
            ""
          )}
        </ul>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <span className="navbar-nav mr-auto"></span>
          <ul className="navbar-nav">
            {navLink("/", "Home", "fa fa-home")}
            {user
              ? navLink("/user/dashboard", "User Dashboard", "fa fa-dashboard")
              : ""}

            {user ? (
              <li className="nav-item d-none d-md-block">
                <Link className={currentTabClass(history, "/cart")} to="/cart">
                  <i className="fa fa-shopping-cart" /> Cart
                  {cartItemCount() >= 1 ? (
                    <span className="badge badge-warning lblCount ml-2">
                      {cartItemCount()}
                    </span>
                  ) : (
                    ""
                  )}
                </Link>
              </li>
            ) : (
              ""
            )}

            {user && user.user.role === 1
              ? navLink(
                  "/admin/dashboard",
                  "Admin Dashboard",
                  "fa fa-dashboard"
                )
              : ""}
            {user ? "" : navLink("/signup", "Sign Up", "fa fa-signup")}
            {user ? "" : navLink("/signin", "Sign In", "fa fa-sign-in")}

            {isAuthenticated() && (
              <li className="nav-item">
                <span
                  className="nav-link text-warning"
                  onClick={() => {
                    signout(() => {
                      history2.push("/");
                    });
                  }}
                >
                  Signout
                </span>
              </li>
            )}

            {/*{isAuthenticated() && (
              <li className="nav-item">
                <button
                  className="nav-link btn btn-warning"
                  onClick={() => {
                    signout(() => {
                      history.push("/");
                    });
                  }}
                >
                  <i className="fa fa-sign-out" /> Sign Out
                </button>
              </li>
            )}*/}
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default withRouter(Menu);
