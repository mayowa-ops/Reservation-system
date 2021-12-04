import {
  row,
  col,
  Container,
  Form,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Input,
  Button,
} from "react-bootstrap";
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ReservationPage.css";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateProfile } from "../../actions/userActions";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";


const ReservationPage = () => {
  const [validated, setValidated] = useState(false);

  const [name, setName] = useState();
  const [phone_number, setPhoneNumber] = useState(false);
  const [email, setEmail] = useState("");
  const [dates, setDate] = useState("");
  const [time, setTime] = useState(false);
  const [location, setLocation] = useState("Any Location");
  const [no_of_guests, setNoOfGuests] = useState(2);

   const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userUpdate = useSelector((state) => state.userUpdate);
  const { loading, error, success } = userUpdate;

  const history = useHistory();

  useEffect(() => {
    if (userInfo) {
      setName(userInfo.name);
      setEmail(userInfo.email);
      //setLocation(userInfo.location);
    }
  }, [history, userInfo]);

  

  //let history = useHistory();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const form = event.currentTarget;

    if (!form.checkValidity()) {
      event.stopPropagation();
    }  

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      var date=dates.replace(/-/g,',');
      date=new Date(date);
      date=new Date(date.setHours(date.getHours()+time));
      console.log(date);
      const reservationInfo = {
        name,
        phone_number,
        email,
        date,
        time,
        no_of_guests,
        location,
      };

      const { data } = await axios.post(
        "/api/availability",
        reservationInfo,
        config
      );

      localStorage.setItem("tablesList", JSON.stringify(data));
      localStorage.setItem("reservationInfo", JSON.stringify(reservationInfo));

      history.push("/available-tables");
    } catch (e) {
      console.error(e);
    }

    setValidated(true);
  };

  return (
    <div className="main">
      <Container>
        <form validated={validated} onSubmit={handleSubmit}>
          <div class="form-group">
            <label for="idname" class="text-white font-weight-bold">
              {" "}
              Name{" "}
            </label>
            <input
              type="name"
              class="form-control"
              id="idname"
              placeholder="Enter Name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <Form.Control.Feedback type="invalid">
              Please enter a name for the booking.
            </Form.Control.Feedback>
          </div>
          <div class="form-group">
            <label for="idemail" class="text-white font-weight-bold">
              Email{" "}
            </label>
            <input
              type="email"
              class="form-control"
              id="idemail"
              placeholder="Enter Email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Form.Control.Feedback type="invalid">
              Please provide an email Address.
            </Form.Control.Feedback>
          </div>

          <div class="form-group">
            <label for="idselect1" class="text-white font-weight-bold">
              How many people?
            </label>
            <select
              class="form-control"
              id="idselect1"
              onChange={(e) => setNoOfGuests(e.target.value)}
              required
            >
              <option>2</option>
              <option>4</option>
              <option>6</option>
              <option>8</option>
            </select>
            <Form.Control.Feedback type="invalid">
              Please specify how many people to seat.
            </Form.Control.Feedback>
          </div>

          <div class="form-row">
            <div class="form-group col-md-4">
              <label for="idlocation" class="text-white font-weight-bold">
                Seating preference
              </label>
              <select
                id="idlocation"
                class="form-control"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                required
              >
                <option selected>choose a location...</option>
                <option>Any Location</option>
                <option>Patio</option>
                <option>Inside</option>
                <option>Bar</option>
              </select>
            </div>
            <div class="form-group col-md-4">
              <label for="iddate" class="text-white font-weight-bold">
                Date
              </label>
              <Form.Control
                type="date"
                name="dob"
                placeholder="Pick a particular date"
                min={Date.now()}
                onChange={(e) => setDate(e.target.value)}
                required
              />
              <Form.Control.Feedback type="invalid">
                Please Pick a particular date.
              </Form.Control.Feedback>
            </div>
            <div class="form-group col-md-4">
              <label for="idtime" class="text-white font-weight-bold">
                Time
              </label>
              <select
                id="idtime"
                class="form-control"
                onChange={(e) => setTime(e.target.value)}
                required
              >
                <option value="0">Choose...</option>
                <option value="9">9AM</option>
                <option value="10">10AM</option>
                <option value="11">11AM</option>
                <option value="12">12PM</option>
                <option value="13">1PM</option>
                <option value="14">2PM</option>
                <option value="15">3PM</option>
                <option value="16">4PM</option>
                <option value="17">5PM</option>
                <option value="18">6PM</option>
                <option value="19">7PM</option>
                <option value="20">8PM</option>
                <option value="21">9PM</option>
              </select>
              <Form.Control.Feedback type="invalid">
                Please Pick a particular time.
              </Form.Control.Feedback>
            </div>
          </div>
          <div class="col-md-12 text-center">
            <button
              type="submit"
              class="btn btn-primary btn-lg"
              Action="/available-tables"
            >
              Check Available tables
            </button>
          </div>
        </form>
      </Container>
    </div>

    /* <div className="main">
      <Container>
        <Form validated={validated} onSubmit={handleSubmit}>
          <Form.Group className="form-group" controlId="formBasicName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              name="name"
              type="text"
              placeholder="Enter Name"
              onChange={(e) => setName(e.target.value)}
              required
            />
            <Form.Control.Feedback type="invalid">
              Please enter a name.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="form-group" controlId="formBasicPhone">
            <Form.Label>Phone Number</Form.Label>
            <Form.Control
              name="phone_number"
              type="text"
              placeholder="Enter Phone Number"
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
            />
            <Form.Control.Feedback type="invalid">
              Please enter a phone number.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="form-group" controlId="formBasicEmail">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              name="email"
              type="email"
              placeholder="Enter Email"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Form.Control.Feedback type="invalid">
              Please enter an email address.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="form-group" controlId="formBasicDate">
            <Form.Label>Date</Form.Label>
            <Form.Control
              name="date"
              type="date"
              placeholder="Enter Date"
              min={
                new Date(Date.now()).getFullYear() +
                "-" +
                (new Date(Date.now()).getMonth() + 1) +
                "-" +
                new Date(Date.now()).getDate()
              }
              onChange={(e) => setDate(e.target.value)}
              required
            />
            <Form.Control.Feedback type="invalid">
              Please enter a date.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="form-group" controlId="formBasicTime">
            <Form.Label>Time</Form.Label>
            <Form.Control
              name="time"
              type="text"
              placeholder="Enter Time"
              onChange={(e) => setTime(e.target.value)}
              required
            />
            <Form.Control.Feedback type="invalid">
              Please enter a date.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="form-group" controlId="formBasicNumber">
            <Form.Label>Number of Guests</Form.Label>
            <Form.Control
              name="no_of_guests"
              type="number"
              placeholder="Enter No. of Guests"
              min="0"
              onChange={(e) => setNoOfGuests(e.target.value)}
              required
            />
            <Form.Control.Feedback type="invalid">
              Please enter the number of guests.
            </Form.Control.Feedback>
          </Form.Group>
          <Button type="submit" formAction="/available-tables">
            Show Available Tables
          </Button>
        </Form>
      </Container>
    </div>*/
  );
};

export default ReservationPage;
