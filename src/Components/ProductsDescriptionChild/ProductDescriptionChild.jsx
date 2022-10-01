import React from "react";
import "./ProductDesc.css";

class ProductDescriptionChild extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      attributes: Array.from(this.props.att.items, (x,i)=>({...x,clicked:false,notClicked:true}))
    };
    this.setClick = this.setClick.bind(this);
  }

  setClick(val){
const newAtt=this.state.attributes.map(item=>{
    if(item.value===val&&item.clicked===false){
        return {...item,clicked:true,notClicked:false,name:this.props.att.name};
    }else if (item.value===val&&item.clicked===true){
      return {...item,clicked:false,notClicked:true,name:this.props.att.name};
    }
    else{
        return {...item,clicked:false,notClicked:true,name:this.props.att.name};
    }
})
this.setState({attributes:newAtt})
  }

  componentDidMount() {
   
    this.props.getNewAtt(this.state.attributes);
    this.props.setDisabled(this.state.attributes.some(item=>item.clicked===true))
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.attributes !== this.state.attributes ) {
    
      this.props.getNewAtt(this.state.attributes);
      this.props.setDisabled(this.state.attributes.some(item=>item.clicked===true))
    }
  }



  render() {
   const {att}= this.props;
 
    return (
      <>
        <div key={att.id} className="DescCartAttributeDiv">
                                <p className="DescCartPageNameAtt">{att.name}</p>
                                <div className="DescCartAttItemwrapper">
                                  {this.state.attributes.map((item) => (
                                    <div
                                      key={item.value}
                                     className={item.clicked===true && item.notClicked===false?'DescProductAttributeBoxOn':'DescProductAttributeBoxOff'} 
                                     onClick={()=>{
                                     
                                      
                                      this.setClick(item.value);
                                     
                                    }}
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
