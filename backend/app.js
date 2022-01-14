const express = require("express");
const cors = require("cors");
const app = express();
const port = 3001;
const subscribers = require("./public/mock_database/subscribers.json");
const users = require("./public/mock_database/users.json")
const fs = require("fs");
const bodyParser = require("body-parser");
const { v4: uuidv4 } = require('uuid');

app.use(cors());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.get("/subscribers", (req, res) => {
  res.send(subscribers);
});

app.post("/subscribers", (req, res) => {
  let email = req.body.email;
  let currentSubscribers = subscribers;
  if (currentSubscribers.indexOf(email) !== -1) {
    res.status(409).send("Email already exists.");
  } else {
    fs.writeFile(
      "./public/mock_database/subscribers.json",
      JSON.stringify([...currentSubscribers, email]),
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

app.get("/users/:email", (req, res) => {
  let findUser = users.find(item => item.email === req.params.email);
  if(!req.params.email){
    res.send(users)
  } else if(findUser){
    res.send(findUser)
  } else {
    res.status(404).send("User not found")
  }
})

app.post("/users", (req, res) => {
  let email = req.body.email;
  let password = req.body.password;
  let currentUsers = users;
  if (currentUsers.indexOf(email) !== -1) {
    res.status(409).send("Email already exists.");
  } else {
    fs.writeFile(
      "./public/mock_database/users.json",
      JSON.stringify([...currentSubscribers, {
        uid: uuidv4(),
        email,
        password,
        favorites: []
      }]),
      "utf8",
      function (err) {
        if (err) {
          console.log("An error occured while writing JSON Object to File.");
          return console.log(err);
        }
      }
    );
    res.send("Email successfuly registered.");
  }
})

app.listen(port, () => {
  console.log(`Xendit test backend app listening at http://localhost:${port}`);
});
