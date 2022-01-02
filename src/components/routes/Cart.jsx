import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";

import { setError } from "../../reducers/product.reducer"

import ProductCard from "../ProductCard";

const Cart = (props) => {
    const navigate = useNavigate();
    const { cartList, setError } = props

    const goToHome = () => {
        navigate("/")
    };

    const goToCart = () => {
        navigate("/cart");
    };
    
    const handleCheckout = () => {
        if (cartList.length > 0)
            setError("Oops, something went wrong, please try again later!");
    }

    return (
        <div className="cart-container">
            <div className="cart-header-container">
                <div onClick={() => goToCart()} className="cart-title">Cart</div>                
                <div className="cart-home-button" onClick={() => goToHome()}></div>
            </div>            
            <div className="cart-products-container">
                { cartList && cartList.length > 0 ? 
                    cartList.map((product, idx) => {
                        return <ProductCard key={idx} product={product} />;
                    })
                    : "No Item in Cart"}
            </div>            
            <div className="cart-checkout-button-container">
                <div
                    className={"cart-checkout-button " + (cartList.length <= 0 && "disabled ")}
                    onClick={() => handleCheckout()}>Checkout</div>
            </div>
        </div>
    );
};

const mapStateToProps = state => {
    return {
      cartList: state.product.cartList,
    }
  }
  const mapDispatchToProps = dispatch => {
    return {
        setError: (value) => dispatch(setError(value))
    }
  }
  export default connect(mapStateToProps, mapDispatchToProps)(Cart);