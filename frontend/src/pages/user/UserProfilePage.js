import UserProfilePageComponent from "./components/UserProfilePageComponent";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { setReduxUserState } from "../../redux/actions/userActions";

const updateUserApiRequest = async (
  name,
  lastName,
  phoneNumber,
  address,
  country,
  zipCode,
  city,
  state,
  password
) => {
  const { data } = axios.put("/api/users/profile", {
    name,
    lastName,
    phoneNumber,
    address,
    country,
    zipCode,
    city,
    state,
    password,
  });
  return data;
};

const fetchUser = async (id) => {
  // fetch user by id
  const { data } = axios.get("/api/users/profile" + id); // get user by id
  return data; // return user data
};

const UserProfilePage = () => {
  const dispatch = useDispatch(); // useDispatch hook to dispatch actions
  const { userInfo } = useSelector((state) => state.userLogin); // get user info from redux state
  return (
    <UserProfilePageComponent
      updateUserApiRequest={updateUserApiRequest}
      fetchUser={fetchUser}
      userInfofromRedux={userInfo}
      setReduxUserState={setReduxUserState}
      reduxDispatch={dispatch}
      localStorage={window.localStorage}
      sessionStorage={window.sessionStorage}
    />
  );
};

export default UserProfilePage;
