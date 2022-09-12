import React from "react";
import { connect } from "react-redux";
import { isCloseSwitcher } from "../../redux/action";
import AllProductsChild from "../AllProductsChild/AllProductsChild";
import "./All.css";



class AllProducts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allProducts: Array.from(this.props.allProducts.products, (x, i) => ({
        ...x,
        isHovered: false,
        idx: i,
      })),
    };
    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
  }

  handleMouseEnter(id) {
    const products = this.state.allProducts.map((item) => {
      if (item.idx === id) {
        return { ...item, isHovered: true };
      } else {
        return item;
      }
    });

    this.setState((st) => {
      return {
        allProducts: products,
      };
    });
  }

  handleMouseLeave(id) {
    const products = this.state.allProducts.map((item) => {
      if (item.idx === id) {
        return { ...item, isHovered: false };
      } else {
        return item;
      }
    });

    this.setState((st) => {
      return {
        allProducts: products,
      };
    });
  }

  render() {
    const { allProducts } = this.state;
    const { name } = this.props.allProducts;

    return (
      <>
      <div className="AllProductsWrapper" onClick={()=>this.props.isCloseSwitcher()}>
        <h2 className="Title">{name}</h2>
        <div className="AllParentDiv">
          {allProducts?.map((products) => (
            <AllProductsChild
              key={products.id}
              products={products}
              index={this.props.index}
              handleMouseEnter={this.handleMouseEnter}
              handleMouseLeave={this.handleMouseLeave}
            />
          ))}
        </div>
        </div>
      </>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    
    isCloseSwitcher:()=>dispatch(isCloseSwitcher()),
    
  };
};

function mapStateToProps(state) {
  const { index } = state;
  return { index: index };
}


export default connect(mapStateToProps,mapDispatchToProps)(AllProducts);
