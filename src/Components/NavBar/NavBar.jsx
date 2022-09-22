import React from "react";
import { gql } from "apollo-boost";
import { Query } from "react-apollo";
import Logoicon from "../Image/svg3.png";
import Logoicon2 from "../Image/svg19.png";
import Logoicon3 from "../Image/svg21.png";

import "./NavBar.css";

import { NavLink } from 'react-router-dom';
import CartsModal from "../CartsModal/CartsModal";


import CurrencyList from "../CurrencyList/CurrencyList";

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
     
      isOpen: false,
    
    };
   this.setBool=this.setBool.bind(this);
  }

  setBool(val){
    this.setState({ isOpen: !val
    })
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
                <nav className="Nav-bar" >
                  <div className="Nav"  >
                    <ul className="ListParent">
                      {data.categories.map((cat) => (
                        <li className="List">
                          <NavLink 
                            
                            to={cat.name === "all" ? "/" : `/${cat.name}`}
                            className={({ isActive }) =>
                            isActive ? 'active' : 'Nav-Link'
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




                    <CurrencyList  isOpen={this.state.isOpen}  setBool={this.setBool}/>


                    {/* <div className="Cart" >
                      <div className="Symbol">
                        <div className="Symbol">
                          <p className="DollarSign" onClick={()=>this.props.isOpenSwitcher()}>$</p>
                          <div>
                            {this.props.isOpenedSwitcher ? (
                              <img
                                src={ArrowUpIcon}
                                alt=""
                                className="ArrowIcon"
                                onClick={()=>this.props.isCloseSwitcher()}
                              />
                            ) : (
                              <img
                                src={ArrowDownIcon}
                                alt=""
                                className="ArrowIcon"
                                onClick={()=>this.props.isOpenSwitcher()}
                              />
                            )}
                          </div>
                        </div>

                        
                      </div>

                     
                    </div> */}
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



export default NavBar;
