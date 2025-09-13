import OrderDetailPageComponent from "./components/OrderDetailsPageComponenet";
import axios from "axios";

const getOrder = async (id) => {
  const { data } = await axios.get(
    `${process.env.REACT_APP_API_URL}/orders/user/${id}`
  ); // get order details
  return data;
};

const markDelivered = async (id) => {
  const { data } = await axios.put(
    `${process.env.REACT_APP_API_URL}/orders/delivered/${id}`
  ); // mark order as delivered
  if (data) {
    return data;
  }
};

const AdminOrderDetailPage = () => {
  return (
    <OrderDetailPageComponent
      getOrder={getOrder}
      markDelivered={markDelivered}
    />
  );
};

export default AdminOrderDetailPage;
