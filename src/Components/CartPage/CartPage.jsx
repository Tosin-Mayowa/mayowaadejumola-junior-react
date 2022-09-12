import React from "react";
import { connect } from "react-redux";
import "./CartPage.css";
import { withRouter } from "../../withRouter";
import ProductDescriptionChild from "../ProductsDescriptionChild/ProductDescriptionChild";
import Rectangle from "../Image/Rectangle.png";
import Slide from "../Image/slide.png";
import Slide1 from "../Image/slide1.png";

class CartPage extends React.Component {
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
      count:0
    };
    this.handleIncrease = this.handleIncrease.bind(this);
    this.handleDecrease = this.handleDecrease.bind(this);
    this.navigatePage = this.navigatePage.bind(this);
    this.formatText = this.formatText.bind(this);
    this.getPrefixText = this.getPrefixText.bind(this);
    this.decreaseSlideCount=this.decreaseSlideCount.bind(this);
    this.increaseSlideCount=this.increaseSlideCount.bind(this);
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
        count:st.count
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
        count:st.count
      };
    });
  }

  navigatePage() {
    this.props.navigate("/cartPage");
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
  
  decreaseSlideCount(value){
    this.setState({count:this.state.count!==0?this.state.count-1:0})
  }

  increaseSlideCount(value){
    this.setState((st)=>{
      return{
        cartsItem:st.cartsItem,
        totalAmount: st.totalAmount,
      active: st.active,
        count:st.count===0 || st.count<value?st.count+1:value
      }
    })
  }


  render() {
    const { index, initialTotal } = this.props;
    const swatchItems = ["CDivG", "CDivC", "CDivB", "CDivBl", "CDivW"];
    const currency = ["$", "£", "A$", "¥", "₽"];
    const { active, cartsItem, totalAmount } = this.state;
    const price = `${currency[index]}${totalAmount}`;
    const pTax = ((21 * totalAmount) / 100).toFixed(2);
    const priceTax = `${currency[index]}${pTax}`;
    const initialPrice = `${currency[index]}${initialTotal}`;
    const iPriceTax = ((21 * initialTotal) / 100).toFixed(2);
    const initialPriceTax = `${currency[index]}${iPriceTax}`;
    console.log({ count: this.state.count });

    return (
      <>
        <div className="CartPageWrap">
          <h2 className="CartPageTitle">Cart</h2>
          <div className="Horizontal"></div>
          {cartsItem?.map((cart) => (
            <>
              <div className="CartPageMainDiv">
                <div>
                  <p className="CartPageSubTitle">
                    {this.getPrefixText(cart.name)}
                  </p>
                  <p className="CartNameText">
                    {this.formatText(cart.name).length < 5
                      ? ""
                      : this.formatText(cart.name)}
                  </p>
                  <p className="Price">{`${cart.prices[index].currency.symbol}${cart.prices[index].amount}`}</p>
                  <div className="Attribute">
                    {cart?.attributes?.map((att) => {
                      if (att.type === "swatch") {
                        return (
                          <div key={att.id} className="CartAttributeDiv">
                            <p className="CartPageNameAtt">{att.name}</p>
                            <div className="CartAttItemwrapper">
                              {swatchItems?.map((item) => (
                                <div key={item} className={item}></div>
                              ))}
                            </div>
                          </div>
                        );
                      } else {
                        return <ProductDescriptionChild att={att} />;
                      }
                    })}
                  </div>
                </div>
                <div className="Quantity-Control">
                  <div className="Cart-Control">
                    <div
                      className="ContBtns"
                      onClick={() => this.handleIncrease(cart.id, index)}
                    >
                      +
                    </div>
                    <div className="Quantity">{cart.qty}</div>
                    <div
                      className="ContBtn"
                      onClick={() => this.handleDecrease(cart.id, index)}
                    >
                      -
                    </div>
                  </div>
                  <div className="MainImageParent">
                    <img
                      src={cart.gallery[this.state.count]}
                      alt="product"
                      className="ImageCart"
                    />
                    <div className="VectorParent">
                      <div className="Vector">
                        <img src={Rectangle} alt="" />
                        <div className="VectorChild" onClick={()=>this.decreaseSlideCount(cart.gallery.length-1)}>
                          <img src={Slide} alt="" />
                        </div>
                      </div>
                      <div className="Vector2" onClick={()=>this.increaseSlideCount(cart.gallery.length-1)}>
                        <img src={Rectangle} alt="" />
                        <div className="VectorChild">
                          <img src={Slide1} alt="" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="Horizontal"></div>
            </>
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
              <span className="SpanAll">{this.props.carts.length}</span>{" "}
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
function mapStateToProps(state) {
  const { carts, index, initialTotal } = state;
  return { carts: carts, index: index, initialTotal: initialTotal };
}

export default withRouter(connect(mapStateToProps)(CartPage));
