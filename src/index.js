import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
// Components
import Home from './components/routes/Home';
import Cart from './components/routes/Cart';
import Loading from './components/Loading';
import Error from './components/Error';
// Redux
import productReducer from './reducers/product.reducer'
import './styles/index.scss';
import reportWebVitals from './reportWebVitals';


const rootReducer = combineReducers({
  product: productReducer,
});
const store = createStore(rootReducer, applyMiddleware(thunk));

render(
  <React.StrictMode>
    <Provider store={store}>
      <Loading />
      <Error />
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Home />}/>
          <Route path="/cart" element={<Cart />}/>
          <Route path="*" element={<Navigate to={"/"} />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
