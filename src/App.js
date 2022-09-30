import { Routes, Route } from "react-router-dom";
import React from "react";
import ProductListPage from "../src/Components/ProductList/ProductListPage";
import NavBar from "./Components/NavBar/NavBar";
import ClothesProductListPage from "./Components/ClothesProductList/ClothesProductListPage";
import TechProductsListPage from "./Components/TechProductsList/TechProductsListPage";
import CartPage from "./Components/CartPage/CartPage";

import ProductDescPage from "./Components/ProductDescriptionPage/ProductDescPage";

import { connect } from "react-redux";

class App extends React.Component {
  componentDidMount() {
    document.body.style.overflow = this.props.isOverflow ? "hidden" : "";
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.isOverflow !== this.props.isOverflow) {
      document.body.style.overflow = this.props.isOverflow ? "hidden" : "";
    }
  }

  render() {
    return (
      <>
        <NavBar />

        <Routes>
          <Route exact path="/" element={<ProductListPage />} />
          <Route path="/clothes" element={<ClothesProductListPage />} />
          <Route path="/tech" element={<TechProductsListPage />} />
          <Route path="/cartPage" element={<CartPage />} />
          <Route path="/:id" element={<ProductDescPage />} />
          <Route path="/clothes/:id" element={<ProductDescPage />} />
          <Route path="/tech/:id" element={<ProductDescPage />} />
        </Routes>
      </>
    );
  }
}

function mapStateToProps(state) {
  const { isOverflow } = state;
  return { isOverflow: isOverflow };
}

export default connect(mapStateToProps)(App);
