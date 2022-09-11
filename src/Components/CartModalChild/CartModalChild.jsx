import React from "react";
import "./CartModalChild.css";

class CartModalChild extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      attributes: Array.from(this.props.att.items, (x,i)=>({...x,isClicked:false}))
    };
    this.setClick = this.setClick.bind(this);
  }

  setClick(id){
const newAtt=this.state.attributes.map(item=>{
    if(item.id===id){
        return {...item,isClicked:!item.isClicked};
    }else{
        return item;
    }
})
this.setState({attributes:newAtt})
  }



  render() {
   const {att}= this.props;
   console.log(this.state.attributes);
    
    return (
      <>
        <div key={att.id} className="CartAttributeDiv">
                                <p className="CartPageNameAtt">{att.name}</p>
                                <div className="CartAttItemwrapper">
                                  {this.state.attributes.map((item) => (
                                    <div
                                      key={item.id}
                                     className={item.isClicked?'CartAttributeBoxOn':'CartAttributeBoxOff'} 
                                     onClick={()=>this.setClick(item.id)}
                                    >
                                      {item.value}
                                    </div>
                                  ))}
                                </div>
                              </div>

      </>
    );
  }
}

export default CartModalChild;