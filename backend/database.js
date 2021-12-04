const mongoose = require("mongoose");
const MONGO_URI =
  "mongodb+srv://Mayo:awojuyigb@coscproject.2la6i.mongodb.net/Coscproject?retryWrites=true&w=majority";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(MONGO_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit();
  }
};
module.exports = connectDB;
