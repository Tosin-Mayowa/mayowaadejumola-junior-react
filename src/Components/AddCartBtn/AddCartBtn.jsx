import React from "react";
import Surface from "../Image/Surface.png";
import Cart from "../Image/Vector.png";
import Dot from "../Image/Vect.png";
import "./AddCartBtn.css";
import { connect } from "react-redux";
import { addToCart } from "../../redux/action";

class AddCartBtn extends React.Component {
  render() {
    const { products } = this.props;
    console.log({ cartbtn: products });

    return (
      <div
        className={
          products.isHovered && products.inStock === true
            ? "AllCartsDivHover"
            : "AllCartsDivOutOfStock"
        }
        onClick={() => this.props.addToCart(products)}
      >
        <img src={Surface} alt="surface" />
        <div className="CartDiv">
          <img src={Cart} alt="cart" />
          <div className="Dot">
            <img src={Dot} alt="dot" />
            <img src={Dot} alt="dot" className="RDot" />
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addToCart: (cart) => dispatch(addToCart(cart)),
  };
};

export default connect(null, mapDispatchToProps)(AddCartBtn);
