import React from "react";
import { gql } from "apollo-boost";
import { Query } from "react-apollo";
import ClothesProducts from "../ClothesProducts/ClothesProducts";
import Loading from "../Loading/Loading";

const GET_CLOTHESPRODUCTS = gql`
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

class ClothesProductListPage extends React.Component {
  render() {
    return (
      <>
        <Query
          query={GET_CLOTHESPRODUCTS}
          variables={{
            input: {
              title: "clothes",
            },
          }}
        >
          {({ loading, error, data }) => {
            if (loading) return <Loading />;
            if (error) return <div>Error </div>;

            const category = data?.category;

            return (
              <>
                <ClothesProducts clothesProducts={category} />
              </>
            );
          }}
        </Query>
      </>
    );
  }
}

export default ClothesProductListPage;
