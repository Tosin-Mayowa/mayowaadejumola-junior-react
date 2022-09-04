import React from "react";
import { connect } from "react-redux";
import "./CartsModal.css";

class CartsModal extends React.Component {
  render() {
    const { index, carts } = this.props;
    const swatchItems = ["DivG", "DivC", "DivB", "DivBl", "DivW"];

    return (
      <>
      
        <div className="CartWrapper">
          <h2 className="BagHeader">
            `My Bag, {this.props.carts.length} items`
          </h2>
          {carts?.map((cart) => (
            <div className="Bag" key={cart.id}>
              <div>
                <p> {cart.name}</p>
                <p>{`${cart.prices[index].currency.symbol}${cart.prices[index].amount}`}</p>
                <div className="AttMainDivWrap">
                  {cart.attributes.map((att) => {
                    if (att.type === "swatch") {
                      return (
                        <div key={att.id} className="AttMainDiv">
                          <p>{att.name}</p>
                          <div className="AttItemwrapper">
                            {swatchItems.map((item) => (
                              <div key={item} className={item}></div>
                            ))}
                          </div>
                        </div>
                      );
                    } else {
                      return (
                        <div key={att.id} className="AttMainDiv">
                          <p>{att.name}</p>
                          <div className="AttItemwrapper">
                            {att.items.map((item) => (
                              <div key={item.id} className="AttItem">
                                {item.value}
                              </div>
                            ))}
                          </div>
                        </div>
                      );
                    }
                  })}
                </div>
              </div>
              <div
                className={
                cart.attributes.length === 0 ? "Control" : "ControlBtn"
                }
              >
                <div className="BtnSy">+</div>
                <div className="Counter">1</div>
                <div className="BtnSy">-</div>
              </div>
              <div>
                <img src={cart.gallery[0]} alt="product" className="Image" />
              </div>
            </div>
          ))}
          <div className="Cart-Total">
            <p>Total</p>
            <p>Nyyyy</p>
          </div>
          <div className="Button">
            <button className="Btn-view">VIEW BAG</button>
            <button className="Btn-view Left">CHECK OUT</button>
          </div>
        </div>
       
      </>
    );
  }
}

function mapStateToProps(state) {
  const { carts, index } = state;
  return { carts: carts, index: index };
}

export default connect(mapStateToProps)(CartsModal);
