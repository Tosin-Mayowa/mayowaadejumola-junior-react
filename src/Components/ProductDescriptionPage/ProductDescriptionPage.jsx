import React from "react";
import { gql } from "apollo-boost";
import { Query } from "react-apollo";
import withParams from "../../withParams";
import { connect } from "react-redux";
import { addToCart } from "../../redux/action";
import parse from "html-react-parser";
import "./ProductDescription.css";
import ProductDescriptionChild from "../ProductsDescriptionChild/ProductDescriptionChild";
const GET_PRODUCTS = gql`
  query {
    categories {
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

class ProductDescriptionPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      url: "",
    };

    this.setImage = this.setImage.bind(this);
    this.formatText = this.formatText.bind(this);
    this.getPrefixText = this.getPrefixText.bind(this);
  }

  setImage(val) {
    this.setState({ url: val });
  }

  formatText(text) {
    const indexSlice = text.indexOf(" ");
    return text.slice(indexSlice);
  }

  getPrefixText(text) {
    const indexSlice = text.indexOf(" ");
    const indexSlice2 = text.lastIndexOf(" ");
    const newText =
      indexSlice === -1
        ? text
        : indexSlice === indexSlice2
        ? text.slice(0, indexSlice + 1)
        : text.slice(0, indexSlice);
    return newText;
  }

  render() {
    const swatchItems = ["CDivG", "CDivC", "CDivB", "CDivBl", "CDivW"];
    const { index } = this.props;
    return (
      <>
        <Query query={GET_PRODUCTS}>
          {({ loading, error, data }) => {
            if (loading) return <div>Loading...</div>;
            if (error) return <div>Error </div>;
            const allProducts = data?.categories?.find(
              (cat) => cat.name === "all"
            );
            const product = allProducts.products.find(
              (item) => item.id === this.props.params.id
            );

            console.log(product);

            return (
              <>
                <div className="ParentDiv">
                  <div className="FirstChild">
                    {product.gallery.map((item, idx) => (
                      <div key={idx} onClick={() => this.setImage(item)}>
                        <img src={item} alt="" className="ImageFirstChild" />
                      </div>
                    ))}
                  </div>
                  <div className="SecondChild">
                    <div>
                      <img
                        src={
                          this.state.url ? this.state.url : product.gallery[0]
                        }
                        alt=""
                        className="ImageSecondChild"
                      />
                    </div>
                    <div className="AttributesSecondChild">
                      <p className="ProductFirstName">
                        {" "}
                        {this.getPrefixText(product.name)}
                      </p>
                      <p className="ProductSubName">
                        {this.formatText(product.name).length < 5
                          ? ""
                          : this.formatText(product.name)}
                      </p>{" "}
                      <div className="AttMainDivWrap">
                        {product.attributes.map((att) => {
                          if (att.type === "swatch") {
                            return (
                              <div key={att.id} className="ProductDescAttMainDiv">
                                <p className="ProductAttributeName">
                                  {att.name}
                                </p>
                                <div className="AttItemwrapper">
                                  {swatchItems.map((item) => (
                                    <div key={item} className={item}></div>
                                  ))}
                                </div>
                              </div>
                            );
                          } else {
                            return (
                            <ProductDescriptionChild att={att}/>
                            );
                          }
                        })}
                      </div>
                      <p className="PriceSecondChild">Price:</p>
                      <p>{`${product.prices[index].currency.symbol}${product.prices[index].amount}`}</p>
                      <div>
                        <button onClick={() => this.props.addToCart(product)}>
                          Add To Cart
                        </button>
                      </div>
                      <div>
                        <div>{parse(product.description)}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            );
          }}
        </Query>
      </>
    );
  }
}

function mapStateToProps(state) {
  const { carts, index, initialTotal } = state;
  return { carts: carts, index: index, initialTotal: initialTotal };
}

const mapDispatchToProps = (dispatch) => {
  return {
    addToCart: (cart) => dispatch(addToCart(cart)),
  };
};

export default withParams(
  connect(mapStateToProps, mapDispatchToProps)(ProductDescriptionPage)
);
