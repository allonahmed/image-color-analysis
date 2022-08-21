const express = require("express"); //import Express (backend framework for node web apps)
const mysql = require("mysql"); // our dbms
const bodyParser = require("body-parser"); //for getting body of response
const cors = require("cors");

const app = express()
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

app.use(function (req, res, next) {
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

app.post('/send-data', (req, res) => {
  const data = req.body;
  console.log(data)
})
app.post('/upload-sneakers', (req, res) => {
  const data = {
    id: "1",
    sku: "123",
    brand: "Puma",
    name: "Puma V pro skaters",
    colorway: "black",
    gender: "male",
    silhouette: "idk",
    release_year: "2022",
    release_date: "may-20-1993",
    estimated_market_value: "100",
    retail_price: "120",
    story: "fkm kf dkfdj",
    original_image: "og image",
    thumbnail_image: "thumbnail"
  }
  query = "INSERT INTO sneakers VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
  db.query(query,
    [data.id, data.sku, data.brand, data.name, data.colorway, data.gender, data.silhouette, data.release_year, data.release_date, data.retail_price, data.estimated_market_value, data.story, data.original_image, data.thumbnail_image]
    , (err, result) => {
      if (err) console.log(err)
      else {
        console.log(res)
        res.send(result)
      }
    })
})


app.use(cors(corsOptions));

const PORT = 2020;

app.listen(PORT, () => {
  //test listen to be sure the server is running on port
  console.log("Listening on Port", PORT);
});