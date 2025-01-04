const express = require("express");

const app = express();

// whenever you restart the process this variable lose every data
// and have only this much data mentioned below
var users = [
  {
    name: "John",
    kidneys: [
      {
        healthy: false,
      },
      {
        healthy: true,
      },
    ],
  },
];

// request methods
app.get("/", (req, res) => {
  // return how many kidneys a person have and
  // how many of them are healty or unhealthy
  const johnKidneys = users[0].kidneys;
  const numberOfKidneys = johnKidneys.length;

  let numberOfHealthyKidneys = 0;
  for (let i = 0; i < numberOfKidneys; i++) {
    if (johnKidneys[i].healthy) {
      numberOfHealthyKidneys++;
    }
  }

  const numberOfUnhealthyKidneys = numberOfKidneys - numberOfHealthyKidneys;
  res.json({
    numberOfKidneys,
    numberOfHealthyKidneys,
    numberOfUnhealthyKidneys,
  });
});

app.use(express); // to use req.body.isHealthy in post request

app.post("/", (req, res) => {
  // return a msg after adding a kidney with value of isHealthy variable
  const isHealthy = req.body.isHealthy;
  users[0].kidneys.push({
    healthy: isHealthy,
  });
  res.json({
    msg: "Done!",
  });
});

app.put("/", (req, res) => {
  // needs to update all unhealthy kidneys to a healthy one
  // only if there is atleast one unhealthy kidney is present else return 411 status code
  for (let i = 0; i < users[0].kidneys.length; i++) {
    users[0].kidneys[i].healthy = true;
  }
  res.json({}); // if you don't add this line the request get stuck here for forever
  // res.sendStatus(411); orr
  // res.send(411).json({
  //   msg : "You have no unhealthy kidney!"
  // });
});

app.delete("/", (req, res) => {
  // removing all the unhealthy kidneys
  let newKidneys = [];
  for (let i = 0; i < users[0].kidneys.length; i++) {
    if (users[0].kidneys[i].healthy) {
      newKidneys.push({
        healthy: true,
      });
    }
  }

  users[0].kidneys = newKidneys;
  res.json({
    msg: "Done!",
  });
});

// what if a person sends a delete request when there is no unhealthy kidneys? or
// what should happend when they try to delete when there are no kidneys? and => 411 status code
// what should happen when a user try make a kidney healthy when all kidneys are already healthy? => 411 status code

app.listen(3000);
