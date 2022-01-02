import { connect } from "react-redux";
import { removeFromCart, addToCart } from "../reducers/product.reducer";

const ProductCard = (props) => {
    const { product, addToCart, removeFromCart } = props;

    return (
        <div className="card">
            <div className="card-image-container">
                <img className="card-image" src={product.productImage} alt="product-image" />
            </div>
            <div className="card-image-content-container">
                <div className="card-name">{product.productName}</div>
                <div className="card-desc">{product.productDesc}</div>
                <div className="card-lower">
                    <div className="card-price">{`$ ${product.productPrice}.00`}</div>
                    {
                        product.addedToCart ?
                            <div className="card-indicator remove" onClick={() => removeFromCart(product)}>Remove from Cart</div> :
                            <div className="card-indicator add" onClick={() => addToCart(product)}>Add to Cart</div>
                    }
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = state => {
    return {
    }
}
const mapDispatchToProps = dispatch => {
    return {
        removeFromCart: (product) => dispatch(removeFromCart(product)),
        addToCart: (product) => dispatch(addToCart(product))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ProductCard);