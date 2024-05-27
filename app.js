const express = require("express");
const cookieParser = require("cookie-parser");
var cors = require("cors");

const userRouter = require("./Routes/UserRouter");
const propertyRouter = require("./Routes/PropertyRouter");

const CustomError = require("./Utils/CustomError");
const globalErrorHandler = require("./Controllers/errorController");

let app = express();

app.use(
  cors({
    origin: "https://6654cc8762f316179b4e4c77--jade-ganache-8d265a.netlify.app",
    credentials: true,
  }),
);
app.use(express.json());
app.use(cookieParser());

app.use("/api/v1/auth", userRouter);
app.use("/api/v1/propertys", propertyRouter);

app.all("*", (req, res, next) => {
  res.status(404).json({
    status: "fail",
    message: `Can't find ${req.originalUrl} on the server!`,
  });

  const error = new CustomError(
    `Can't find ${req.originalUrl} on the server!`,
    404,
  );
  next(err);
});

app.use(globalErrorHandler);

module.exports = app;
