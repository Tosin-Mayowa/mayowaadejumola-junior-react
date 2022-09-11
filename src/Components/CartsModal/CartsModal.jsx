import React from "react";
import { connect } from "react-redux";
import "./CartsModal.css";
import { withRouter } from "../../withRouter";
class CartsModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cartsItem: Array.from(this.props.carts, (x, i) => ({
        ...x,
        isClick: false,
        total: x.prices[this.props.index].amount,
      })),
      totalAmount: 0,
      active: false,
    };
    this.handleIncrease = this.handleIncrease.bind(this);
    this.handleDecrease = this.handleDecrease.bind(this);
    this.navigatePage = this.navigatePage.bind(this);
  }

  handleIncrease(id, ind) {
    const newItems = this.state.cartsItem.map((item) => {
      if (id === item.id) {
        return {
          ...item,
          isClick: true,
          qty: item.qty + 1,
          total:
            item.qty + 1 >= 3
              ? (item.total / item.qty) * (item.qty + 1)
              : (item.qty + 1) * item.total,
        };
      } else {
        return item;
      }
    });
    const totalVal = newItems
      .map((item) => item.total)
      .reduce((a, b) => a + b, 0)
      .toFixed(2);

    this.setState((st) => {
      return {
        cartsItem: newItems,
        totalAmount: st.total === 0 ? st.totalAmount + totalVal : totalVal,
        active: true,
      };
    });
  }

  handleDecrease(id) {
    const newItems = this.state.cartsItem.map((item) => {
      if (id === item.id) {
        return {
          ...item,
          isClick: true,
          qty: item.qty > 1 ? item.qty - 1 : 1,
          total:
            item.qty > 1
              ? (item.total / item.qty) * (item.qty - 1)
              : item.total / item.qty,
        };
      } else {
        return item;
      }
    });

    const totalVal = newItems
      .map((item) => item.total)
      .reduce((a, b) => a + b, 0)
      .toFixed(2);

    this.setState((st) => {
      return {
        cartsItem: newItems,
        totalAmount: st.total === 0 ? st.totalAmount + totalVal : totalVal,
        active: true,
      };
    });
  }

  navigatePage() {
    this.props.navigate("/cartPage");
  }

  render() {
    const { index, initialTotal } = this.props;
    const swatchItems = ["DivG", "DivC", "DivB", "DivBl", "DivW"];
    const currency = ["$", "£", "A$", "¥", "₽"];
    const { active, cartsItem, totalAmount } = this.state;
    const price = `${currency[index]}${totalAmount}`;
    const initialPrice = `${currency[index]}${initialTotal}`;

    return (
      <>
        <div className="CartWrapper">
          <h2 className="BagHeader">
            `My Bag, {this.props.carts.length} items`
          </h2>
          {cartsItem?.map((cart) => (
            <div className="Bag">
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
              <div className="Control">
                <div>
                  <div
                    className="BtnSy"
                    onClick={() => this.handleIncrease(cart.id, index)}
                  >
                    +
                  </div>
                  <div className="Counter">{cart.qty}</div>
                  <div
                    className="BtnSy"
                    onClick={() => this.handleDecrease(cart.id, index)}
                  >
                    -
                  </div>
                </div>
                <div>
                  <img src={cart.gallery[0]} alt="product" className="Image" />
                </div>
              </div>
              
            </div>
          ))}
          <div className="Cart-Total">
            <p>Total</p>
            <p>{active ? price : initialPrice}</p>
          </div>
          <div className="Button">
            <button className="Btn-view" onClick={this.navigatePage}>
              VIEW BAG
            </button>
            <button className="Btn-view Left">CHECK OUT</button>
          </div>
        </div>
      </>
    );
  }
}

function mapStateToProps(state) {
  const { carts, index, initialTotal } = state;
  return { carts: carts, index: index, initialTotal: initialTotal };
}

export default withRouter(connect(mapStateToProps)(CartsModal));
