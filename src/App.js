import "./App.css";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import LandingPage from "./screens/LandingPage/LandingPage";
import { BrowserRouter, Route } from "react-router-dom";
import ReservationPage from "./screens/ReservationPage/ReservationPage";
import LoginScreen from "./screens/LoginScreen/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen/RegisterScreen";
import { AvailableTablesPage } from "./screens/AvailableTablesPage/AvailableTablesPage";
import stripe_app from "./screens/AvailableTablesPage/stripecontainer";
import ProfileScreen from "./screens/ProfileScreen/ProfileScreen";
//import ConfirmationPage from "./screens/ConfirmationPage/ConfirmationPage";
import ConfirmationPage2 from "./screens/ConfirmationPage2/ConfirmationPage2";

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <main>
        <Route path="/confirmation2" component={ConfirmationPage2} exact />
        <Route path="/" component={LandingPage} exact />
        <Route path="/login" component={LoginScreen} exact />
        <Route path="/profile" component={ProfileScreen} exact />
        <Route path="/register" component={RegisterScreen} exact />
        <Route path="/reservationpage" component={() => <ReservationPage />} />
        <Route path="/home" component={() => <LandingPage />} />
        <Route path="/bookatable" component={ReservationPage} exact />
        <Route path="/available-tables" component={AvailableTablesPage} exact />
        <stripe_app
        />
      </main>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
