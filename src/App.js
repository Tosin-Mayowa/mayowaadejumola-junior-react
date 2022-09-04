import {Routes,Route} from 'react-router-dom';
import React from 'react';
import ProductListPage from '../src/Components/ProductList/ProductListPage';
import NavBar from './Components/NavBar/NavBar';
import ClothesProductListPage from './Components/ClothesProductList/ClothesProductListPage';
import TechProductsListPage from './Components/TechProductsList/TechProductsListPage';



class App extends React.Component{



  render(){
    return (
      <>
      <NavBar/>

 <Routes>
<Route path='/' element={<ProductListPage/>}/>
<Route path='/clothes' element={<ClothesProductListPage/>}/>
<Route path='/tech' element={<TechProductsListPage/>}/>
</Routes> 

</>

  )
  }
}




export default App;
