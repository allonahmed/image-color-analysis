const express = require("express"); //import Express (backend framework for node web apps)
const mysql = require("mysql"); // our dbms
const bodyParser = require("body-parser"); //for getting body of response

const app = express()
const cors = require("cors");

const corsOptions = {
  origin: true,
  credentials: true, //access-control-allow-credentials:true
  methods: ["GET", "POST"],
  optionSuccessStatus: 200,
};

var db = mysql.createConnection({
  // setup our mysql db connection
  host: "localhost",
  user: "root",
  password: "password",
  database: "sneaker-db",
  port: "3306",
});

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "password",
  database: "sneaker-db",
  port: "3306",
});
pool.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
  if (error) throw error;
  console.log('The solution is: ', results[0].solution);
});

app.use(cors(corsOptions));

const PORT = 2020;

app.listen(PORT, () => {
  //test listen to be sure the server is running on port
  console.log("Listening on Port", PORT);
});