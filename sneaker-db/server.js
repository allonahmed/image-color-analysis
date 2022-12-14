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

//test
pool.query('SELECT 1 + 1 AS solution', function (error, results, _) {
  if (error) throw error;
  console.log('The solution is: ', results[0].solution);
});

//add new rows of data
app.post('/upload-sneakers', (req, res) => {
  const request = req.body

  query = "INSERT INTO sneakers VALUES ?";
  db.query(query,
    [request.map(data => [data.id, data.sku, data.brand, data.name, data.colorway, data.gender, data.silhouette, data.releaseYear, data.releaseDate, data.retailPrice, data.estimatedMarketValue, data.story, data.image.original, data.image.thumbnail])]
    , (err, result) => {
      if (err) console.log(err)
      else {
        res.send(result)
      }
    })
})

//get sneakers based on search query
app.post('/get-sneakers', (req, res) => {
  const param = `%${req.body.query}%`;
  console.log(param)
  const query = `SELECT * FROM sneakers WHERE (original_image != '' and gender = 'men') and (name like ?) order by estimated_market_value desc limit 100;`
  db.query(query, [param], (err, result) => {
    if (err) res.send(err)
    else res.send(result)
  })
})

//get all sneakers in dd
app.get('/get-all', (_, res) => {
  db.query('SELECT * FROM sneakers;', (err, result) => {
    if (err) res.send({ message: err })
    else res.send(result)
  })
})

//get related rows that match silhoutte of sneaker selected
app.post('/get-related', (req, res) => {
  const { silhouette, sku } = req.body;
  const query = 'SELECT * FROM sneakers WHERE silhouette = ? AND sku != ? LIMIT 20';
  db.query(query, [silhouette, sku], (err, result) => {
    res.send(err || result);
  })
})

const PORT = 2020;

app.listen(PORT, () => {
  //test listen to be sure the server is running on port
  console.log("Listening on Port", PORT);
});