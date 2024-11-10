import { configureStore, combineReducers } from "@reduxjs/toolkit";
import thunk from "redux-thunk";

import { cartReducer } from "./reducers/cartReducers";
import { userRegisterLoginReducer } from "./reducers/userReducers";

const reducer = combineReducers({
  cart: cartReducer,
  UserRegisterLogin: userRegisterLoginReducer,
});

const cartItemsInLocalStorage = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart"))
  : [];

// Add back the userInfoLocalStorage definition
const userInfoLocalStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : sessionStorage.getItem("userInfo")
  ? JSON.parse(sessionStorage.getItem("userInfo"))
  : {};

// Calculate initial totals from localStorage
const initialItemsCount = cartItemsInLocalStorage.reduce(
  (total, item) => total + Number(item.quantity || 0),
  0
);

const initialCartSubtotal = cartItemsInLocalStorage.reduce(
  (total, item) => total + Number(item.price || 0) * Number(item.quantity || 0),
  0
);

const INITIAL_STATE = {
  cart: {
    cartItems: cartItemsInLocalStorage,
    itemsCount: initialItemsCount,
    cartSubtotal: initialCartSubtotal,
  },
  UserRegisterLogin: {
    userInfo: userInfoLocalStorage,
  },
};

const store = configureStore({
  reducer,
  preloadedState: INITIAL_STATE,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});

export default store;
