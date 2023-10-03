import express from "express";
import "./services/passport.js";
import mongoose from "mongoose";
import routes from "./routes/authRoutes.js";
import "dotenv/config.js";

const app = express();

routes(app);
try {
  await mongoose.connect(process.env.DB_URL);
  console.log(`Connected to the database successful`);
} catch (error) {
  console.log(`Failed to connect to the data base ${error}`);
}
app.listen(5000, (err) => {
  if (err) throw err;

  console.log(`App is listening to the port 5000`);
});
