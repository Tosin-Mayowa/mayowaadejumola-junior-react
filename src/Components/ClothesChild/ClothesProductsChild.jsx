import React from 'react';
import './ClothesProductsChild.css'
import Surface from '../Image/Surface.png';
import Cart from '../Image/Vector.png';
import Dot from '../Image/Vect.png';

class ClothesProductsChild extends React.Component{

   

render(){
    const {products,handleMouseEnter,handleMouseLeave}=this.props;
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
<h3 className={products.inStock===true?'AllPriceTag':'AllPriceTagOutOfStock'}>{`${products.prices[0].currency.symbol}${products.prices[0].amount}`}</h3>
<div className={products.isHovered && products.inStock===true?'AllCartsDivHover':'AllCartsDivOutOfStock' }>
  <img src={Surface} alt='surface' />
  <div className='CartDiv'>
  <img src={Cart} alt='cart' />
  <div className='Dot'>
  <img src={Dot} alt='dot' /> 
  <img src={Dot} alt='dot' className='RDot' />
  </div>
  </div>
</div>
</div>

        
        
        </>
    )
}

    
}
export default ClothesProductsChild;