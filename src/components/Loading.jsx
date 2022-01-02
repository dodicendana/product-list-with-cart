import { connect } from "react-redux";

const Loading = (props) => {
    const { isLoading } = props;
    
    return (
        isLoading &&
        <div className="overlay">            
            <div className="loading-popup">
                <div className="loading-image" />
                Loading...
            </div>
        </div>
    );
};

const mapStateToProps = state => {
    return {
        isLoading: state.product.isLoading
    }
}
const mapDispatchToProps = dispatch => {
    return {
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Loading);