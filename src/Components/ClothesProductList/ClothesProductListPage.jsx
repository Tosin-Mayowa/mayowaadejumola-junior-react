import React from "react";
import { gql } from 'apollo-boost';
import { Query } from 'react-apollo'; 
import ClothesProducts from "../ClothesProducts/ClothesProducts";


const GET_CLOTHESPRODUCTS = gql`

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
       attributes{
        id
        name
        type
        items{
          displayValue
          value
          id
        }
      }
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

class ClothesProductListPage extends React.Component{



    render(){
        return(
        <>
           <Query query={GET_CLOTHESPRODUCTS}>
            {({ loading, error, data }) => {
              if (loading) return <div>Loading...</div>;
              if (error) return <div>Error </div>;
              const clothesProducts= data?.categories?.find(cat=>cat.name==='clothes');
         console.log({cl:clothesProducts});
             return    (
                <>
              <ClothesProducts clothesProducts={clothesProducts}/>
              </>
             );
         
              
            }}
          </Query>
          </>
          )
          }

}

export default ClothesProductListPage;