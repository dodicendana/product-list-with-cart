import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { getProducts } from "../../reducers/product.reducer"

import ProductCard from "../ProductCard";

const Home = (props) => {
  const navigate = useNavigate();
  const { productList, getProducts, cartList } = props;

  useEffect(() => {
    getProducts()
  }, []);

  const goToCart = () => {
    navigate("/cart");
  };

  const goToHome = () => {
    navigate("/")
  };

  const CartCounter = () => {
    return <div className="home-cart-small-items-counter">{ cartList.length > 99 ? `99+` : cartList.length }</div>
  }

  return (
    <div className="home-container">
      <div className="home-header-container">
        <div onClick={() => goToHome()} className="home-title">Home</div>
        <div className="home-cart-button" onClick={() => goToCart()}>
          { cartList && cartList.length > 0 && <CartCounter />}
        </div>
      </div>
      <div className="home-products-container">
        { productList && productList.length > 0 ? productList.map((product, idx) => {
          return <ProductCard key={idx} product={product} />
        }) : "No Item Found" }
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    productList: state.product.productList,
    cartList: state.product.cartList,
  }
}
const mapDispatchToProps = dispatch => {
  return {
    getProducts: () => dispatch(getProducts())
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Home);