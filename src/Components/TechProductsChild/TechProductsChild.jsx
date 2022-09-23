import React from "react";
import "./TechProductsChild.css";
import { Link } from "react-router-dom";
import AddCartBtn from "../AddCartBtn/AddCartBtn";

class TechProductsChild extends React.Component {
  render() {
    const { products, handleMouseEnter, handleMouseLeave, index } = this.props;

    return (
      <>
        <div
          key={products.id}
          className={
            products.inStock === true && products.attributes.length !== 0
              ? "TechinnerDiv"
              : "TechinnerDivOutStock"
          }
          onMouseEnter={() => handleMouseEnter(products.idx)}
          onMouseLeave={() => handleMouseLeave(products.idx)}
        >
          <div
            className={
              products.inStock === true ? "TechHideOutOfStock" : "TechShowOutOfStock"
            }
          >
            <p>OUT OF STOCK</p>
          </div>
          <div className="TechImageDiv">
           
              <Link to={`/${products.category}/${products.id}`}>
                <img
                  src={products.gallery[0]}
                  alt={products.name}
                  className="TechImage"
                />
              </Link>
            
          </div>
          <h2
            className={
              products.inStock === true ? "TechText" : "TechTextOutOfStock"
            }
          >
            {" "}
            {products.name}
          </h2>
          <h3
            className={
              products.inStock === true
                ? "TechPriceTag"
                : "TechPriceTagOutOfStock"
            }
          >{`${products.prices[index].currency.symbol}${products.prices[index].amount}`}</h3>
          <AddCartBtn products={products} />
        </div>
      </>
    );
  }
}
export default TechProductsChild;
