import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import routes from "./route/routes.js";

const app = express();
const PORT = process.env.PORT 

app.use(cors()); 
app.use(express.json());


app.use("/api/properties", routes);


app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found.",
    errors: null,
  });
});


app.use((err, req, res, next) => {
  console.log("Error:", err.message);
  res.status(500).json({
    success: false,
    message: "Something went wrong on the server.",
    errors: err.message,
  });
});


mongoose
  .connect(process.env.MONGODBURI)
  .then(() => {
    console.log("MongoDB Connected");
    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.log("MongoDB Connection Error:", error.message);
  });