import React from "react";
import "./ProductDesc.css";

class ProductDescriptionChild extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      attributes: Array.from(this.props.att.items, (x,i)=>({...x,isClicked:false}))
    };
    this.setClick = this.setClick.bind(this);
  }

  setClick(val){
const newAtt=this.state.attributes.map(item=>{
    if(item.value===val){
        return {...item,isClicked:!item.isClicked};
    }else{
        return item;
    }
})
this.setState({attributes:newAtt})
  }



  render() {
   const {att}= this.props;
  
    
    return (
      <>
        <div key={att.id} className="CartAttributeDiv">
                                <p className="CartPageNameAtt">{att.name}</p>
                                <div className="CartAttItemwrapper">
                                  {this.state.attributes.map((item) => (
                                    <div
                                      key={item.value}
                                     className={item.isClicked?'ProductAttributeBoxOn':'ProductAttributeBoxOff'} 
                                     onClick={()=>this.setClick(item.value)}
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

export default ProductDescriptionChild;
