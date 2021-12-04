const express = require("express");
const router = express.Router();
const {
  availableTables,
  bookTables,
  stripeuser
} = require("../controllers/reservationController");
router.route("/").post(stripeuser);
module.exports = router;
