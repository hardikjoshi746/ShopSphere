import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";
import { useState } from "react";
import { Link } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";

const RegisterPageComponent = ({
  registerUserApiRequest,
  dispatch,
  setReduxUserState,
}) => {
  const [validated, setValidated] = useState(false);
  const [registerUserResponseState, setRegisterUserResponseState] = useState({
    success: "",
    error: "",
    loading: false,
  });
  const [passwordMatchState, setPasswordMatchState] = useState(true);

  const onChange = () => {
    const password = document.querySelector("input[name=password]");
    const confirmPassword = document.querySelector(
      "input[name=confirmPassword]"
    );
    if (confirmPassword.value === password.value) {
      setPasswordMatchState(true);
    } else {
      setPasswordMatchState(false);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();
    const form = event.currentTarget.elements;
    const email = form.email.value;
    const name = form.name.value;
    const lastName = form.lastName.value;
    const password = form.password.value;
    if (
      event.currentTarget.checkValidity() === true &&
      password &&
      name &&
      lastName &&
      email &&
      form.password.value === form.confirmPassword.value
    ) {
      setRegisterUserResponseState({ loading: true, error: "", success: "" }); // Clear previous states
      registerUserApiRequest(name, lastName, email, password)
        .then((data) => {
          setRegisterUserResponseState({
            success: data.message,
            loading: false,
            error: "", // Clear any previous error
          });
          dispatch(setReduxUserState(data.userCreated));
        })
        .catch((err) =>
          setRegisterUserResponseState({
            error: err.response.data.message
              ? err.response.data.message
              : err.response.data,
            loading: false, // Make sure to set loading to false
            success: "", // Clear any previous success
          })
        );
    }
    setValidated(true);
  };
  return (
    <Container>
      <Row className="mt-5 justify-content-md-center">
        <Col md={6}>
          <h1>Register</h1>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="validationCustom01">
              <Form.Label>Your name</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Enter your name"
                name="name"
              />
              <Form.Control.Feedback type="invalid">
                Please enter a name
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicLastName">
              <Form.Label>Your last name</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Enter your last name"
                name="lastName"
              />
              <Form.Control.Feedback type="invalid">
                Please enter your last name
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                name="email"
                required
                type="email"
                placeholder="Enter email"
              />
              <Form.Control.Feedback type="invalid">
                Please anter a valid email address
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                name="password"
                required
                type="password"
                placeholder="Password"
                minLength={6}
                onChange={onChange}
                isInvalid={!passwordMatchState}
              />
              <Form.Control.Feedback type="invalid">
                Please anter a valid password
              </Form.Control.Feedback>
              <Form.Text className="text-muted">
                Password should have at least 6 characters
              </Form.Text>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPasswordRepeat">
              <Form.Label>Repeat Password</Form.Label>
              <Form.Control
                name="confirmPassword"
                required
                type="password"
                placeholder="Repeat Password"
                minLength={6}
                onChange={onChange}
                isInvalid={!passwordMatchState}
              />
              <Form.Control.Feedback type="invalid">
                Both passwords should match
              </Form.Control.Feedback>
            </Form.Group>

            <Row className="pb-2">
              <Col>
                Do you have an account already?
                <Link to={"/login"}> Login </Link>
              </Col>
            </Row>

            <Button type="submit">
              {registerUserResponseState &&
              registerUserResponseState.loading === true ? (
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />
              ) : (
                ""
              )}
              Submit
            </Button>
            <Alert show={!!registerUserResponseState?.error} variant="danger">
              {registerUserResponseState?.error ||
                "User with that email already exists!"}
            </Alert>
            <Alert
              show={registerUserResponseState?.success === "User created"}
              variant="info"
            >
              User created
            </Alert>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default RegisterPageComponent;
