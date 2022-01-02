import * as productService from '../services/product.service'

// States
const INITIAL_STATE = {
    productList: [],
    cartList: [],
    isLoading: false,
    error: null
};

// Reducers
const reducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'SET_PRODUCTS':
            return {
                ...state,
                productList: action.value,
            };
        case 'SET_CART':
            return {
                ...state,
                cartList: action.value,
            };
        case 'SET_LOADING':
            return {
                ...state,
                isLoading: action.value,
            };
        case 'SET_ERROR':
            return {
                ...state,
                error: action.value,
            };
        default: return state;
    }
};

// Actions
const setProducts = (productList) => {
    return {
        type: 'SET_PRODUCTS',
        value: productList
    };
};
const setCart = (cartList) => {
    return {
        type: 'SET_CART',
        value: cartList
    };
};
const setIsLoading = (value) => {
    return {
        type: 'SET_LOADING',
        value: value
    };
};
export const setError = (value) => {
    return {
        type: 'SET_ERROR',
        value: value
    };
};

// Functions
export const getProducts = () => {
    return async (dispatch, getState) => {
        try {
            dispatch(setIsLoading(true));
            dispatch(setError(null));
            const productListRes = await productService.getProducts();
            if (productListRes[1])
                dispatch(setError(productListRes[1]));
            else {
                const cartList = getState().product.cartList.slice();
                const productList = productListRes[0].data.map((product) => {
                    const addedToCart = cartList.find((cartProduct) => cartProduct.productId === product.productId) !== undefined;
                    return {
                        ...product,
                        addedToCart: addedToCart
                    }
                });
                dispatch(setProducts(productList));
                dispatch(setIsLoading(false));
                dispatch(setError(null));
            }
        } catch (error) {
            dispatch(setIsLoading(false));
            dispatch(setError(error));
        }
    }
}
export const addToCart = (product) => {
    return (dispatch, getState) => {
        try {
            dispatch(setIsLoading(true));
            dispatch(setError(null));
            const cartList = getState().product.cartList.slice();
            const productList = getState().product.productList.slice();
            const addedToCart = cartList.find((cartProduct) => cartProduct.productId === product.productId) !== undefined;
            if (addedToCart)
                throw "Product Already In The Cart";
            else {                
                const newProductList = productList.map((oldProduct) => {
                    let newProduct = {
                        ...oldProduct,
                        addedToCart: (oldProduct.productId === product.productId ? true : oldProduct.addedToCart)
                    };
                    if(oldProduct.productId === product.productId)
                        cartList.push(newProduct);
                    return newProduct;
                });
                dispatch(setProducts(newProductList));
                dispatch(setCart(cartList));
                dispatch(setIsLoading(false));
                dispatch(setError(null));
            }
        } catch (error) {
            dispatch(setIsLoading(false));
            dispatch(setError(error));
        }
    }
}
export const removeFromCart = (product) => {
    return (dispatch, getState) => {
        try {
            dispatch(setIsLoading(true));
            dispatch(setError(null));
            const cartList = getState().product.cartList.slice();
            const productList = getState().product.productList.slice();
            const addedToCart = cartList.find((cartProduct) => cartProduct.productId === product.productId) !== undefined;
            if (!addedToCart)
                throw "Product Does Not In The Cart";
            else {
                const newProductList = productList.map((oldProduct) => {
                    let newProduct = {
                        ...oldProduct
                    };
                    if (oldProduct.productId === product.productId) {
                        newProduct = {
                            ...newProduct,
                            addedToCart: false
                        };
                    }
                    return newProduct;
                });
                const newCartList = [];
                cartList.map((oldCartProduct) => {
                    if (oldCartProduct.productId !== product.productId)
                        newCartList.push(oldCartProduct)
                });
                dispatch(setProducts(newProductList));
                dispatch(setCart(newCartList));
                dispatch(setIsLoading(false));
                dispatch(setError(null));
            }
        } catch (error) {
            dispatch(setIsLoading(false));
            dispatch(setError(error));
        }
    }
}

export default reducer;