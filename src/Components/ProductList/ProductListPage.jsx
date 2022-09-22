import React from "react";
import { gql } from "apollo-boost";
import { Query } from "react-apollo";
import AllProducts from "../AllProducts/AllProducts";
import Loading from "../Loading/Loading";

const GET_ALLPRODUCTS = gql`
  query Getcategory($input: CategoryInput) {
    category(input: $input) {
      name
      products {
        id
        name
        inStock
        gallery
        description
        category
        attributes {
          id
          name
          type
          items {
            displayValue
            value
            id
          }
        }
        prices {
          currency {
            label
            symbol
          }
          amount
        }
        brand
      }
    }
  }
`;

class ProductListPage extends React.Component {
  render() {
    return (
      <>
        <Query
          query={GET_ALLPRODUCTS}
          variables={{
            input: {
              title: "all",
            },
          }}
        >
          {({ loading, error, data }) => {
            if (loading) return <Loading />;
            if (error) return <div>Error </div>;
            const category = data?.category;

            return (
              <>
                <AllProducts allProducts={category} />
              </>
            );
          }}
        </Query>
      </>
    );
  }
}

export default ProductListPage;
