import React, { useState, useEffect } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { register } from "../../actions/userActions";
import ErrorMessage from "../../components/ErrorMessage";
import Loading from "../../components/Loading";
import MainScreen from "../../components/MainScreen";
//import axios from "axios";

const RegisterScreen = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [username, setUserName] = useState("");

  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [mailingaddress, setMailingAddress] = useState("");
  const [billingaddress, setBillingAddress] = useState("");
  const [paymenttype, setPaymentType] = useState("");
  const [location, setLocation] = useState("Any Location");
  const [message, setMessage] = useState(null);
  //const [error, setError] = useState(false);
  //const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const userRegister = useSelector((state) => state.userRegister);
  const { loading, error, userInfo } = userRegister;

  const history = useHistory();

  const isAboutToConfirm = JSON.parse(localStorage.getItem("isAboutToConfirm"));

  var cancelButton;
  const registerButtonText = isAboutToConfirm
    ? "Register & Confirm"
    : "Register";

  const cancelHandler = async (e) => {
    e.preventDefault();

    localStorage.setItem("isAboutToConfirm", JSON.stringify(false));

    history.push("/available-tables");
  };

  if (isAboutToConfirm)
    cancelButton = (
      <Button variant="primary" onClick={cancelHandler}>
        Cancel
      </Button>
    );

  useEffect(() => {
    if (userInfo) {
      history.push("/home");
    }
  }, [history, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();

    if (password !== confirmpassword) {
      setMessage("Passwords do not match");
    } else {
      dispatch(
        register(
          name,
          username,
          email,
          password,
          mailingaddress,
          billingaddress,
          paymenttype,
          location
        )
      );

      if (isAboutToConfirm)
        history.push("/confirmation2");
    }
  };

  /*const submitHandler = async (e) => {
        e.preventDefault();
        console.log(email);

       if (password !== confirmpassword) {
            setMessage("Passwords do not match");
        } else {
            setMessage(null)
            try {
                const config = {
                    headers: {
                        "Content=type": "application/json",
                    },
                };
           
                setLoading(true);
                
                const { data } = await axios.post(
                    "/api/users",
                    { name,
                         username, 
                         email, 
                         password,
                    },
                    config
                );

                
                setLoading(false);
                localStorage.setItem('userInfo', JSON.stringify(data));               
            } catch (error) {
                setError(error.response.data.message);
              }
        }
      
    };*/

  /*const submitHandler = async (e) => {
  e.preventDefault();
  try {
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };

    setLoading(true);

    const { data } = await axios.post(
      "/api/users",
      {
        name,
        username,
        email,
        password,
      },
      config
    );

    console.log(data);
    localStorage.setItem("userInfo", JSON.stringify(data));
    setLoading(false);
  } catch (error) {
    setError(error.response.data.message);
    setLoading(false);
  }
  console.log(email, password);
};*/

  return (
    <MainScreen title="REGISTER">
      <div className="loginContainer">
        {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
        {message && <ErrorMessage variant="danger">{message}</ErrorMessage>}
        {loading && <Loading />}
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="name"
              value={name}
              placeholder="Enter name"
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="username">
            <Form.Label>User Name</Form.Label>
            <Form.Control
              type="username"
              value={username}
              placeholder="Enter Username"
              onChange={(e) => setUserName(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              value={email}
              placeholder="Enter email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              value={password}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="confirmPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              value={confirmpassword}
              placeholder="Confirm Password"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="mailingAddress">
            <Form.Label>Mailing Address</Form.Label>
            <Form.Control
              type="mailingaddress"
              value={mailingaddress}
              placeholder="Mailing Address"
              onChange={(e) => setMailingAddress(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="billingAddress">
            <Form.Label>Billing Address</Form.Label>
            <Form.Control
              type="billingaddress"
              value={billingaddress}
              placeholder="Billing Address"
              onChange={(e) => setBillingAddress(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="paymenttype">
            <Form.Label>Preferred Payment Type</Form.Label>
            <select
              type="paymenttype"
              value={paymenttype}
              class="form-control"
              onChange={(e) => setPaymentType(e.target.value)}
              required
            >
              <option>Cash</option>
              <option>Credit Card</option>
              <option>Check</option>
            </select>
          </Form.Group>

          <Form.Group controlId="location">
            <Form.Label>Seating Preference</Form.Label>

            <select
              type="idlocation"
              value={location}
              class="form-control"
              onChange={(e) => setLocation(e.target.value)}
              required
            >
              <option>Any Location</option>
              <option>Patio</option>
              <option>Inside</option>
              <option>Bar</option>
            </select>
          </Form.Group>

          {cancelButton}
          <Button variant="primary" type="submit">
            {registerButtonText}
          </Button>
        </Form>
        <Row className="py-3">
          <Col>
            Have an Account ? <Link to="/login">Login</Link>
          </Col>
        </Row>
      </div>
    </MainScreen>
  );
};

export default RegisterScreen;
