import React from 'react';
import { gql } from 'apollo-boost';
import { Query } from 'react-apollo'; 
import TechProducts from '../TechProducts/TechProducts';






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

class TechProductsListPage extends React.Component{



render(){
    return(
    <>
       <Query query={GET_ALLPRODUCTS}>
        {({ loading, error, data }) => {
          if (loading) return <div>Loading...</div>;
          if (error) return <div>Error </div>;
          const techProducts= data?.categories?.find(cat=>cat.name==='tech');
     
         return    (
            <>
          <TechProducts techProducts={techProducts}/>

          </>
         );
     
          
        }}
      </Query>
      </>
      )
      }



}


export default TechProductsListPage;