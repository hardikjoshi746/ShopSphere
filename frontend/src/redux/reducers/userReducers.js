import { LOGIN_USER, LOGOUT_USER } from "../constants/userConstants";

export const userRegisterLoginReducer = (state = {}, action) => {
  // userRegisterLoginReducer is a reducer that takes in state and action as arguments
  switch (
    action.type // switch statement that checks the type of action
  ) {
    case LOGIN_USER: // if the action type is LOGIN_USER
      return {
        // return the new state
        ...state,
        userInfo: action.payload,
      };
    case LOGOUT_USER: // if the action type is LOGOUT_USER
      return {}; // return an empty
    default: // if the action type is not LOGIN_USER
      return state;
  }
};
