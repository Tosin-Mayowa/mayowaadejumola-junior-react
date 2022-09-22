import React from "react";
import { gql } from "apollo-boost";
import { Query } from "react-apollo";
import TechProducts from "../TechProducts/TechProducts";
import Loading from "../Loading/Loading";

const GET_TECHPRODUCTS = gql`
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

class TechProductsListPage extends React.Component {
  render() {
    return (
      <>
        <Query
          query={GET_TECHPRODUCTS}
          variables={{
            input: {
              title: "tech",
            },
          }}
        >
          {({ loading, error, data }) => {
            if (loading) return <Loading />;
            if (error) return <div>Error </div>;
            const category = data?.category;
            console.log(category);

            return (
              <>
                <TechProducts techProducts={category} />
              </>
            );
          }}
        </Query>
      </>
    );
  }
}

export default TechProductsListPage;
