var express = require("express");
var path = require("path");
const fs = require("fs");

var app = express();
var PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static('public'))

app.get("/api/notes", function(req, res) {

  // use the fs to read file
  
  // .then parse file contents with JSON.parse() to the real data

  // send the parsed data back to the client with res.json()
  //  return res.json();

});

app.post("/api/notes", function(req, res) {

  // access the POSTed data in req.body

  // use the fs to read file
  
  // .then parse file contents with JSON.parse() to the real data

  // PUSH the req.body to the arr list 

  // JSON.stringify the arr list back into JSON string 

  // THEN save the contents back to the "db.json" wiith the fs.modual

  return res.json();
});

app.delete('/api/notes/:id', function (req, res) {

  // access the id from 'req.params.id'

  // use the fs to read file

  // .then parse file contents with JSON.parse() to the real data

  // Optioin A
  // find the matching index using Array.findIndex()
  // remove the target element using Array.splice()

  // optioin B
  // use the Array.filter() method to filter out the matching element
  // myArray = myArray.filter(({ id }) => id !== req.params.id)

  // return any type of success message
  // res.send('Got a DELETE request')
})

app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "/public/notes.html"));
});

app.get("*", function(req, res) {
  res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });