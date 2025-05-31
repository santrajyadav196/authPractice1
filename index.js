require("dotenv").config();
require("./config/db")();
const express = require("express");
const globalErrorHandler = require("./middlewares/globalErrorHandler");
const CustomError = require("./utils/CustomError");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 4000;

const userRoutes = require("./routes/user.route");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public"))); // Serve static files from the public folder

app.use("/api/user", userRoutes);

// catch url not found and forward to error handler
app.all("*wildcard", (req, res, next) => {
  const message =
    process.env.MODE === "development"
      ? `URL not found: ${req.originalUrl}`
      : "Something went wrong";

  next(new CustomError(message, 404));
});

// Global error handler middleware
app.use(globalErrorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
