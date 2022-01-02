import { connect } from "react-redux";
import { setError } from "../reducers/product.reducer"

const Loading = (props) => {
    const { error, setError } = props;

    const clearError = () => {
        setError(null);
    }
    
    return (
        error &&
        <div className="overlay">            
            <div className="error-popup">
                <div onClick={() => clearError()} className="error-close-x">X</div>
                <div className="error-image" />
                <div className="error-message">{error && error.toString()}</div>
                <div onClick={() => clearError()} className="error-close-button">Close</div>
            </div>
        </div>
    );
};

const mapStateToProps = state => {
    return {
        error: state.product.error
    }
}
const mapDispatchToProps = dispatch => {
    return {
        setError: (value) => dispatch(setError(value))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Loading);