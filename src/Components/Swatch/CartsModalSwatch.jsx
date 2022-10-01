import React from 'react';
import './CartsSwatch.css';

class CartsModalSwatch extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        attributes: Array.from(this.props.att.items, (x,i)=>({...x})),
        swatchClass:Array.from(this.props.swatchClass,(x,i)=>({name:x,clicked:false,notClicked:true,type:'swatch', value:'color'}))
      };
      this.setClick = this.setClick.bind(this);
    }
  
    setClick(val){
      console.log(this.state.swatchClass, 'the swatch');
  const newAtt=this.state.swatchClass.map(item=>{
      if(item.name===val&&item.clicked===false){
          return {...item,clicked:true,notClicked:false};
      }else if (item.name===val&&item.clicked===true){
        return {...item,clicked:false,notClicked:true};
      }
      else{
          return {...item,clicked:false,notClicked:true};
      }
  })
  this.setState({swatchClass:newAtt})
    }
  
    componentDidMount() {
      console.log('did',this.state.swatchClass.some(item=>item.clicked===true));
      this.props.getNewSwatchAtt(this.state.swatchClass);
      // this.props.setDisabled(this.state.attributes.some(item=>item.clicked===true))
    }
  
    componentDidUpdate(prevProps, prevState) {
      if (prevState.swatchClass !== this.state.swatchClass ) {
        console.log('upd',this.state.swatchClass.some(item=>item.clicked===true));
        this.props.getNewSwatchAtt(this.state.swatchClass);
        // this.props.setDisabled(this.state.attributes.some(item=>item.clicked===true))
      }
    }
  
  
    render() {
     const {att}= this.props;
  const {swatchClass}=this.state;
    console.log(swatchClass,'swatchm');
    
      return (
        <>

<div key={att.id} className="ModalAttMainDiv">
                            <p>{att.name}</p>
                            <div className="ModalAttItemwrapper">
                              {swatchClass.map((item) => (
                                <div key={item.name} className={item.clicked===true && item.notClicked===false?'Selected':item.name}
                                onClick={()=>{
                                                                 
                                                                   
                                 this.setClick(item.name);
                                
                               }}
                                ></div>
                              ))}
                            </div>
                          </div>




        </>
      );
    }
  }
  
  export default CartsModalSwatch ;
  
