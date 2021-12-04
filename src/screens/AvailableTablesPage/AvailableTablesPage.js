import {
  Container,
  Table,
  Button,
  Tab,
  Modal,
  ModalBody,
  ModalFooter,
  ModalTitle,
} from "react-bootstrap";
import StripeCheckout from "react-stripe-checkout";
import "./AvailableTablesPage.css";
import { useHistory, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import axios from "axios";


const holidays = ["2/14", "3/17", "7/4", "12/25"];

const isHoliday = (date) => {
  return (
    holidays.indexOf(
      date
        .toLocaleString()
        .substring(
          0,
          date
            .toLocaleString()
            .indexOf("/", date.toLocaleString().indexOf("/") + 1)
        )
    ) !== -1
  );
};

const isWeekend = (date) => {
  return date.getDay() === 0 || date.getDay() === 6;
};

const AvailableTablesPage = () => {
  let history = useHistory();
  const [cardnumber, setCardnumber] = useState("");
  const [exp, setExp] = useState("");
  const [cvc, setcvc] = useState("");
  const [cardowner, setCardOwner] = useState("");

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const [validated, setValidated] = useState(false);

  const selectedTableNames = [];
  var numOfSelectedSeats = 0;

  const tablesList = JSON.parse(localStorage.getItem("tablesList"));
  const rows = [];

  const reservationInfo = JSON.parse(localStorage.getItem("reservationInfo"));
  useEffect(() => {
    if (
      isHoliday(new Date(reservationInfo["date"])) ||
      isWeekend(new Date(reservationInfo["date"]))
    ) {
      document.getElementById("button-id").click();
    }
  }, []);

  const [isOpen, setIsOpen] = useState(false);

  const showModal = () => {
    setIsOpen(true);
  };

  const hideModal = () => {
    setIsOpen(false);
  };

  if (tablesList == null) return <Redirect to="/bookatable" />;

  const tables = tablesList["tables"];

  if (tables.length === 0)
    return (
      <div className="main">
        <p>No tables are available. Please select another time.</p>
      </div>
    );

  /* if (isHoliday() || isWeekend()){
  useEffect(() => {
    document.getElementById("clickButton").click();
  }, []);
}
    showModal();
*/

  const equalSizeTableExists =
    tables.find(
      (x) =>
        x["capacity"] === reservationInfo["no_of_guests"] &&
        (x["location"] === reservationInfo["location"] ||
          reservationInfo["location"] === "Any Location") &&
        x["isAvailable"]
    ) !== undefined;
  if (!equalSizeTableExists)
    alert(
      "No available tables to fit the number of guests. You will need to combine tables."
    );

  var count = 0;
  for (let i = 0; i < tables.length; i++) {
    if (
      (tables[i]["location"] === reservationInfo["location"] ||
        reservationInfo["location"] === "Any Location") &&
      (tables[i]["capacity"] === reservationInfo["no_of_guests"] ||
        (!equalSizeTableExists &&
          tables[i]["capacity"] < reservationInfo["no_of_guests"])) &&
      tables[i]["isAvailable"]
    ) {
      var selection = equalSizeTableExists ? "radio" : "checkbox";
      var tablev_id = tables[i]["_id"];
      count = count + 1;
      rows.push(
        <tr>
          <td>{tables[i]["name"]}</td>
          <td>{tables[i]["location"]}</td>
          <td>{tables[i]["capacity"]}</td>
          <td>
            {" "}
            <div class="form-group">
              {
                <input
                  type={selection}
                  id="idreserve"
                  name="reserve"
                  value={tablev_id}
                  onChange={(e) => {
                    if (e.target.checked) {
                      if (
                        numOfSelectedSeats + tables[i]["capacity"] <=
                        reservationInfo["no_of_guests"]
                      ) {
                        selectedTableNames.push(e.target.value);
                        numOfSelectedSeats =
                          numOfSelectedSeats + tables[i]["capacity"];
                      } else if (
                        numOfSelectedSeats + tables[i]["capacity"] >
                        reservationInfo["no_of_guests"]
                      )
                        e.target.checked = false;
                    } else {
                      selectedTableNames.splice(
                        selectedTableNames.indexOf(e.target.value),
                        1
                      );
                      numOfSelectedSeats =
                        numOfSelectedSeats - tables[i]["capacity"];
                    }
                    console.log(selectedTableNames);
                  }}
                ></input>
              }
            </div>
          </td>
        </tr>
      );
    }
  }
    const onToken = async (token) => {
    let res = await fetch("/api/stripe", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(token),
    });
    res = await res.text();
  };

  return (
    <div className="main">
      <Container>
        <button id="clickButton" onClick={showModal} class="invisible">
          Display Modal
        </button>
        <Modal show={isOpen} onHide={hideModal}>
          <Modal.Header>
            <Modal.Title>Special days Hold fee</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h3 class="text-center">Payment Details</h3>

            <img
              class="img-fluid"
              src="http://www.prepbootstrap.com/Content/images/shared/misc/creditcardicons.png"
            ></img>
            <form>
              <div class="form-group">
                <label>CARD NUMBER</label>
                <div class="input-group">
                  <input
                    type="tel"
                    class="form-control"
                    placeholder="Valid Card Number"
                    onChange={(e) => setCardnumber(e.target.value)}
                    required
                  />
                  <span class="input-group-addon">
                    <span class="fa fa-credit-card"></span>
                  </span>
                </div>
              </div>
              <div class="row">
                <div class="col-xs-7 col-md-7">
                  <div class="form-group">
                    <label>
                      <span class="hidden-xs">EXPIRATION</span>
                      <span class="visible-xs-inline">EXP</span> DATE
                    </label>
                    <input
                      type="tel"
                      class="form-control"
                      placeholder="MM / YY"
                      onChange={(e) => setExp(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div class="col-xs-5 col-md-5 pull-right">
                  <div class="form-group">
                    <label>CV CODE</label>
                    <input
                      type="tel"
                      class="form-control"
                      placeholder="CVC"
                      onChange={(e) => setcvc(e.target.value)}
                      required
                    />
                  </div>
                </div>
              </div>
              <div class="form-group">
                <label>CARD OWNER</label>
                <div class="input-group">
                  <input
                    type="tel"
                    class="form-control"
                    placeholder="Name On Credit Card"
                    onChange={(e) => setCardOwner(e.target.value)}
                    required
                  />
                </div>
              </div>
            </form>
          </Modal.Body>

          <Modal.Footer>
            <button class="btn btn-dark btn-lg btn-block" onClick={hideModal}>
              Process payment
            </button>
          </Modal.Footer>
        </Modal>
        <h5 class="text-left text-white">Available tabels left: {count}</h5>
        <Table className="tables-list">
          <thead>
            <tr>
              <th>Table No.</th>
              <th>Location</th>
              <th>Capacity</th>
              <th>Reserve</th>
            </tr>
          </thead>
          {rows}
        </Table>

        <div class="col-md-12 text-right ">
          <Button
            class="btn btn-primary btn-sm btn btn-secondary"
            onClick={() => {
              reservationInfo["location"] = "Any Location";
              localStorage.setItem(
                "reservationInfo",
                JSON.stringify(reservationInfo)
              );
              window.location.reload();
            }}
          >
            View all available tables
          </Button>
          <StripeCheckout
            name="Special day No Show fee"
            descripcion="$5 no show fee"
            amount={500}
            image="https://stripe.com/img/documentation/checkout/marketplace.png"
            stripeKey="pk_test_TYooMQauvdEDq54NiTphI7jx"
            token={onToken}
          >
            <button id="button-id" class="invisible">
              Invisible Trigger
            </button>
          </StripeCheckout>
        </div>
        <div class="col-md-12 text-center ">
          <button
            type="submit"
            class="btn btn-primary btn-lg"
            onClick={() => {
              console.log(selectedTableNames);

              localStorage.setItem(
                "selectedTableNames",
                JSON.stringify(selectedTableNames)
              );
              if (
                userInfo == null &&
                window.confirm("Would you like to register before confirming?")
              ) {
                localStorage.setItem("isAboutToConfirm", JSON.stringify(true));
                history.push("/register");
              } else history.push("/confirmation2");
            }}
          >
            Confirm
          </button>
        </div>
      </Container>
    </div>
  );
};


export { AvailableTablesPage, isHoliday, isWeekend };
