import { LOGIN_USER } from "../constants/userConstants";

export const setReduxUserState = (userCreated) => (dispatch) => {
  // setReduxUserState is an action that takes in userCreated as an argument
  dispatch({
    // dispatch an action
    type: LOGIN_USER, // with type LOGIN_USER
    payload: userCreated, // and payload userCreated
  });
};
