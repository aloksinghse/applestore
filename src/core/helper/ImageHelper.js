import { API } from "../../backend";
import React, { useEffect, useState } from "react";

const ImageHelper = ({
  productId,
  className = "rounded border border-success mb-3 rounded",
}) => {
  const [image, setImage] = useState(null);

  const preload = () => {
    let url =
      "https://images.pexels.com/photos/3561339/pexels-photo-3561339.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940";
    if (productId) {
      url = `${API}/product/photo/${productId}`;
    }
    setImage(url);
  };

  useEffect(() => {
    preload();
  }, []);

  return (
    <div className={"rounded border border-success mb-3 rounded " + className}>
      <img
        src={image}
        alt="photo"
        style={{ maxHeight: "100%", maxWidth: "100%" }}
        className=""
      />
    </div>
  );
};

export default ImageHelper;
