const express = require("express");
const notes = require("./data/notes");
const dotenv = require("dotenv");
const connectDB = require("./database");
const userRoutes = require("./routes/userroutes");
//const noteRoutes = require("./routes/noteRoutes");
const availabilityRoutes=require("./routes/availabilityRoute");
const stripeRoutes=require("./routes/stripeRoute");
const reservationRoutes=require("./routes/reservationRoute");
const Table = require("./models/tableModel");
const { notFound, errorHandler } = require("./Middleware/errorMiddleware");

const app = express();
dotenv.config();
connectDB();
app.use(express.json());

app.get("/", (request, respond) => {
  ///api call
  respond.send("API is running...");
});

app.get("/api/notes", (request, respond) => {
  respond.send(notes);
});
/// routes ///
app.use("/api/users", userRoutes);
//app.use("/api/notes", noteRoutes);
app.use("/api/reserve",reservationRoutes);
app.use("/api/stripe",stripeRoutes);
app.use("/api/availability",availabilityRoutes);
/*app.post("/api/get_tables", async (request, respond) => {
  const { name, phone_number, email, date, time, no_of_guests } = request.body;
  console.log(no_of_guests);

  const tables = Table.find({ no_of_seats: { $gt: no_of_guests } });

  res.json({
    no_of_seats: tables.no_of_seats,
    reserved: tables.reserved,
    reservation_date: tables.reservation_date,
  });
});*/

/*const __dirname = path.resolve();

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/build")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running..");
  });
}*/

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`server started on port ${PORT}`));
