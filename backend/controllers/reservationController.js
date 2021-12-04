const mongoose = require("mongoose");
const asynchandler = require("express-async-handler");
const Day = require("../models/day").model;
const Reservation = require("../models/reservation").model;

const availableTables = asynchandler(async (request, respond) => {
  const dateTime = request.body.date;
  console.log(dateTime);
  Day.find({ date: dateTime }, (err, docs) => {
    if (!err) {
      if (docs.length > 0) {
        ///this means that the date already exists///
        console.log("this date exists sending existing tables");
        respond.status(200).send(docs[0]);
      } else {
        ////this means this date and time does not exist and i am creating a new date and time ////
        const allTables = require("../data/allTables");
        const day = new Day({
          date: dateTime,
          tables: allTables,
        });
        day.save((err) => {
          if (err) {
            console.error(err);
            respond.status(400).send("Error saving new date");
          } else {
            ////the date is saved and i am returning all tables as available///
            console.log(
              "new date has been created, here are the default tables"
            );
            ////just checking if the date was actually saved//
            Day.find({ date: dateTime }, (err, docs) => {
              err ? respond.status(400) : respond.status(200).send(docs[0]);
            });
          }
        });
      }
    } else {
      respond.status(400).send("Could not search for date");
    }
  });
});

///creating the function to book a table that is available ///

const bookTables = asynchandler(async (request, respond) => {
  const dateTime = request.body.date;
  const tableId = request.body.table;
  Day.find({ date: dateTime }, (err, days) => {
    if (!err) {
      if (days.length > 0) {
        let day = days[0];
        //// searching through the array for the correct table
        day.tables.forEach((table) => {
          if (table._id.toString() === tableId) {
            console.log(table._id.toString());
            console.log(tableId);
            console.log("date time is valid");
            ///then we have found the correct table book it !///
            table.reservation = new Reservation({
              name: request.body.name,
              email: request.body.email,
            });
            table.isAvailable = false;
            day.save((err) => {
              if (err) {
                console.log(err);
              } else {
                console.log("Reserved");
                respond.status(200).send("Added Reservation");
              }
            });
          }
        });
      }
    } else {
      console.log("Day not found");
    }
  });
});
const stripe = require("stripe")("sk_test_4eC39HqLyjWDarjtT1zdp7dc");
const stripeuser = asynchandler(async (request, respond) => {
  const token = request.body.token;
  return stripe.customer
    .create({
      email: token.email,
      source: token,
    })
    .then((customer) => {
      stripe.charges
        .create({
          amount: 5,
          currency: "usd",
          customer: customer.id,
          receipt_email: token.email,
        })
        .then((result) => {
          respond.status(200).json(result);
        })
        .catch((err) => {
          console.log(err);
        });
    });
});

module.exports = { availableTables, bookTables, stripeuser };
