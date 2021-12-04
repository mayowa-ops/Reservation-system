import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import MainScreen from "../../components/MainScreen";
import "./ProfileScreen.css";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { updateProfile } from "../../actions/userActions";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";

const ProfileScreen = (/*{ location, history }*/) => {
  const [name, setName] = useState("");
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [mailingaddress, setMailingAddress] = useState("");
  const [billingaddress, setBillingAddress] = useState("");
  const [paymenttype, setPaymentType] = useState("");
  const [location, setLocation] = useState(""/*"Any Location"*/);


  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userUpdate = useSelector((state) => state.userUpdate);
  const { loading, error, success } = userUpdate;

  const history = useHistory();

  useEffect(() => {
    if (!userInfo) {
      history.push("/");
    } else {
      setName(userInfo.name);
      setEmail(userInfo.email);
      setUserName(userInfo.username);
      setMailingAddress(userInfo.mailingaddress);
      setBillingAddress(userInfo.billingaddress);
      setPaymentType(userInfo.paymenttype);
      setLocation(userInfo.location);
    }
  }, [history, userInfo]);

  
  const submitHandler = (e) => {
    e.preventDefault();

    if (password === confirmPassword)
    dispatch(updateProfile({ name, username, email, password, mailingaddress, billingaddress, paymenttype, location}));
  };

  return (
    <MainScreen title="EDIT PROFILE">
      <div>
        <Row className="profileContainer">
          <Col md={6}>
            <Form onSubmit={submitHandler}>
              {loading && <Loading />}
              {success && (
                <ErrorMessage variant="success">
                  Updated Successfully
                </ErrorMessage>
              )}
              {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}

              <Form.Group controlId="name">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                ></Form.Control>
              </Form.Group>

               <Form.Group controlId="username">
                    <Form.Label>User Name</Form.Label>
                    <Form.Control
                        type="username"
                        placeholder="Enter Username"
                        value={username}
                        onChange={(e) => setUserName(e.target.value)}
                    />
                    </Form.Group>

              
              <Form.Group controlId="email">
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId="confirmPassword">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                ></Form.Control>

              </Form.Group>{" "}

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
              
              
              
                          
              <Button type="submit" varient="primary">
                Update
              </Button>
            </Form>
          </Col>
          <Col
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            
          </Col>
        </Row>
      </div>
    </MainScreen>
  );
};

export default ProfileScreen;