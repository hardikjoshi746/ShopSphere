import LoginPageComponent from "./components/LoginPageComponent";
import axios from "axios";

const Loginpage = () => {
  const loginApiRequest = async (email, password, doNotLogout) => {
    const { data } = await axios.post("/api/users/login", {
      email,
      password,
      doNotLogout,
    });
    return data;
  };

  return <LoginPageComponent loginApiRequest={loginApiRequest} />;
};

export default Loginpage;
