import React from "react";
import { connect } from "react-redux";
import { isCloseSwitcher} from "../../redux/action";
import TechProductsChild from "../TechProductsChild/TechProductsChild";
import "./TechProducts.css";

class TechProducts extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      techProducts: Array.from(this.props.techProducts.products, (x, i) => ({
        ...x,
        isHovered: false,
        idx: i,
      })),
    };
    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
  }

  handleMouseEnter(id) {
    const products = this.state.techProducts.map((item) => {
      if (item.idx === id) {
        return { ...item, isHovered: true };
      } else {
        return item;
      }
    });

    this.setState((st) => {
      return {
        techProducts: products,
      };
    });
  }

  handleMouseLeave(id) {
    const products = this.state.techProducts.map((item) => {
      if (item.idx === id) {
        return { ...item, isHovered: false };
      } else {
        return item;
      }
    });

    this.setState((st) => {
      return {
        techProducts: products,
      };
    });
  }

  render() {
    const { techProducts } = this.state;
    const { name } = this.props.techProducts;
   

    return (
      <>
      <div className="TechWrapper" onClick={()=>this.props.isCloseSwitcher()}>
        <h2 className="Title">{name}</h2>
        <div className="AllParentDiv">
          {techProducts?.map((products) => (
            <TechProductsChild
              key={products.id}
              index={this.props.index}
              products={products}
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

export default connect(mapStateToProps,mapDispatchToProps)(TechProducts);
