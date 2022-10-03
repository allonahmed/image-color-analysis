const express = require("express"); //import Express (backend framework for node web apps)
const mysql = require("mysql"); // our dbms
const bodyParser = require("body-parser"); //for getting body of response
const cors = require("cors");

const app = express()
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

app.use(function (_, res, next) {
  res.header("Access-Control-Allow-Origin", "YOUR-DOMAIN.TLD"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

const corsOptions = {
  origin: true,
  credentials: true, //access-control-allow-credentials:true
  methods: ["GET", "POST"],
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));

const db = mysql.createConnection({
  // setup our mysql db connection
  host: "localhost",
  user: "root",
  password: "password",
  database: "scrape_data",
  port: "3306",
});

app.get('/get-gym-shark', (_, res) => {
  db.query('SELECT * FROM gym_shark', (err, result) => {
    if (err) res.send({ message: err })
    else res.send(result)
  })
})

const PORT = 8000;

app.listen(PORT, () => {
  //test listen to be sure the server is running on port
  console.log("Listening on Port", PORT);
});