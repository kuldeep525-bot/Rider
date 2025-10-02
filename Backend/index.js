import express from "express";
import mongoose from "mongoose";
import UserRoute from "./routes/user.routes.js";
import cookieParser from "cookie-parser";
const port = 4000;
const app = express();
import cors from "cors";

const frontedurl = "http://localhost:5173";

// Connecting to MongoDB
const MONGO_URL =
  "mongodb+srv://bachelor97797_db_user:vLmHIcGI7r4Vbs1u@cluster0.mok3bsz.mongodb.net/rider_project";

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
app.use(express.urlencoded({ extended: true }));
// Use cookie-parser middleware
app.use(cookieParser());

//connected backend to fronted with cors

app.use(
  cors({
    origin: frontedurl,
    credentials: true,
    methods: ["GET", "POST", "DELETE", "PUT"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Define routes
app.use("/api/v1/users", UserRoute);

app.get("/", (req, res) => {
  res.send("started to ride webapplication");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
