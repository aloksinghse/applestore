import React, {useEffect, useState} from "react";
import "../styles.css";
import Base from "./Base";

export default function Cart() {
  //  const API = "http://127.0.0.1:8000/api";
   // const API = "http://rajdhaniwap.test/api";
    const API = "http://rajdhaniwap.test";
    const [categories, setCategories] = useState({});
    const [allpages, setAllpages] = useState();

    const [error, setError] = useState("");
    const [reload, setReload] = useState(false);

    const loadCategories = () => {

        return fetch(`${API}/products`)
            .then((data) => {
                if (data.error) {
                    console.log(data.error);
                } else {
                    return data.json();
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }

    const getAllPage = (url) => {
let finalUrl = `${API}/get-category-pages/?url=${url}`;
console.log('URL : ' + finalUrl);
        return fetch(finalUrl,{
            method:'GET',
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
        })
            .then((data) => {
                if (data.error) {
                    console.log(data.error);
                    //return 0;
                } else {
                  //  return data.json();
                    let dat = data.json();
                   // setAllCategoryPages(dat.data);
                    console.log("DATA : " + dat.data);
                   // console.log("SAVED : " + allCategoryPages);
                }
            })
            .catch((error) => {
                console.log(error);
               // return 0;
            });
    }


    const getProductss = (url) => {

        let finalUrl = `${API}/get-category-pages/?url=${url}`;
        console.log(finalUrl);
        return fetch(finalUrl)
            .then((data) => {
                if (data.error) {
                    console.log(data.error);
                } else {
                    return data;
                }
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const loadAllProducts = (url) => {
        getProductss(url).then((data) => {
            if (data.error) {
                setError(data.error);
                console.log(error);
            } else {
              //  setAllpages(data);
               console.log("DATA : " );
                console.log(data.data);
            }
        });
    };

    useEffect(() => {
     //   setCategories(loadCategories());
        loadAllProducts('https://bhojpurilove.in/bhojpuri-album-mp3-2019/b/2/default/1.html');
        // console.log(products);
    }, []);

    return (
        <Base
            title="Product Cart"
            className="container"
            description="All Selected Items for purchase"
        >
          {/*  <div className="row">
                <div className="col-12">
                    {allCategoryPages.length === 0 ? (
                        <p>Category is empty.</p>
                    ) : (
                        <div>
                            {allCategoryPages.map((categoryLink) => {
                                return(
                                    <div>
                                        {categoryLink}
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            </div>*/}
        </Base>
    );
}
