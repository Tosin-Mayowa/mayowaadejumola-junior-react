import React from "react";
import "./ClothesProductsChild.css";
import AddCartBtn from "../AddCartBtn/AddCartBtn";
import { Link } from "react-router-dom";

class ClothesProductsChild extends React.Component {
  render() {
    const { products, handleMouseEnter, handleMouseLeave, index } = this.props;

    return (
      <>
        <div
          key={products.id}
          className={
            products.inStock === true && products.attributes.length !==0 ? "ClothesinnerDiv" : "ClothesinnerDivOutStock"
          }
          onMouseEnter={() => handleMouseEnter(products.idx)}
          onMouseLeave={() => handleMouseLeave(products.idx)}
        >
          <div
            className={
              products.inStock === true ? "ClothesHideOutOfStock" : "ClothesShowOutOfStock"
            }
          >
            <p>OUT OF STOCK</p>
          </div>
          <div className="ClothesImageDiv">
         
              <Link to={`/${products.category}/${products.id}`}>
                <img
                  src={products.gallery[0]}
                  alt={products.name}
                  className="ClothesImage"
                />
              </Link>
            
          </div>
          <h2
            className={
              products.inStock === true  ? "ClothesText" : "ClothesTextOutOfStock"
            }
          >
            {products.name}
          </h2>
          <h3
            className={
              products.inStock === true
                ? "ClothesPriceTag"
                : "ClothesPriceTagOutOfStock"
            }
          >{`${products.prices[index].currency.symbol}${products.prices[index].amount}`}</h3>
          <AddCartBtn products={products} />
        </div>
      </>
    );
  }
}
export default ClothesProductsChild;
