const express = require("express");
const cors = require("cors");

// ENDPOINTS FOR RECOIL-DEEP-DIVE PROJECT

const app = express();

app.use(cors());
app.use(express.json());

app.get("/notifications", (req, res) => {
  const data = {
    network: 10,
    jobs: 5,
    notifications: 28,
    messaging: 17,
  };

  res.status(201).json(data);
});

app.listen(5000);
