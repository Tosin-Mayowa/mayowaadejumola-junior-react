import React from "react";
import { connect } from "react-redux";



function mapStateToProps(state) {
    const { carts } = state;
    return { carts: carts };
  }


class Cart extends React.Component{

    render(){
        console.log({storeVal:this.props.carts});
        return(
        <>
       {this.props.carts?.map(cart=>
       (<div>
           {cart.name}
       </div>
       )
       )}
        </>
        )
    }
}



export default  connect(mapStateToProps)(Cart);