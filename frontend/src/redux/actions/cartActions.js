import * as actionTypes from "../constants/cartConstants";
import axios from "axios";

export const addToCart =
  (productId, quantity) => async (dispatch, getState) => {
    try {
      const { data } = await axios.get(`/api/products/get-one/${productId}`);

      const payload = {
        productID: data._id,
        name: data.name,
        price: Number(data.price),
        image: data.images[0] ?? null,
        count: Number(data.count),
        quantity: Number(quantity),
      };

      dispatch({
        type: actionTypes.ADD_TO_CART,
        payload: payload,
      });

      // Store the entire cart state
      localStorage.setItem("cart", JSON.stringify(getState().cart.cartItems));
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };
