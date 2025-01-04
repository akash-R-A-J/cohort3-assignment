const express = require("express");
const app = express();

// route handlers
app.get("/", function (req, res) {
  // handling GET request on this '/' route
  res.send("Hello World"); // for sending plain text
  res.send("<b> Hello there </b>"); // for sending html
  res.json({
    // for sending JSON data
    name: "Akash Raj",
  });

  //    you can only send one response to the client not more than that else you will get an error
  //   this function has error because it is sending 3 responses to a single request
});

app.post("/", function (req, res) {
  // handling POST request on this '/' route
  res.send("Hello World from the POST endpoint.");
});

/*
    req -> request object (all things related to the request of the client)
        -> contains data and methods which is sent by the client to the server
    res -> response object (all things related to the response of the server)
        -> contains data and methods which is sent by the server to the client
*/

app.listen(3000); // port number
