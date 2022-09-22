import React from 'react';
import './AllProducts.css';
import AddCartBtn from '../AddCartBtn/AddCartBtn';
import { Link } from "react-router-dom";
class AllProductsChild extends React.Component{

   

render(){
    const {products,handleMouseEnter,handleMouseLeave,index}=this.props;
    return(
        <>
        
        <div 
        key={products.id} 
        className={products.inStock===true && products.attributes.length !==0?'AllinnerDiv':'AllinnerDivOutStock'} 
        onMouseEnter={() => handleMouseEnter(products.idx) }
        onMouseLeave={() => handleMouseLeave(products.idx) }
        >
  <div 
  className={products.inStock===true?'HideOutOfStock':'ShowOutOfStock'}
  >
    <p>OUT OF STOCK</p>
    </div>
  <div className='ImageDiv'>
              <Link to={ `/${products.id}`}>
                <img
                  src={products.gallery[0]}
                  alt={products.name}
                  className="AllImage"
                />
              </Link>
            </div>
<h2 className={products.inStock===true?'AllText':'AllTextOutOfStock'}>{products.name}</h2>
<h3 className={products.inStock===true?'AllPriceTag':'AllPriceTagOutOfStock'}>{`${products.prices[index].currency.symbol}${products.prices[index].amount}`}</h3>
<AddCartBtn products={products} />
</div>

        
        
        </>
    )
}

    
}
export default AllProductsChild;