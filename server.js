var express = require("express");
var path = require("path");
const fs = require("fs");
const database = JSON.parse(fs.readFileSync('./db/db.json', 'utf8'))

var app = express();
var PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static('public'))

app.get("/api/notes", function(req, res) {

  // use the fs to read file
  // then parse file contents with JSON.parse() to the real data
  // send the parsed data back to the client with res.json()
  res.json(database);

});

app.get("/api/notes/:id", function(req, res) {
  var chosen = req.params.id;

  for (var i = 0; i < database.length; i++) {
    if (chosen === database[i].id) {
      return res.json(database[i]);
    }
  }

  return res.json(false);

});



app.post("/api/notes", function(req, res) {
  // access the POSTed data in req.body
  // create id
  var note = req.body
  var id = "newId" + database.length
  note.id = id
  console.log(note.id, id)
  
  
  database.push(note)
  // PUSH the req.body to the arr list 
  fs.writeFile('./db/db.json', JSON.stringify(database), (err) => {
    if (err) throw (err)
    console.log("I work")
  })
  // JSON.stringify the arr list back into JSON string 
  // THEN save the contents back to the "db.json" wiith the fs.modual
  return res.json(note);
});

app.delete('/api/notes/:id', function (req, res) {
  var newId = req.params.id
  // access the id from 'req.params.id'
  const index = database.findIndex( fullData => fullData.id === newId)
  database.splice(index,1)
  fs.writeFile('./db/db.json', JSON.stringify(database), (err) => {
    if (err) throw (err)
    console.log("I work")
  })
  // Optioin A
  // find the matching index using Array.findIndex()
  // remove the target element using Array.splice()

  // return any type of success message
  res.json(database)
})

app.get("/notes", function(req, res) {
  res.sendFile(path.join(__dirname, "./public/notes.html"));
});

app.get("*", function(req, res) {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.listen(PORT, function() {
    console.log("App listening on http://localhost:" + PORT);
  });