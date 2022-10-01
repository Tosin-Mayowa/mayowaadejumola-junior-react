import React from "react";
import { connect } from "react-redux";
import { removeProduct } from "../../redux/action";
import "./CartPage.css";
import Rectangle from "../Image/Rectangle.png";
import Slide from "../Image/slide.png";
import Slide1 from "../Image/slide1.png";
import { withRouter } from "../../withRouter";
class CartPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cartsItem: Array.from(
        this.props.pageCart.length === 0
          ? this.props.carts
          : this.props.pageCart,
        (x, i) => ({
          ...x,
          isClick: false,
          total: x.prices[this.props.index].amount,
          count: 0,
        })
      ),
      totalAmount: 0,
      active: false,
    };
    this.handleIncrease = this.handleIncrease.bind(this);
    this.handleDecrease = this.handleDecrease.bind(this);

    this.formatText = this.formatText.bind(this);
    this.getPrefixText = this.getPrefixText.bind(this);
    this.decreaseSlideCount = this.decreaseSlideCount.bind(this);
    this.increaseSlideCount = this.increaseSlideCount.bind(this);
  }

  handleIncrease(dispVal, ind) {
    const newItems = this.state.cartsItem.map((item) => {
      if (item.attributes[0].value === dispVal) {
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

  handleDecrease(dispVal) {
   
    const newItems = this.state.cartsItem.map((item) => {
      if (item.attributes[0].value === dispVal) {
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

  formatText(text) {
    const indexSlice = text.indexOf(" ");
    return text.slice(indexSlice);
  }

  getPrefixText(text) {
    const indexSlice = text.indexOf(" ");
    const indexSlice2 = text.lastIndexOf(" ");
    const newText =
      indexSlice === -1
        ? text
        : indexSlice === indexSlice2
        ? text.slice(0, indexSlice + 1)
        : text.slice(0, indexSlice);
    return newText;
  }

  decreaseSlideCount(value, dispVal) {
    const newItems = this?.state?.cartsItem?.map((item) => {
      if (item.attributes[0].value === dispVal) {
        return { ...item, count: item.count !== 0 ? item.count - 1 : 0 };
      } else {
        return item;
      }
    });

    this.setState((st) => {
      return {
        cartsItem: newItems,
        totalAmount: st.totalAmount,
        active: st.active,
      };
    });
  }

  increaseSlideCount(value, dispVal) {
    const newItems = this?.state?.cartsItem?.map((item) => {
      if (item.attributes[0].value === dispVal) {
        return {
          ...item,
          count: item.count === 0 && value !== 0 ? item.count + 1 : value,
        };
      } else {
        return item;
      }
    });

    this.setState((st) => {
      return {
        cartsItem: newItems,
        totalAmount: st.totalAmount,
        active: st.active,
      };
    });
  }

  componentDidMount() {
    this.setState((st, props) => {
      return {
        cartsItem: Array.from(
          props?.pageCart.length === 0 ? props?.carts : props?.pageCart,
          (x, i) => ({
            ...x,
            isClick: false,
            total: x.prices[props.index].amount,
            count: 0,
          })
        ),
        totalAmount: 0,
        active: false,
      };
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps?.pageCart !== this.props?.pageCart ||
      prevProps?.cartsPage !== this.props.cartsPage
    ) {
      const value =
        this.props.pageCart.length === 0
          ? this.props.carts
          : this.props.pageCart;
      const totalVal = value
        .reduce((a, b) => a + b.prices[this.props.index].amount, 0)
        .toFixed(2);

      this.setState(() => {
        return {
          cartsItem: Array.from(
            this.props.pageCart.length === 0
              ? this.props.carts
              : this.props.pageCart,
            (x, i) => ({
              ...x,
              isClick: false,
              total: x.prices[this.props.index].amount,
              count: 0,
            })
          ),
          totalAmount: totalVal,
          active: true,
        };
      });
    }
  }

  render() {
    const { active, cartsItem, totalAmount } = this.state;
    const { index, initialTotal } = this.props;
    const currency = ["$", "£", "A$", "¥", "₽"];
    const price = `${currency[index]}${totalAmount}`;
    const pTax = ((21 * totalAmount) / 100).toFixed(2);
    const priceTax = `${currency[index]}${pTax}`;
    const initialPrice = `${currency[index]}${initialTotal}`;
    const iPriceTax = ((21 * initialTotal) / 100).toFixed(2);
    const initialPriceTax = `${currency[index]}${iPriceTax}`;
    console.log(cartsItem,'Cart');

    return (
      <>
        <div className="CartPageWrap">
          <h2 className="CartPageTitle">Cart</h2>
          {cartsItem?.map((cart) => (
            <div className="PageMainDiv" >
              <div className="PageAtt">
                <p className="CartPageSubTitle">
                  {this.getPrefixText(cart.name)}
                </p>
                <p className="CartNameText">
                  {this.formatText(cart.name).length < 5
                    ? ""
                    : this.formatText(cart.name)}
                </p>
                <p className="Price">{`${cart.prices[index].currency.symbol}${cart.prices[index].amount}`}</p>

                <div className="PageCartAttMainDivWrap">
                  {cart?.attributes.map((att) => {
                    if (att?.type === 'swatch') {
                      return (
                        <div key={att.name} className="PageCartAttMainDiv">
                          <p>{att.value}</p>
                          <div className="PageCartAttItemwrapper">
                            <div className={att.name}></div>
                          </div>
                        </div>
                      );
                    } else {
                      return (
                        <div className="Section-Att">
                          <div className="CartAttributeDiv">
                            <p className="CartPageNameAtt">{att.name}</p>
                            <div className="BoxOn">{att.value}</div>
                          </div>
                        </div>
                      );
                    }
                  })}
                </div>
              </div>

              <div className="Quantity-Control">
                <div className="Cart-Control">
                  <div
                    className="ContBtns"
                    onClick={() =>
                      this.handleIncrease(cart?.attributes[0]?.value, index)
                    }
                  >
                    +
                  </div>
                  <div className="Quantity">{cart.qty}</div>
                  <div
                    className="ContBtn"
                    onClick={() => {
                      console.log(cart?.attributes[0]?.value, "att.val");
                      cart.qty === 1
                        ? this.props.removeProduct(cart.attributes[0].value)
                        : this.handleDecrease(cart?.attributes[0]?.value);
                    }}
                  >
                    -
                  </div>
                </div>
                <div className="MainImageParent">
                  <img
                    src={cart.gallery[cart.count]}
                    alt="product"
                    className="ImageCart"
                  />
                  {cart.gallery.length > 1 ? (
                    <div className="VectorParent">
                      <div className="Vector">
                        <img src={Rectangle} alt="" />
                        <div
                          className="VectorChild"
                          onClick={() =>
                            this.decreaseSlideCount(
                              cart.gallery.length - 1,
                              cart?.attributes[0]?.value
                            )
                          }
                        >
                          <img src={Slide} alt="" />
                        </div>
                      </div>
                      <div
                        className="Vector2"
                        onClick={() =>
                          this.increaseSlideCount(
                            cart.gallery.length - 1,
                            cart?.attributes[0]?.value
                          )
                        }
                      >
                        <img src={Rectangle} alt="" />
                        <div className="VectorChild">
                          <img src={Slide1} alt="" />
                        </div>
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>
          ))}

          <div className="Total">
            <div className="Tax">
              <p className="Taxp">Tax 21%:</p>
              <p className="SpanAll Taxvalue">
                {active ? priceTax : initialPriceTax}
              </p>
            </div>

            <p className="Taxp">
              Quantity:
              <span className="SpanAll">
                {this.props.pageCart.length === 0
                  ? this.props.carts.length
                  : this.props.pageCart.length}
              </span>{" "}
            </p>
            <p className="Taxp">
              Total:<span className="Ext">{active ? price : initialPrice}</span>
            </p>
            <div className="Button">
              <button className="Cart-Btn-View" onClick={this.navigatePage}>
                order
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    // dispatching actions returned by action creators
    removeProduct: (id) => dispatch(removeProduct(id)),
  };
};

function mapStateToProps(state) {
  const { pageCart, carts, index, initialTotal, cartsPage } = state;
  return {
    carts: carts,
    pageCart: pageCart,
    index: index,
    initialTotal: initialTotal,
    cartsPage: cartsPage,
  };
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(CartPage)
);
