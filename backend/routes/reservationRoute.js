const express = require("express");
const router = express.Router();
const {
  availableTables,
  bookTables,
} = require("../controllers/reservationController");
router.route("/").post(bookTables);
module.exports = router;
