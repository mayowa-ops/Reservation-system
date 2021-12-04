//import React from 'react'
import { Nav, Navbar, NavDropdown, Container } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../actions/userActions";
const Header = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const logoutHandler = () => {
    dispatch(logout());
    history.push("/home");
  };

  return (
    <Navbar bg="light" expand="lg" variant="light">
      <Container>
        <Navbar.Brand>
          <Link to="/">Island Grill</Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Link href="/home">
              <Link to="/home">Home</Link>
            </Nav.Link>

            <Nav.Link href="/reservationpage">
              <Link to="/reservationpage">Reservation Page</Link>
            </Nav.Link>

            {userInfo ? (
              <NavDropdown title={userInfo?.username} id="basic-nav-dropdown">
                <NavDropdown.Item href="/profile">My Profile</NavDropdown.Item>

                <NavDropdown.Divider />
                <NavDropdown.Item onClick={logoutHandler}>
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <Nav>
                <Nav.Link href="/login">
                  <Link to="/login">Login</Link>
                </Nav.Link>

                <Nav.Link href="/register">
                  <Link to="/register">Register</Link>
                </Nav.Link>
              </Nav>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
