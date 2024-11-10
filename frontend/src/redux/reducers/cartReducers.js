import * as actionTypes from "../constants/cartConstants";

const CART_INITIAL_STATE = {
  // initial state
  cartItems: [], // cartItems is an empty array
  itemCount: 0, // itemCount is 0
  cartSubTotal: 0, // cartSubTotal is 0
};
export const cartReducer = (state = CART_INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.ADD_TO_CART:
      const productBeingAddedToCart = action.payload; // get the product being added to the cart

      const productAlreadyExistInState = state.cartItems.find(
        (x) => x.productID === productBeingAddedToCart.productID
      );
      const currentState = { ...state };

      if (productAlreadyExistInState) {
        currentState.itemCount = 0;
        currentState.cartSubTotal = 0;
        currentState.cartItems = state.cartItems.map((x) => {
          // map through the cartItems
          if (x.productID === productBeingAddedToCart.productID) {
            // if the productID of the current item in the cartItems array is equal to the productID of the product being added to the cart
            currentState.itemCount += Number(productBeingAddedToCart.quantity); // add the quantity of the product being added to the cart to the itemCount
            const sum =
              Number(productBeingAddedToCart.quantity) *
              Number(productBeingAddedToCart.price); // calculate the sum of the product being added to the cart
            currentState.cartSubTotal += sum; // add the sum to the cartSubTotal
          } else {
            // if the productID of the current item in the cartItems array is not equal to the productID of the product being added to the cart
            currentState.itemCount += Number(x.quantity); // add the quantity of the current item in the cartItems array to the itemCount
            const sum = Number(x.quantity) * Number(x.price); // calculate the sum of the current item in the cartItems array
            currentState.cartSubTotal += sum; // add the sum to the cartSubTotal
          }
          return x.productID === productAlreadyExistInState.productID
            ? productBeingAddedToCart
            : x; // if the productID of the current item in the cartItems array is equal to the productID of the product being added to the cart, return the product being added to the cart, otherwise return the current item in the cartItems array
        });
      } else {
        currentState.itemCount = Number(productBeingAddedToCart.quantity); // set the itemCount to the quantity of the product being added to the cart
        const sum =
          Number(productBeingAddedToCart.quantity) *
          Number(productBeingAddedToCart.price); // calculate the sum of the product being added to the cart
        currentState.cartSubTotal += sum; // add the sum to the cartSubTotal
        currentState.cartItems = [...state.cartItems, productBeingAddedToCart]; // add the product being added to the cart to the cartItems array
      }

      return currentState;
    default:
      return state;
  }
};
