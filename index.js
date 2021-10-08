//necessary imports
const path = require("path");
require("dotenv").config();
const http = require("http");
const app = require("./main");

//defining server port
const PORT = process.env.PORT || 3000;

//creating http server instance
const server = http.createServer(app);

//listening on defined port
server.listen(PORT, () => {
  console.log(`Server is up and running, listening on port: ${PORT}...`);
});
