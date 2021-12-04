import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import React from "react";
import { AvailableTablesPage } from './AvailableTablesPage';

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(
  "pk_live_51JG7IsJJJXX5qLcuKeLnFgThbEtas0dtCm2WOZbvRnQy8M0G2D2fPvfDzWj4hUUeD5JrpnkAVjuucr0UPdWvdim600wTRCiQ99"
);

function stripe_app() {
  return (
    <Elements stripe={stripePromise}>
      <AvailableTablesPage />
    </Elements>
  );
};
export default stripe_app;