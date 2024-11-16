import UserOrderPageComponent from "./components/UserOrderPageComponent";
import axios from "axios";

const getOrders = async () => {
  const { data } = await axios.get("/api/orders");
  return data;
};

const UserOrderPage = () => {
  return <UserOrderPageComponent getOrders={getOrders} />;
};

export default UserOrderPage;
