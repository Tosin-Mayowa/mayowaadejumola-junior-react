import React from "react";
import { gql } from "apollo-boost";
import { Query } from "react-apollo";
import Logoicon from "../Image/svg3.png";
import Logoicon2 from "../Image/svg19.png";
import Logoicon3 from "../Image/svg21.png";
import ArrowUpIcon from "../Image/ArrowUp.png";
import ArrowDownIcon from "../Image/ArrowDown.png";
import "./NavBar.css";
import Cart from "../Image/cart.png";
import Dot from "../Image/dot.png";
import { Link } from "react-router-dom";
import CartsModal from "../CartsModal/CartsModal";
import { usd, gbp, aud, jpy, rub, initialTotal } from "../../redux/action";
import { connect } from "react-redux";

const GET_CATEGORIES = gql`
  query {
    categories {
      name
      products {
        prices {
          currency {
            label
            symbol
          }
        }
      }
    }
  }
`;

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isClicked: 0,
      isOpen: false,
      isClose: 1
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleClick() {
    this.setState((st) => {
      return {
        isClicked: st.isClicked===0?1:1,
        isClose: st.isClose===0?1:1
      };
    });
    
  }

  handleClose() {
  this.setState({isClose:0})
     
  }

  render() {
    console.log({state:this.state});
    return (
      <>
        <Query query={GET_CATEGORIES}>
          {({ loading, error, data }) => {
            if (loading) return <div>Loading...</div>;
            if (error) return <div>Error </div>;

            return (
              <>
                <nav className="Nav-bar" >
                  <div className="Nav"  >
                    <ul className="ListParent">
                      {data.categories.map((cat) => (
                        <li className="List">
                          <Link
                            className="Nav-Link"
                            to={cat.name === "all" ? "/" : `/${cat.name}`}
                          >
                            {cat.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                    <div>
                      <img src={Logoicon} alt="" />
                      <div className="Logoicon2">
                        <img src={Logoicon2} alt="" />
                        <div className="Logoicon3">
                          <img src={Logoicon3} alt="" />
                        </div>
                      </div>
                    </div>
                    <div className="Cart" >
                      <div className="Symbol">
                        <div className="Symbol">
                          <p className="DollarSign" onClick={this.handleClose}>$</p>
                          <div>
                            {this.state.isClicked && this.state.isClose ? (
                              <img
                                src={ArrowUpIcon}
                                alt=""
                                className="ArrowIcon"
                                onClick={this.handleClose}
                              />
                            ) : (
                              <img
                                src={ArrowDownIcon}
                                alt=""
                                className="ArrowIcon"
                                onClick={this.handleClick}
                              />
                            )}
                          </div>
                        </div>

                        <div
                          className="NavCart"
                          onClick={() => {
                            this.setState({ isOpen: !this.state.isOpen });
                            this.props.initialTotal();
                          }}
                        >
                          <div className="">
                            <img src={Cart} alt="cart" />
                            <div className="Dot">
                              <img src={Dot} alt="dot" />
                              <img src={Dot} alt="dot" className="RDot" />
                            </div>
                          </div>
                          <div className="ItemsNo">
                            {this.props.carts.length}
                          </div>
                        </div>
                      </div>

                      <div className="DivCurrencyList">
                        <ul
                          className={
                            this.state.isClicked && this.state.isClose
                              ? "CurrencyListShow"
                              : "CurrencyList"
                          }
                        >
                          <li className="BtnList">
                            <button
                              className="BtnC"
                              onClick={() => {
                                this.props.usd();
                                this.handleClose();
                              }}
                            >
                              $ USD
                            </button>
                          </li>
                          <li className="BtnList">
                            <button
                              className="BtnC"
                              onClick={() => {
                                this.props.gbp();
                                this.handleClose();
                              }}
                            >
                              £ GBP
                            </button>
                          </li>
                          <li className="BtnList">
                            <button
                              className="BtnC"
                              onClick={() => {
                                this.props.jpy();
                                this.handleClose();
                              }}
                            >
                              ¥ JPY
                            </button>
                          </li>
                          <li className="BtnList">
                            <button
                              className="BtnC"
                              onClick={() => {
                                this.props.rub();
                                this.handleClose();
                              }}
                            >
                              ₽ RUB
                            </button>
                          </li>
                          <li className="BtnList">
                            <button
                              className="BtnC"
                              onClick={() => {
                                this.props.aud();
                                this.handleClose();
                              }}
                            >
                              A$ AUD
                            </button>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  {this.state.isOpen && (
                    <div className="Modal">
                      <CartsModal isOpen={this.state.isOpen} />
                    </div>
                  )}
                </nav>
              </>
            );
          }}
        </Query>
      </>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    // dispatching actions returned by action creators
    usd: () => dispatch(usd()),
    gbp: () => dispatch(gbp()),
    aud: () => dispatch(aud()),
    jpy: () => dispatch(jpy()),
    rub: () => dispatch(rub()),
    initialTotal: () => dispatch(initialTotal()),
  };
};
function mapStateToProps(state) {
  const { carts } = state;
  return { carts: carts };
}

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
