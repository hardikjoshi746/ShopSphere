import { configureStore, combineReducers } from "@reduxjs/toolkit";
import thunk from "redux-thunk";

import { cartReducer } from "./reducers/cartReducers";
import { userRegisterLoginReducer } from "./reducers/userReducers";

const reducer = combineReducers({
  cart: cartReducer,
  UserRegisterLogin: userRegisterLoginReducer,
});

const userInfoLocalStorage = localStorage.getItem("userInfo") // Check if user info is in local storage
  ? JSON.parse(localStorage.getItem("userInfo")) // Parse the user info from local storage
  : sessionStorage.getItem("userInfo") // Check if user info is in session storage
  ? JSON.parse(sessionStorage.getItem("userInfo")) // Parse the user info from session storage
  : {};

const INITIAL_STATE = {
  // Set the initial state
  cart: {
    cartItems: [],
    itemCount: 0,
    cartSubTotal: 0,
  },
  UserRegisterLogin: {
    // Set the initial state for the UserRegisterLogin reducer
    userInfo: userInfoLocalStorage, // Set the user info from local or session storage
  },
};

const store = configureStore({
  reducer,
  preloadedState: INITIAL_STATE, // Set the initial state here
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});

// Dispatching an action with the correct type and payload
store.dispatch({ type: "ADD_TO_CART", payload: 1 }); // Example action with a payload

// Logging the state
console.log(store.getState());

export default store;
