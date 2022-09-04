import React from 'react';
import './TechProductsChild.css'
import AddCartBtn from '../AddCartBtn/AddCartBtn';


class TechProductsChild extends React.Component{

   

render(){
    const {products,handleMouseEnter,handleMouseLeave,index}=this.props;
    return(
        <>
        
        <div 
        key={products.id} 
        className={products.inStock===true?'AllinnerDiv':'AllinnerDivOutStock'} 
        onMouseEnter={() => handleMouseEnter(products.idx) }
        onMouseLeave={() => handleMouseLeave(products.idx) }
        >
  <div 
  className={products.inStock===true?'HideOutOfStock':'ShowOutOfStock'}
  >
    <p>OUT OF STOCK</p>
    </div>
  <div className='ImageDiv'><img src={products.gallery[0]} alt={products.name} className='AllImage'/></div>
<h2 className={products.inStock===true?'AllText':'AllTextOutOfStock'}>{products.name}</h2>
<h3 className={products.inStock===true?'AllPriceTag':'AllPriceTagOutOfStock'}>{`${products.prices[index].currency.symbol}${products.prices[index].amount}`}</h3>
<AddCartBtn products={products} />
</div>

     
        
        </>
    )
}

    
}
export default TechProductsChild;