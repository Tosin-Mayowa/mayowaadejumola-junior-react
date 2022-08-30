import {Routes,Route} from 'react-router-dom';
import React from 'react';
import ProductListPage from '../src/Components/ProductList/ProductListPage';
import NavBar from '../src/Components/NavBar/NavBar';
import TechProducts from './Components/TechProducts/TechProducts';
import ClothesProductListPage from './Components/ClothesProductList/ClothesProductListPage';



class App extends React.Component{



  render(){
    return (
      <>
      <NavBar/>

 <Routes>
<Route path='/' element={<ProductListPage/>}/>
<Route path='/clothes' element={<ClothesProductListPage/>}/>
<Route path='/tech' element={<TechProducts/>}/>
</Routes> 

</>

  )
  }
}




export default App;
