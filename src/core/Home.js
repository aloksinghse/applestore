import React, { useEffect, useState } from "react";
import "../styles.css";
import Base from "./Base";
import Card from "./Card";
import { getProducts } from "./helper/coreapicalls";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");
  const [reload, setReload] = useState(false);

  const loadAllProducts = () => {
    getProducts().then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setProducts(data);
      }
    });
  };

  useEffect(() => {
    loadAllProducts();

  }, []);

  return (
    <Base title="Home Page" className="container">
      <div className="">
        <h2>Featured Products</h2>
      </div>
      <div className="row text-center pb-4">
        {products.map((product,index) => {
          return (
            <div key={index} className="col-lg-3 col-md-4 col-sm-6 p-0">
              <div className="m-1 shadow rounded">
                <Card
                  key={index}
                  product={product}
                  setReload={setReload}
                  reload={reload}
                />
              </div>
            </div>
          );
        })}
      </div>
    </Base>
  );
}
