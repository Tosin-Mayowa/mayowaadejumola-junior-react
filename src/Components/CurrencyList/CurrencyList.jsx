import React from "react";
import { gql } from "apollo-boost";
import { Query } from "react-apollo";
import Loading from "../Loading/Loading";
import { connect } from "react-redux";
import {
  usd,
  gbp,
  aud,
  jpy,
  rub,
  initialTotal,
  isToggle,
  isCloseSwitcher,
} from "../../redux/action";
import ArrowUpIcon from "../Image/ArrowUp.png";
import ArrowDownIcon from "../Image/ArrowDown.png";
import "./CurrencyList.css";
import Cart from "../Image/cart.png";
import Dot from "../Image/dot.png";

const GET_CURRENCIES = gql`
  query {
    currencies {
      label
      symbol
    }
  }
`;

class CurrencyList extends React.Component {
  render() {
    const { aud, usd, gbp, rub, jpy, index,isOpen,setBool } = this.props;
    const func = [usd, gbp, aud, jpy, rub];

    
    return (
      <>
        <Query query={GET_CURRENCIES}>
          {({ loading, error, data }) => {
            if (loading) return <Loading />;
            if (error) return <div>Error </div>;
            const currencies = data.currencies;

           
            return (
              <>
                <div className="Wrapper">
                  <div class="dropdown">
                    <button
                      class="dropbtn"
                      onClick={() => this.props.isToggle()}
                    >
                      {currencies[index].symbol}
                      {this.props.isOpenedSwitcher ? (
                        <img src={ArrowUpIcon} alt="" className="ArrowIcon" />
                      ) : (
                        <img src={ArrowDownIcon} alt="" className="ArrowIcon" />
                      )}
                    </button>
                    {this.props.isOpenedSwitcher ? (
                      <div className="dropdown-content">
                        {currencies?.map((currency, idx) => (
                          <button
                            className="BtnC"
                            onClick={() => {
                              func[idx]();
                              this.props.isCloseSwitcher();
                            }}
                          >
                            {`${currency.symbol} ${currency.label}`}
                          </button>
                        ))}
                      </div>
                    ) : (
                      <div></div>
                    )}
                  </div>

                  <div
                    className="NavCart"
                    onClick={() => {
                      setBool(isOpen);
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
                    <div className="ItemsNo">{this.props.carts.length}</div>
                  </div>
                </div>
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
    isToggle: () => dispatch(isToggle()),
    isCloseSwitcher: () => dispatch(isCloseSwitcher()),
  };
};
function mapStateToProps(state) {
  const { carts, isOpenedSwitcher, index } = state;
  return { carts: carts, isOpenedSwitcher: isOpenedSwitcher, index: index };
}

export default connect(mapStateToProps, mapDispatchToProps)(CurrencyList);
