import UserOrderPageComponent from "./components/UserOrderPageComponent";
import axios from "axios";

const getOrders = async () => {
  const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/orders`);
  return data;
};

const UserOrderPage = () => {
  return <UserOrderPageComponent getOrders={getOrders} />;
};

export default UserOrderPage;
