import React from 'react';
import { gql } from 'apollo-boost';
import { Query } from 'react-apollo'; 
import AllProducts from '../AllProducts/AllProducts';





const GET_ALLPRODUCTS = gql`

query {
  categories{
    name
    products{
      id
        name
        inStock
        gallery
        description
        category
        prices{
          currency{
            label
            symbol
          }
          amount
        }
        brand
    }
  }
}

`

class ProductListPage extends React.Component{



render(){
    return(
    <>
       <Query query={GET_ALLPRODUCTS}>
        {({ loading, error, data }) => {
          if (loading) return <div>Loading...</div>;
          if (error) return <div>Error </div>;
          const allProducts= data?.categories?.find(cat=>cat.name==='all');
     
         return    (
            <>
          <AllProducts allProducts={allProducts}/>

          </>
         );
     
          
        }}
      </Query>
      </>
      )
      }



}


export default ProductListPage;