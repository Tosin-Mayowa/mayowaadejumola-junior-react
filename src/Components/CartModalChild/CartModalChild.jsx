import React from "react";
import "./CartModalChild.css";

class CartModalChild extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      attributes:this.props.att.items!==undefined? Array.from(this.props.att.items, (x, i) => ({
        ...x,
        clicked:false,notClicked:true
      })):[],
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
    
    const { att } = this.props;


   
    if (this.props.att.items!==undefined) {
      return (
        <div key={att.id} className="ModalCartAttributeDiv">
          <p className="ModalCartPageNameAtt">{att.name}</p>
          <div className="ModalCartAttItemwrapper">
            {this.state.attributes.map((item) => (
              <div
                key={item.id}
                className={item.clicked===true && item.notClicked===false?'ModalCartAttributeBoxOn':'ModalCartAttributeBoxOff'}
                onClick={() => this.setClick(item.id)}
              >
                {item.value}
              </div>
            ))}
          </div>
        </div>
      );
    }
    return (
      <>
      
      <div key={att.id} className="ModalCartAttributeDiv">
          <p className="ModalCartPageNameAtt">{att.name}</p>
          <div className="ModalCartAttItemwrapper">
            <div className="ModalCartAttributeBoxOn">
              {att.value}
            </div>
          </div>
        </div>
        
      </>
    );
  }
}


export default CartModalChild;
