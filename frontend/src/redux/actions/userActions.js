import { LOGIN_USER, LOGOUT_USER } from "../constants/userConstants";
import axios from "axios";
export const setReduxUserState = (userCreated) => (dispatch) => {
  // setReduxUserState is an action that takes in userCreated as an argument
  dispatch({
    // dispatch an action
    type: LOGIN_USER, // with type LOGIN_USER
    payload: userCreated, // and payload userCreated
  });
};

export const logout = () => (dispatch) => {
  document.location.href = "/login";
  axios.get("/api/logout");
  localStorage.removeItem("userInfo");
  sessionStorage.removeItem("userInfo");
  localStorage.removeItem("cart");
  dispatch({ type: LOGOUT_USER });
};
