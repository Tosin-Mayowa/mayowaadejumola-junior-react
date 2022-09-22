import {Routes,Route} from 'react-router-dom';
import React from 'react';
import ProductListPage from '../src/Components/ProductList/ProductListPage';
import NavBar from './Components/NavBar/NavBar';
import ClothesProductListPage from './Components/ClothesProductList/ClothesProductListPage';
import TechProductsListPage from './Components/TechProductsList/TechProductsListPage';
import CartPage from './Components/CartPage/CartPage';

import ProductDescPage from './Components/ProductDescriptionPage/ProductDescPage';



class App extends React.Component{



  render(){
    return (
      <>
      <NavBar/>

 <Routes>
<Route exact path='/' element={<ProductListPage/>}/>
<Route path='/clothes' element={<ClothesProductListPage/>}/>
<Route path='/tech' element={<TechProductsListPage/>}/>
<Route path='/cartPage' element={<CartPage/>}/>
<Route path='/:id' element={<ProductDescPage/>}  />
<Route path='/clothes/:id' element={<ProductDescPage/>}  />
<Route path='/tech/:id' element={<ProductDescPage/>}  />


</Routes> 

</>

  )
  }
}




export default App;
