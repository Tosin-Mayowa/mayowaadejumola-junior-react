import React from 'react';
import AllProductsChild from '../AllProductsChild/AllProductsChild';
import './All.css';


class AllProducts extends React.Component{
 

  constructor(props){
    super(props);
    this.state={
      allProducts:Array.from(this.props.allProducts.products,(x,i)=>({...x,isHovered:false,idx:i}))
    
    };
    this.handleMouseEnter=this.handleMouseEnter.bind(this);
    this.handleMouseLeave=this.handleMouseLeave.bind(this);
  }


handleMouseEnter(id){
 
const products=this.state.allProducts.map(item=>{
  if(item.idx===id){
    return {...item,isHovered:true};
  }else{
    return item;
  }
});

this.setState(st=>{
  return {
    allProducts:products
    
  }
})
}

handleMouseLeave(id){
  const products=this.state.allProducts.map(item=>{
    if(item.idx===id){
      return {...item,isHovered:false};
    }else{
      return item;
    }
  });
  
  this.setState(st=>{
    return {
      allProducts:products
      
    }
  })

}

 render(){
    const {allProducts}=this.state;
    const {name}=this.props.allProducts;
  return(
   <>
 <h2 className='Title'>{name}</h2>
 <div className='AllParentDiv'>
  {allProducts?.map((products)=>
      <
       AllProductsChild 
       key={products.id}  
       products={products}  
       handleMouseEnter={this.handleMouseEnter} 
       handleMouseLeave={this.handleMouseLeave}
      />
)}
     </div>
      
    </>
    )
    }
  }
  
  export default AllProducts;