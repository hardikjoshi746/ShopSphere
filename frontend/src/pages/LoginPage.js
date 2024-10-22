import LoginPageComponent from "./components/LoginPageComponent";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setReduxUserState } from "../redux/actions/userActions";

const Loginpage = () => {
  const reduxDispatch = useDispatch();
  const loginApiRequest = async (email, password, doNotLogout) => {
    const { data } = await axios.post("/api/users/login", {
      email,
      password,
      doNotLogout,
    });
    if (data.userLoggedIn.doNotLogout)
      localStorage.setItem(
        "userInfo",
        JSON.stringify(data.userLoggedIn)
      ); // Save user info to local storage
    else sessionStorage.setItem("userInfo", JSON.stringify(data.userLoggedIn)); // Save user info to session storage
    return data;
  };

  return (
    <LoginPageComponent
      loginApiRequest={loginApiRequest}
      reduxDispatch={reduxDispatch}
      setReduxUserState={setReduxUserState}
    />
  );
};

export default Loginpage;
