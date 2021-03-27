import React, { useState } from "react";
import Menu from "./Menu";
import FadeIn from "./FadeIn";
//import ReactCSSTransitionGroup from 'react-transition-group';

const Base = ({
  title = "My Title",
  description = "My desription",
  className = "p-4",
  children,
}) => {
  return (
    <div className="/*position-relative*/">
      <Menu />
      <FadeIn delay={0} duration={1700}>
        <div className="container-fluid">
          <div className="{/*jumbotron bg-dark*/}  text-center pt-5">
            <h3 className="display-4">{title}</h3>
            <p className="lead">{description}</p>
          </div>
          <div className={className}>{children}</div>
        </div>
      </FadeIn>
      <div className="clear"></div>
      <footer className="footer bg-dark mt-auto">
        <div className="container-fluid bg-dark  text-center py-3">
          <div className="container">
            <h4>If you got any questions, feel free to reach out!</h4>
            <button className="btn btn-warning btn-lg">Contact Us</button>
          </div>
        </div>
        <div className="container-fluid py-3 bg-black">
          <div className="container">
            <span className="text-muted">
              An Amazing <span className="text-white">MERN</span> Bootcamp
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Base;
