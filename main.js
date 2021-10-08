//necessary imports
const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const mongoose = require("mongoose");

//importing schemas for registration
// const { ErrorLogSchema, AdminLogSchema, UserLogSchema } = require("./logs/logs.model");
// const { AuthSchema } = require("./auth/auth.model");

//model registration
// mongoose.model("ErrorLog", ErrorLogSchema);
// mongoose.model("AdminLog", AdminLogSchema);
// mongoose.model("UserLog", UserLogSchema);
// mongoose.model("Auth", AuthSchema);

//importing routes
const LogsRoutes = require("./logs/logs.router");
const AuthRoutes = require("./auth/auth.router");

//importing handlers
const notFoundHandler = require("./utilities/notFoundHandler");
const errorHandler = require("./utilities/errorHandler");

//express instance
const app = express();

//database configuration
const connectionUri = process.env.NODE_ENV === "dev" ? process.env.DEV_MONGO_URL : process.env.PROD_MONGO_URL;
mongoose.connect(connectionUri);

mongoose.connection.on("connected", () => console.log("Connected to mongodb env: " + process.env.NODE_ENV));

//server configurations
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());

//parsing routes
app.use("/logs", LogsRoutes);
app.use("/auth", AuthRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

module.exports = app;
