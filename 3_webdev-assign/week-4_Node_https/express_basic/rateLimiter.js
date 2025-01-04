const express = require("express");
const app = express();
// Assign - If a user sends more than 5 request in a single second then they should blocked and receive a 404 status code

let numberOfRequestForUsers = {}
setInterval(() => {
    numberOfRequestForUsers = {};
}, 1000); //called every 1 sec

app.use(function (req, res, next){
    const userId = req.headers["user-id"];
    if(numberOfRequestForUsers[userId]){
        numberOfRequestForUsers[userId]++;
        if(numberOfRequestForUsers > 5){
            res.status(404).json({msg: "No entry!"})
        }
    }else{
        numberOfRequestForUsers[userId] = 1;
    }
    
    next();
})