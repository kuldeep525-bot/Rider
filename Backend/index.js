import express from "express";
import mongoose from "mongoose";
import UserRoute from "./routes/user.routes.js";

const port = 4000;
const app = express();

// Connecting to MongoDB
const MONGO_URL =
  "mongodb+srv://bachelor97797:TrWISxD4JsYWoXWd@cluster0.ak7q8gz.mongodb.net/rider_application";

mongoose
  .connect(MONGO_URL)
  .then(() => {
    console.log("connected to mongodb");
  })
  .catch((error) => {
    console.log("Error connecting to mongoDb:", error);
  });

// Middleware to parse JSON bodies
app.use(express.json());

// Define routes
app.use("/api/v1/user", UserRoute);

app.get("/", (req, res) => {
  res.send("started to ride webapplication");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
