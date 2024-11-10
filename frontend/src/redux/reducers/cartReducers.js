import * as actionTypes from "../constants/cartConstants";

const CART_INITIAL_STATE = {
  cartItems: [],
  itemsCount: 0, // ensure consistent naming
  cartSubtotal: 0, // ensure consistent naming
};

export const cartReducer = (state = CART_INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.ADD_TO_CART:
      const productBeingAddedToCart = action.payload;

      const productAlreadyExistsInState = state.cartItems.find(
        (x) => x.productID === productBeingAddedToCart.productID
      );

      let updatedCartItems;
      if (productAlreadyExistsInState) {
        updatedCartItems = state.cartItems.map((x) =>
          x.productID === productAlreadyExistsInState.productID
            ? productBeingAddedToCart
            : x
        );
      } else {
        updatedCartItems = [...state.cartItems, productBeingAddedToCart];
      }

      // Calculate totals after cart items are updated
      const newItemsCount = updatedCartItems.reduce(
        (total, item) => total + Number(item.quantity),
        0
      );

      const newCartSubtotal = updatedCartItems.reduce(
        (total, item) => total + Number(item.price) * Number(item.quantity),
        0
      );

      return {
        ...state,
        cartItems: updatedCartItems,
        itemsCount: newItemsCount,
        cartSubtotal: newCartSubtotal,
      };

    default:
      return state;
  }
};
