const mysql = require("mysql");
const express = require("express");
const bodyParser = require("body-parser");
const encoder = bodyParser.urlencoded();
const app= express();
app.use("/assets", express.static("assets"));

const connection=mysql.createConnection({
    host:"localhost", 
    user: "root", 
    password:"Kiit@123",
    database:"nodejs"
});

// connect to the database 
connection.connect(function(error){
    if(error) throw error
    else console.log("connection successful!")
});

app.get("/", function(req, res){
    res.sendFile(__dirname + "/index.html");
})

app.post("/", encoder, function(req, res){
    var user_name=req.body.user_name;
    var password=req.body.password;
    console.log(req.body);
    connection.query("select *from loginuser where user_name = ? and password = ? ", [user_name, password], function(error, results, fields){
        if(results.length > 0){
           res.redirect("/welcome");
        } else {
            console.log("Not responding");
            // res.redirect("/")
        }
        res.end();
        
    })
})

//when login is successfull
app.get("/welcome", function(req, res){
    res.sendFile(__dirname + "/welcome.html")
})
// setup port
app.listen(4000); 