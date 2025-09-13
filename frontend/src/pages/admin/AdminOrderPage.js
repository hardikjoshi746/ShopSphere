import OrderPageComponent from "./components/OrdersPageComponent";
import axios from "axios";

const getOrders = async () => {
  const { data } = await axios.get(
    `${process.env.REACT_APP_API_URL}/orders/admin`
  );
  return data;
};

const AdminOrderPage = () => {
  return <OrderPageComponent getOrders={getOrders} />;
};

export default AdminOrderPage;
