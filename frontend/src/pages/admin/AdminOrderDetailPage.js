import OrderDetailPageComponent from "./components/OrderDetailsPageComponenet";
import axios from "axios";

const getOrder = async (id) => {
  const { data } = await axios.get("/api/orders/user/" + id); // get order details
  return data;
};

const markDelivered = async (id) => {};

const AdminOrderDetailPage = () => {
  return <OrderDetailPageComponent getOrder={getOrder} />;
};

export default AdminOrderDetailPage;
