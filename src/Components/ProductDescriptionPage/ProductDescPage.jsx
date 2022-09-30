import React from "react";
import { gql } from "apollo-boost";
import { Query } from "react-apollo";
import withParams from "../../withParams";
import { connect } from "react-redux";
import { addToCart, addToCartWithSelectedAtt } from "../../redux/action";
import parse from "html-react-parser";
import "./ProductDescription.css";
import ProductDescriptionChild from "../ProductsDescriptionChild/ProductDescriptionChild";
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
      isDisabled:true,
      attributes:[]
    };

    this.setImage = this.setImage.bind(this);
    this.formatText = this.formatText.bind(this);
    this.getPrefixText = this.getPrefixText.bind(this);
   this.setDisabled=this.setDisabled.bind(this);
   this.getNewAtt=this.getNewAtt.bind(this);
  }

  setImage(val) {
    this.setState({ url: val });
  }


  getNewAtt(arr){
    console.log(arr,'arr');
    const attributeSet=arr.filter(att=>att.clicked===true);
    this.setState({  attributes: attributeSet});
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

  setDisabled(val){
    
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
           
            const newProduct={...product,attributes:this.state.attributes}
     
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
                              <div
                                key={att.id}
                                className="ProductDescAttMainDiv"
                              >
                                <p className="ProductAttributeName">
                                  {att.name}
                                </p>
                                <div className="AttItemwrapper">
                                  {swatchClass.map((item) => (
                                    <div key={item} className={item}></div>
                                  ))}
                                </div>
                              </div>
                            );
                          } else {
                            return <ProductDescriptionChild att={att} getNewAtt={this.getNewAtt} setDisabled={this.setDisabled} />;
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
                              this.props.addToCartWithSelectedAtt( newProduct);
                            }}
                            disabled={this.state.isDisabled}
                          >
                            Add To Cart
                          </button>
                        ) : (
                          <button className="ButtonAdd" >Add To Cart</button>
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
    addToCartWithSelectedAtt: (item) => dispatch(addToCartWithSelectedAtt(item))
  };
};

export default withParams(
  connect(mapStateToProps, mapDispatchToProps)(ProductDescPage)
);
