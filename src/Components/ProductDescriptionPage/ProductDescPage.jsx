import React from "react";
import { gql } from "apollo-boost";
import { Query } from "react-apollo";
import withParams from "../../withParams";
import { connect } from "react-redux";
import { addToCart, addToCartWithSelectedAtt } from "../../redux/action";
import parse from "html-react-parser";
import "./ProductDescription.css";
import ProductDescriptionChild from "../ProductsDescriptionChild/ProductDescriptionChild";
import ProductSwatch from "../Swatch/ProductSwatch";
const GET_PRODUCT = gql`
  query GetProduct($id: String!) {
    product(id: $id) {
      id
      name
      inStock
      gallery
      description
      category
      attributes {
        name
        type
        items {
          displayValue
          value
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
`;

class ProductDescPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      url: "",
      isDisabled: true,
      attributes: [],
      swatchAttributes: [],
    };

    this.setImage = this.setImage.bind(this);
    this.formatText = this.formatText.bind(this);
    this.getPrefixText = this.getPrefixText.bind(this);
    this.setDisabled = this.setDisabled.bind(this);
    this.getNewAtt = this.getNewAtt.bind(this);
    this.getNewSwatchAtt = this.getNewSwatchAtt.bind(this);
  }

  setImage(val) {
    this.setState({ url: val });
  }

  getNewSwatchAtt(arr) {
    console.log(arr, "sw");
    const attributeSet = arr.filter((att) => att.clicked === true);
    this.setState({ swatchAttributes: attributeSet });
  }

  getNewAtt(arr) {
    console.log(arr, "arr");

    const attributeSet = arr.filter((att) => att.clicked === true);

    this.setState((st, props) => {
      return {
        attributes: [...st.attributes, ...attributeSet],
      };
    });
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

  setDisabled(val) {
    this.setState({ isDisabled: !val });
  }

  render() {
    const swatchClass = ["CDivGP", "CDivCP", "CDivBP", "CDivBlP", "CDivWP"];
    const { index } = this.props;

    return (
      <>
        <Query query={GET_PRODUCT} variables={{ id: this.props.params.id }}>
          {({ loading, error, data }) => {
            if (loading) return <div>Loading...</div>;
            if (error) return <div>Error </div>;
            const { product } = data;

            const newProduct = {
              ...product,
              attributes: this.state.attributes,
            };
            const newProductSwatch = {
              ...product,
              attributes: [
                ...this.state.attributes,
                ...this.state.swatchAttributes,
              ],
            };
          
            console.log(this.state.attributes, "att pr desc");
            console.log(newProduct, "new pro");
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
                    <div className="ImageDivSec">
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
                        {this.formatText(product?.name).length < 5
                          ? ""
                          : this.formatText(product?.name)}
                      </p>{" "}
                      <div className="ProductDescAttMainDivWrap">
                        {product.attributes.map((att) => {
                          if (att.type === "swatch") {
                            return (
                              <ProductSwatch
                                att={att}
                                getNewSwatchAtt={this.getNewSwatchAtt}
                                swatchClass={swatchClass}
                              />
                            );
                          } else {
                            return (
                              <ProductDescriptionChild
                                att={att}
                                getNewAtt={this.getNewAtt}
                                setDisabled={this.setDisabled}
                              />
                            );
                          }
                        })}
                      </div>
                      <p className="PriceSecondChild">Price:</p>
                      <p className="PriceValue">{`${product.prices[index].currency.symbol}${product.prices[index].amount}`}</p>
                      <div className="ButtonAddDiv">
                        {product.inStock ? (
                          <button
                            className="ButtonAdd"
                            onClick={() => {
                              console.log('working');
                              this.props.addToCartWithSelectedAtt(
                                this.state.swatchAttributes.length === 0
                                  ? newProduct
                                  : newProductSwatch
                              );
                            }}
                            disabled={this.state.isDisabled}
                          >
                            Add To Cart
                          </button>
                        ) : (
                          <button className="ButtonAdd">Add To Cart</button>
                        )}
                      </div>
                      <div className="Description">
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
    addToCartWithSelectedAtt: (item) =>
      dispatch(addToCartWithSelectedAtt(item)),
  };
};

export default withParams(
  connect(mapStateToProps, mapDispatchToProps)(ProductDescPage)
);
