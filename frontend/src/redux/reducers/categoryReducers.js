import * as actionTypes from "../constants/categoryConstants";

export const getCategoriesReducer = (state = { categories: [] }, action) => {
  // Create getCategoriesReducer with state and action parameters
  // Add default state
  switch (
    action.type // Add switch statement
  ) {
    case actionTypes.GET_CATEGORIES_REQUEST: // Add case for GET_CATEGORIES_REQUEST
      return {
        // Return new state
        ...state, // Spread operator to copy all properties from state
        categories: action.payload, // Set categories to the payload from the action
      };
    default:
      return state; // Return state
  }
};
