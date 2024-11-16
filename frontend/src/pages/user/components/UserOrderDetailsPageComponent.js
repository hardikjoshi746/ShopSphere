import {
  Container,
  Row,
  Col,
  Form,
  Alert,
  ListGroup,
  Button,
} from "react-bootstrap";
import CartItemComponent from "../../../components/CartItemComponent";
import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";

const UserOrderDetailPageComponent = ({
  userInfo,
  getUser,
  getOrder,
  loadScript,
}) => {
  const { id } = useParams();
  const [userAddress, setUserAddress] = useState({});
  const [PaymentMetod, setPaymentMetod] = useState("");
  const [isPaid, setIsPaid] = useState(false);
  const [orderButtonMessage, setOrderButtonMessage] = useState("");
  const [cartSubtotal, setCartSubtotal] = useState(0);
  const [isDelivered, setIsDelivered] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  const paypalContainer = useRef();
  console.log(paypalContainer);

  useEffect(() => {
    getUser()
      .then((data) => {
        setUserAddress({
          address: data.address || "N/A",
          city: data.city || "N/A",
          postalCode: data.postalCode || "N/A",
          country: data.country || "N/A",
          phoneNumber: data.phoneNumber || "N/A",
          zipCode: data.zipCode || "N/A",
          state: data.state || "N/A",
        });
      })
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    getOrder(id)
      .then((data) => {
        setPaymentMetod(data.paymentMethod);
        setCartItems(data.cartItems);
        setCartSubtotal(data.cartSubtotal);
        data.isDelivered
          ? setIsDelivered(data.deliveredAt)
          : setIsDelivered(false);
        data.isPaid ? setIsPaid(data.paidAt) : setIsPaid(false);
        if (data.isPaid) {
          setOrderButtonMessage("Your order is finished");
          setButtonDisabled(true);
        } else {
          if (data.paymentMethod === "pp") {
            setOrderButtonMessage("Pay for your order");
          } else if (data.paymentMethod === "cod") {
            setButtonDisabled(true);
            setOrderButtonMessage("You will pay on delivery");
          }
        }
      })
      .catch((error) => console.log(error));
  }, []);

  const orderHandler = () => {
    setButtonDisabled(true);
    if (PaymentMetod === "pp") {
      setOrderButtonMessage("Click the button to be, Redirected to PayPal...");
    }
    if (!isPaid) {
      loadScript({
        "client-id":
          "AZ8t3d31P_XkqvlidnnUU5iqgYq5QpF57oG-8Ek6D6nWSgzRvnHL-CnHr9OFU4e72S3j_VgDwuiNNKkS",
      })
        .then((paypal) => {
          paypal.Buttons({}).render("#paypal-container-element");
        })
        .catch((error) => console.log("failed to load paypal", error));
    } else {
      setOrderButtonMessage("Thank you for your order");
    }
  };

  return (
    <Container fluid>
      <Row className="mt-4">
        <h1>Order Details</h1>
        <Col md={8}>
          <br />
          <Row>
            <Col md={6}>
              <h2>Shipping</h2>
              <b>Name</b>: {userInfo.name} {userInfo.lastName} <br />
              <b>Address</b>: {userAddress.address} {userAddress.city}
              {userAddress.state} {userAddress.zip} <br />
              <b>Phone</b>: {userAddress.phoneNumber}
            </Col>
            <Col md={6}>
              <h2>Payment method</h2>
              <Form.Select value={PaymentMetod} disabled={true}>
                <option value="pp">PayPal</option>
                <option value="cod">
                  Cash On Delivery (delivery may be delayed)
                </option>
              </Form.Select>
            </Col>
            <Row>
              <Col>
                <Alert
                  className="mt-3"
                  variant={isDelivered ? "success" : "danger"}
                >
                  {isDelivered ? (
                    <>delivered at {isDelivered}</>
                  ) : (
                    <>Not delivered</>
                  )}
                </Alert>
              </Col>
              <Col>
                <Alert className="mt-3" variant={isPaid ? "success" : "danger"}>
                  {isPaid ? <>paid at {isPaid}</> : <>Not paid</>}
                </Alert>
              </Col>
            </Row>
          </Row>
          <br />
          <h2>Order items</h2>
          <ListGroup variant="flush">
            {cartItems.map((item, idx) => (
              <CartItemComponent item={item} key={idx} orderCreated={true} />
            ))}
          </ListGroup>
        </Col>
        <Col md={4}>
          <ListGroup>
            <ListGroup.Item>
              <h3>Order summary</h3>
            </ListGroup.Item>
            <ListGroup.Item>
              Items price (after tax):{" "}
              <span className="fw-bold">${cartSubtotal}</span>
            </ListGroup.Item>
            <ListGroup.Item>
              Shipping: <span className="fw-bold">included</span>
            </ListGroup.Item>
            <ListGroup.Item>
              Tax: <span className="fw-bold">included</span>
            </ListGroup.Item>
            <ListGroup.Item className="text-danger">
              Total price: <span className="fw-bold">${cartSubtotal}</span>
            </ListGroup.Item>
            <ListGroup.Item>
              <div className="d-grid gap-2">
                <Button
                  size="lg"
                  variant="danger"
                  onClick={orderHandler}
                  type="button"
                  disabled={buttonDisabled}
                >
                  {orderButtonMessage}
                </Button>
                <div style={{ position: "relative", zIndex: 1 }}>
                  <div
                    ref={paypalContainer}
                    id="paypal-container-element"
                  ></div>
                </div>
              </div>
            </ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>
    </Container>
  );
};

export default UserOrderDetailPageComponent;
