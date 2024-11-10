import * as actionTypes from "../constants/cartConstants";
import axios from "axios";

export const addToCart = (productID, quantity) => async (dispatch) => {
  const { data } = await axios.get(`/api/products/get-one/${productID}`);
  dispatch({
    type: actionTypes.ADD_TO_CART,
    payload: {
      productID: data._id,
      name: data.name,
      image: data.image ?? null,
      price: data.price,
      countInStock: data.countInStock,
      quantity,
    },
  });
};
