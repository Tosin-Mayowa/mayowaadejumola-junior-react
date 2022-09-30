import React from "react";
import { gql } from "apollo-boost";
import { Query } from "react-apollo";
import Logoicon from "../Image/svg3.png";
import Logoicon2 from "../Image/svg19.png";
import Logoicon3 from "../Image/svg21.png";

import "./NavBar.css";

import { NavLink } from "react-router-dom";
import CartsModal from "../CartsModal/CartsModal";

import CurrencyList from "../CurrencyList/CurrencyList";
import { connect } from "react-redux";
import { setOverflow } from "../../redux/action";

const GET_CATEGORIES = gql`
  query {
    categories {
      name
     
    }
  }
`;

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
    };
    this.setBool = this.setBool.bind(this);
  }

  setBool(val) {
    this.setState({ isOpen: !val });
    
  }

  render() {
    return (
      <>
        <Query query={GET_CATEGORIES}>
          {({ loading, error, data }) => {
            if (loading) return <div>Loading...</div>;
            if (error) return <div>Error </div>;

            return (
              <>
                <nav className="Nav-bar">
                  <div className="Nav">
                    <ul className="ListParent">
                      {data.categories.map((cat) => (
                        <li className="List">
                          <NavLink
                            to={cat.name === "all" ? "/" : `/${cat.name}`}
                            className={({ isActive }) =>
                              isActive ? "active" : "Nav-Link"
                            }
                          >
                            {cat.name}
                          </NavLink>
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

                    <CurrencyList
                      isOpen={this.state.isOpen}
                      setBool={this.setBool}
                    />
                  </div>
                  <div className={this.state.isOpen?"Modal":"" }>
                  
                    <div className={this.state.isOpen?"Modal":"" }  onClick={()=>{
                      this.setBool(this.state.isOpen);
                      this.props.setOverflow()
                      }}>
                     
                    </div>
                    {this.state.isOpen && ( <CartsModal isOpen={this.state.isOpen} />)}
                  </div>
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
   
    setOverflow: () => dispatch(setOverflow()),
  };
};

export default connect(null, mapDispatchToProps)(NavBar);
