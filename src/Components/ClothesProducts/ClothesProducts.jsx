import React from "react";
import { connect } from "react-redux";
import ClothesProductsChild from "../ClothesChild/ClothesProductsChild";
import "./Clothes.css";

class ClothesProducts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clothesProducts: Array.from(
        this.props.clothesProducts.products,
        (x, i) => ({ ...x, isHovered: false, idx: i })
      ),
    };
    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
  }

  handleMouseEnter(id) {
    const products = this.state.clothesProducts.map((item) => {
      if (item.idx === id) {
        return { ...item, isHovered: true };
      } else {
        return item;
      }
    });

    this.setState((st) => {
      return {
        clothesProducts: products,
      };
    });
  }

  handleMouseLeave(id) {
    const products = this.state.clothesProducts.map((item) => {
      if (item.idx === id) {
        return { ...item, isHovered: false };
      } else {
        return item;
      }
    });

    this.setState((st) => {
      return {
        clothesProducts: products,
      };
    });
  }

  render() {
    const { clothesProducts } = this.state;
    const { name } = this.props.clothesProducts;
    return (
      <>
        <h2 className="Title">{name}</h2>
        <div className="AllParentDiv">
          {clothesProducts?.map((products) => (
            <ClothesProductsChild
              key={products.id}
              products={products}
              index={this.props.index}
              handleMouseEnter={this.handleMouseEnter}
              handleMouseLeave={this.handleMouseLeave}
            />
          ))}
        </div>
      </>
    );
  }
}

function mapStateToProps(state) {
  const { index } = state;
  return { index: index };
}

export default connect(mapStateToProps)(ClothesProducts);
