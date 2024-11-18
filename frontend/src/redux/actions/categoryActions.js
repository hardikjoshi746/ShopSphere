import * as actionTypes from "../constants/categoryConstants";

import axios from "axios";

export const getCategories = () => async (dispatch) => {
  // Create getCategories action creator
  const { data } = await axios.get("/api/categories"); // Fetch data from /api/categories
  dispatch({
    // Dispatch action object
    type: actionTypes.GET_CATEGORIES_REQUEST, // Set type to GET_CATEGORIES_REQUEST
    payload: data, // Set payload to data
  });
};
