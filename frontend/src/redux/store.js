import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { counterReducer } from "./reducers/cartReducers";
import thunk from "redux-thunk";

const reducer = combineReducers({
  cart: counterReducer,
});

const store = configureStore({
  reducer, // Pass the combined reducer object here
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});

// Dispatching an action to test the reducer
store.dispatch({ type: "ADD_TO_CART", value: 0 });

// Logging the state
console.log(store.getState()); // Logs the current state

export default store;
