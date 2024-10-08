import React, { useEffect, useState } from "react";
import AltText from "@utils/altText.txt";
import webImage from '../../assets/webpack_react.png';

const Home = () => {
  const [product, setProduct] = useState([]);
  const [isDataLoaded, setIsDataLoaded] = useState(false); // Track data load status

  const fetchData = async () => {
    const response = await fetch(process.env.API_URL);
    const data = await response.json();
    setProduct(data.products.slice(0, 10));
    setIsDataLoaded(true); // Set data loaded to true once the API fetch is complete
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <h3>Product list</h3>
      <div className="ProductContainer">
        {product.map((curr, index) => {
          return (
            <div className="productDiv" key={index}>
              <img alt={curr.title || AltText} src={curr.images[0]} />
              <span>{curr.title} - {curr.category.toUpperCase()}</span>
            </div>
          );
        })}
      </div>

      {isDataLoaded && (
        <div className="webImageDiv">
          <img src={webImage} alt="Webpack in React" />
        </div>
      )}
    </>
  );
};

export default Home;