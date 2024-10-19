import OrderPageComponent from "./components/OrdersPageComponent";
import axios from "axios";

const getOrders = async () => {
  const { data } = await axios.get("/api/orders/admin");
  return data;
};

const AdminOrderPage = () => {
  return <OrderPageComponent getOrders={getOrders} />;
};

export default AdminOrderPage;
