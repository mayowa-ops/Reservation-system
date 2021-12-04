import MainScreen from "../../components/MainScreen";
import { Form } from "react-bootstrap";
import axios from "axios";

const ConfirmationPage = () => {
  const reservationInfo = JSON.parse(localStorage.getItem("reservationInfo"));
  const selectedTableNames = JSON.parse(
    localStorage.getItem("selectedTableNames")
  );

  const reserve = async (tableName) => {
    let res = await fetch("/api/reserve", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        date: reservationInfo["date"],
        table: tableName,
      }),
    });
    res = await res.text();
    console.log("Reserved: " + res);
  };

  selectedTableNames.forEach((tableName) => reserve(tableName));

  localStorage.setItem(
    "isAboutToConfirm",
    JSON.stringify(false)
  );

  return (
    <MainScreen title="Thank you for your reservation at Island Grill!">
      <Form.Label>
        {" "}
        Thank you for booking with us! We're dedicated to giving you the best
        experience possible.
      </Form.Label>

      <Form.Label>
        {" "}
        NO SHOW FEE POLICY: A “no show” is someone who misses an appointment
        without CANCELLING it in advance. We will charge a $10 fee to customers
        who do not arrive for their scheduled time.{" "}
      </Form.Label>

      <Form.Label>
        Our goal is to provide quality service in a timely manner. We urge you
        to keep your scheduled appointments whenever possible. In the event you
        need to cancel, please contact the retaurant by phone at 123-456-7890.{" "}
      </Form.Label>

      
    </MainScreen>
  );
};

export default ConfirmationPage;
