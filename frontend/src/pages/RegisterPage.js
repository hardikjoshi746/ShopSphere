import RegisterPageComponent from "./components/RegisterPageComponent";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setReduxUserState } from "../redux/actions/userActions";

const registerUserApiRequest = async (name, lastName, email, password) => {
  const { data } = await axios.post("/api/users/register", {
    name,
    lastName,
    email,
    password,
  });
  sessionStorage.setItem("userInfo", JSON.stringify(data.userCreated));
  if (data.success === "User created") window.location.href = "/";
  return data;
};

const RegisterPage = () => {
  const dispatch = useDispatch();
  return (
    <RegisterPageComponent
      registerUserApiRequest={registerUserApiRequest}
      dispatch={dispatch}
      setReduxUserState={setReduxUserState}
    />
  );
};

export default RegisterPage;
