import React from "react";
import { connect } from "react-redux";
import "./CartsModal.css";
import { withRouter } from "../../withRouter";
import CartModalChild from "../CartModalChild/CartModalChild";
import { addFromModal, addToCartFromDesc, removeFromModal, removeProduct } from "../../redux/action";
import CartsModalSwatch from "../Swatch/CartsModalSwatch";
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
      attributes:[],
      isDisabled:true,
      swatchAttributes:[]
    };
    this.handleIncrease = this.handleIncrease.bind(this);
    this.handleDecrease = this.handleDecrease.bind(this);
    this.navigatePage = this.navigatePage.bind(this);
    this.getNewAtt=this.getNewAtt.bind(this);
    this.setDisabled=this.setDisabled.bind(this);
    this.getNewSwatchAtt=this.getNewSwatchAtt.bind(this)
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


  getNewSwatchAtt(arr){
   
    const attributeSet=arr.filter(att=>att.clicked===true);
    this.setState({  swatchAttributes: attributeSet});
  }
  getNewAtt(arr) {
    

    const attributeSet = arr.filter((att) => att.clicked === true);

    this.setState((st, props) => {
      return {
        attributes: [...st.attributes, ...attributeSet],
      };
    });
  }

  navigatePage() {
    this.props.navigate("/cartPage");
  }

  // navigatePageModal() {
  //   this.props.navigate("/PageFromModal");
  // }

  setDisabled(val){
    
    this.setState({ isDisabled: !val });
  }

  componentDidMount() {
    // this.getNewAtt(this.props.carts[0].attributes);
    // this.getNewSwatchAtt(this.props.carts[0].attributes)
    this.setState((st, props) => {
      return {
        cartsItem: Array.from(props.carts, (x, i) => ({
          ...x,
          isClick: false,
          total: x.prices[props.index].amount,
        })),
        totalAmount: 0,
        active: false,
      };
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.carts !== this.props.carts) {
      const totalVal = this.props.carts
        .reduce((a, b) => a + b.prices[this.props.index].amount, 0)
        .toFixed(2);
      this.setState(() => {
        return {
          cartsItem: Array.from(this.props.carts, (x, i) => ({
            ...x,
            isClick: false,
            total: x.prices[this.props.index].amount,
          })),
          totalAmount: totalVal,
          active: true,
        };
      });
    }
  }
  render() {
    const { index, initialTotal, removeFromModal } = this.props;
    const swatchClass = ["DivG", "DivC", "DivB", "DivBl", "DivW"];
    const currency = ["$", "£", "A$", "¥", "₽"];
    const { active, cartsItem, totalAmount } = this.state;
    const price = `${currency[index]}${totalAmount}`;
    const initialPrice = `${currency[index]}${initialTotal}`;

  


    if (this?.props?.carts?.length === 0) {
      return (
        <div className="ModalCartWrapper">
          <div className="ModalCart-Bag">
            <h2 className="ModalBagHeader">
              `My Bag, {this.props.carts.length} items`
            </h2>
            <div className="ModalCart-Total">
              <p>Total</p>
              <p>0</p>
            </div>
            <div className="ModalButton">
              <button className="ModalBtn-view">VIEW BAG</button>
              <button className="ModalBtn-view Left" disabled>
                CHECK OUT
              </button>
            </div>
          </div>
        </div>
      );
    }

    return (
      <>
        <div className="ModalCartWrapper">
          <div className="ModalCart-Bag">
            <h2 className="ModalBagHeader">
              `My Bag, {this.props.carts.length} items`
            </h2>
            {cartsItem?.map((cart) => (
              <div className="ModalBag">
                <div>
                  <p> {cart.name}</p>
                  <p>{`${cart.prices[index].currency.symbol}${cart.prices[index].amount}`}</p>
                  <div className="ModalAttMainDivWrap">
                    {cart.attributes.map((att) => {
                      if (att.type === "swatch" && att?.items===undefined) {
                        return (
                          <div key={att.name} className="ModalAttMainDiv">
                            <p>{att.value}</p>
                            <div className="ModalAttItemwrapper">
                              
                                <div  className={att.name}></div>
                             
                            </div>
                          </div>
                        );
                      }else if(
                        att.type === "swatch" && att?.items!==undefined
                      ){
                        return (
                          <CartsModalSwatch  att={att}
                          getNewSwatchAtt={this.getNewSwatchAtt}
                          swatchClass={swatchClass}/>
                          // <div key={att.id} className="ModalAttMainDiv">
                          //   <p>{att.name}</p>
                          //   <div className="ModalAttItemwrapper">
                          //     {swatchClass.map((item) => (
                          //       <div key={item} className={item}></div>
                          //     ))}
                          //   </div>
                          // </div>
                        );
                      } else {
                        return <CartModalChild att={att} getNewAtt={this.getNewAtt} setDisabled={this.setDisabled}/>;
                      }
                    })}
                  </div>
                </div>
                <div className="ModalControl">
                  <div>
                    <div
                      className="ModalBtnSy"
                      onClick={() => this.handleIncrease(cart.id, index)}
                    >
                      +
                    </div>
                    <div className="ModalCounter">{cart.qty}</div>
                    <div
                      className="ModalBtnSy"
                      onClick={() => {
                        console.log('in moda',cart.qty);
                        cart.qty === 1
                          ? removeFromModal(cart.id)
                          : this.handleDecrease(cart.id);
                      }}
                    >
                      -
                    </div>
                  </div>
                  <div>
                    <img
                      src={cart.gallery[0]}
                      alt="product"
                      className="ModalImage"
                    />
                  </div>
                </div>
              </div>
            ))}
            <div className="ModalCart-Total">
              <p>Total</p>
              <p>{active ? price : initialPrice}</p>
            </div>
            <div className="ModalButton">
             {this?.props?.carts[0]?.attributes[0]?.items?.length!==undefined?<button className="ModalBtn-view" onClick={()=>{
               console.log({addFromModal:addFromModal});
               this.navigatePage();
                this.props.addFromModal(  this.state.swatchAttributes.length === 0
                  ? this.props.carts.map(cart=>({...cart,attributes:this?.state?.attributes}))
                  : this.props.carts.map(cart=>({...cart,attributes:[...this?.state?.attributes,...this?.state?.swatchAttributes]})));
              }}
              disabled={this.state.isDisabled && !this.props.carts[0].attributes[0].clicked}
              >
                VIEW BAG
              </button>:<button className="ModalBtn-view" onClick={()=>{
                console.log('with elected att viewbtn');
                this.navigatePage();
                this.props.addToCartFromDesc( this.props.carts.map(cart=>({...cart,attributes:this?.state?.attributes})));
              }}
              disabled={this.state.isDisabled && !this.props.carts[0].attributes[0].clicked}
              >
                VIEW BAG
              </button>} 
              <button className="ModalBtn-view ModalLeft">CHECK OUT</button>
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
    addToCartFromDesc: (item) => dispatch(addToCartFromDesc(item)),
    addFromModal: (item) => dispatch(addFromModal(item)),
    removeFromModal:(id)=>dispatch(removeFromModal(id))
  };
};

function mapStateToProps(state) {
  const { carts, pageCart,index, initialTotal } = state;
  return { carts: carts, pageCart: pageCart,index: index, initialTotal: initialTotal };
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(CartsModal)
);
