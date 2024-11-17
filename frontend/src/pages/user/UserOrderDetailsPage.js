import UserOrderDetailPageComponent from "./components/UserOrderDetailsPageComponent";
import { useSelector } from "react-redux";
import axios from "axios";
import { loadScript } from "@paypal/paypal-js";

const getOrder = async (orderId) => {
  const { data } = await axios.get("/api/orders/user/" + orderId);
  return data;
};

const loadPayPalScript = (
  cartSubtotal,
  cartItems,
  OrderId,
  UpdateStateAfterOrder
) => {
  loadScript({
    "client-id":
      "AZ8t3d31P_XkqvlidnnUU5iqgYq5QpF57oG-8Ek6D6nWSgzRvnHL-CnHr9OFU4e72S3j_VgDwuiNNKkS",
  })
    .then((paypal) => {
      paypal
        .Buttons(
          buttons(cartSubtotal, cartItems, OrderId, UpdateStateAfterOrder)
        )
        .render("#paypal-container-element");
    })
    .catch((err) => {
      console.error("failed to load the PayPal JS SDK script", err);
    });
};

const buttons = (cartSubtotal, cartItems, orderId, UpdateStateAfterOrder) => {
  return {
    createOrder: function (data, actions) {
      return actions.order.create({
        purchase_units: [
          {
            amount: {
              value: cartSubtotal,
              breakdown: {
                item_total: {
                  currency_code: "USD",
                  value: cartSubtotal,
                },
              },
            },
            items: cartItems.map((product) => {
              return {
                name: product.name,
                unit_amount: {
                  currency_code: "USD",
                  value: product.price,
                },
                quantity: product.quantity,
              };
            }),
          },
        ],
      });
    },

    onApprove: function (data, actions) {
      return actions.order.capture().then(function (orderData) {
        var transaction = orderData.purchase_units[0].payments.captures[0];
        if (
          transaction.status === "COMPLETED" &&
          Number(transaction.amount.value) === Number(cartSubtotal)
        ) {
          updateOrder(orderId)
            .then((data) => {
              if (data.isPaid) {
                UpdateStateAfterOrder(data.paidAt);
              }
            })
            .catch((err) => console.log(err));
        }
      });
    },
    onCancel: onCancelHandler,
    onError: onErrorHandler,
  };
};

// const createPaypalOrderHandler = function () {
//   console.log("createPaypalOrderHandler");
// };

const onCancelHandler = function () {
  console.log("cancelHandler");
};

const onErrorHandler = function (error) {
  console.log("errorHandler", error);
};

const updateOrder = async (orderId) => {
  const { data } = await axios.put("/api/orders/paid/" + orderId);
  return data;
};

const UserOrderDetailPage = () => {
  const userInfo = useSelector((state) => state.userRegisterLogin.userInfo);

  const getUser = async () => {
    const { data } = await axios.get("/api/users/profile/" + userInfo._id);
    return data;
  };

  return (
    <UserOrderDetailPageComponent
      userInfo={userInfo}
      getUser={getUser}
      getOrder={getOrder}
      loadPayPalScript={loadPayPalScript}
    />
  );
};

export default UserOrderDetailPage;

//     "client-id": "",
