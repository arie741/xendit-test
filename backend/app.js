const express = require("express");
const cors = require("cors");
const app = express();
const port = 3001;
const subscribers = require("./public/mock_database/subscribers.json");
const unidata = require("./public/mock_database/data.json");
const fs = require("fs");
const bodyParser = require("body-parser");

app.use(cors());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.get("/subscribers", (req, res) => {
  res.send(subscribers.subscribers);
});

app.post("/subscribers", (req, res) => {
  let email = req.body.email;
  let currentSubscribers = subscribers.subscribers;
  if (currentSubscribers.indexOf(email) !== -1) {
    res.status(409).send("Email already exists.");
  } else {
    fs.writeFile(
      "./public/mock_database/subscribers.json",
      JSON.stringify({ subscribers: [...currentSubscribers, email] }),
      "utf8",
      function (err) {
        if (err) {
          console.log("An error occured while writing JSON Object to File.");
          return console.log(err);
        }
      }
    );
    res.send("Email successfuly added.");
  }
});

app.listen(port, () => {
  console.log(`Xendit test backend app listening at http://localhost:${port}`);
});
