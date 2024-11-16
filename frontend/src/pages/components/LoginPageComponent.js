import { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";

const LoginPageComponent = ({
  loginApiRequest,
  reduxDispatch,
  setReduxUserState,
}) => {
  const [validated, setValidated] = useState(false);
  const [loginUserResponseState, setLoginUserResponseState] = useState({
    success: "",
    error: "",
    loading: false,
  });

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    event.stopPropagation();

    const form = event.currentTarget.elements;
    const email = form.email.value;
    const password = form.password.value;
    const doNotLogout = form.doNotLogout.checked;

    if (event.currentTarget.checkValidity() === true && email && password) {
      try {
        console.log("Starting login process...");
        setLoginUserResponseState({ loading: true, error: "", success: "" });

        const data = await loginApiRequest(email, password, doNotLogout);
        console.log("Login API response:", data);

        if (data.userLoggedIn) {
          reduxDispatch(setReduxUserState(data.userLoggedIn));
          setLoginUserResponseState({
            loading: false,
            error: "",
            success: data.success,
          });

          console.log("Navigating user...");
          if (!data.userLoggedIn.isAdmin) {
            navigate("/", { replace: true });
          } else {
            navigate("/admin/orders", { replace: true });
          }
        }
      } catch (err) {
        console.error("Login error:", err);
        setLoginUserResponseState({
          loading: false,
          success: "",
          error: err.response?.data?.message || "Login failed",
        });
      }
    }
    setValidated(true);
  };

  return (
    <Container>
      <Row className="mt-5 justify-content-md-center">
        <Col md={6}>
          <h1>Login</h1>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                name="email"
                required
                type="email"
                placeholder="Enter email"
                disabled={loginUserResponseState.loading}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                name="password"
                required
                type="password"
                placeholder="Password"
                disabled={loginUserResponseState.loading}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
              <Form.Check
                name="doNotLogout"
                type="checkbox"
                label="Do not logout"
                disabled={loginUserResponseState.loading}
              />
            </Form.Group>

            <Row className="pb-2">
              <Col>
                Don't you have an account?
                <Link to={"/register"}> Register </Link>
              </Col>
            </Row>

            <Button
              variant="primary"
              type="submit"
              disabled={loginUserResponseState.loading}
            >
              {loginUserResponseState.loading ? (
                <>
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                    className="me-2"
                  />
                  Logging in...
                </>
              ) : (
                "Login"
              )}
            </Button>

            {loginUserResponseState.error && (
              <Alert variant="danger" className="mt-3">
                {loginUserResponseState.error}
              </Alert>
            )}
            {loginUserResponseState.success && (
              <Alert variant="success" className="mt-3">
                {loginUserResponseState.success}
              </Alert>
            )}
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginPageComponent;
