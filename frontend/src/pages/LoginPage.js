import LoginPageComponent from "./components/LoginPageComponent";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setReduxUserState } from "../redux/actions/userActions";

const LoginPage = () => {
  const reduxDispatch = useDispatch();

  const loginApiRequest = async (email, password, doNotLogout) => {
    try {
      console.log("Making login API request...");
      const { data } = await axios.post(
        `${process.env.REACT_APP_API_URL}/users/login`,
        { email, password, doNotLogout },
        { headers: { "Content-Type": "application/json" } }
      );

      console.log("API response received:", data);

      if (data.userLoggedIn) {
        const userInfo = JSON.stringify(data.userLoggedIn);
        if (doNotLogout) {
          localStorage.setItem("userInfo", userInfo);
        } else {
          sessionStorage.setItem("userInfo", userInfo);
        }
        reduxDispatch(setReduxUserState(data.userLoggedIn)); // Update Redux state
      }

      return data;
    } catch (error) {
      console.error("Login API error:", error);
      throw error;
    }
  };

  return (
    <LoginPageComponent
      loginApiRequest={loginApiRequest}
      reduxDispatch={reduxDispatch}
      setReduxUserState={setReduxUserState}
    />
  );
};

export default LoginPage;
