import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import Badge from "react-bootstrap/Badge";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { InputGroup } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { Link } from "react-router-dom";
import { logout } from "../redux/actions/userActions";
import { useDispatch, useSelector } from "react-redux";

const HeaderComponent = () => {
  const dispatch = useDispatch();
  // Get userInfo with a default empty object to prevent undefined errors

  const userInfo =
    useSelector((state) => state.userRegisterLogin?.userInfo) || {};

  const itemsCount = useSelector((state) => state.cart?.itemsCount) || 0;

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <LinkContainer to="/">
          <Navbar.Brand href="/">Amazon</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <InputGroup>
              <DropdownButton id="dropdown-basic-button" title="All">
                <Dropdown.Item>Electronics</Dropdown.Item>
                <Dropdown.Item>Books</Dropdown.Item>
                <Dropdown.Item>Household</Dropdown.Item>
              </DropdownButton>

              <Form.Control type="text" placeholder="Normal text" />
              <Button variant="warning">
                <i className="bi bi-search"></i>
              </Button>
            </InputGroup>
          </Nav>
          <Nav>
            {userInfo?.isAdmin ? (
              <LinkContainer to="/admin/orders">
                <Nav.Link>
                  admin
                  <span className="position-absolute top-1 start-10 translate-middle p-2 bg-danger border border-light rounded-circle"></span>
                </Nav.Link>
              </LinkContainer>
            ) : userInfo?.name ? (
              <NavDropdown
                title={`${userInfo.name} ${userInfo.lastName || ""}`}
                id="collapsible-nav-dropdown"
              >
                <NavDropdown.Item
                  eventKey="/user/my-orders"
                  as={Link}
                  to="/user/my-orders"
                >
                  My Orders
                </NavDropdown.Item>

                <NavDropdown.Item eventKey="/user" as={Link} to="/user">
                  My Profile
                </NavDropdown.Item>

                <NavDropdown.Item onClick={() => dispatch(logout())}>
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <>
                <LinkContainer to="/login">
                  <Nav.Link>Login</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/register">
                  <Nav.Link>Register</Nav.Link>
                </LinkContainer>
              </>
            )}

            <LinkContainer to="/cart">
              <Nav.Link>
                <Badge bg="danger">{itemsCount === 0 ? "" : itemsCount}</Badge>
                <i className="bi bi-cart-dash">
                  <span className="ms-1">Cart</span>
                </i>
              </Nav.Link>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default HeaderComponent;
