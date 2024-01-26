const express = require("express"); // import express
const mongoose = require("mongoose"); // import mongoose

const app = express(); // create express app
app.use(express.json()); // use express json
const port = 3000; // we will use this later

const Film = mongoose.model("Film", {
  title: String,
  description: String,
  image_url: String,
  trailer_url: String,
});

app.get("/", async (req, res) => {
  const films = await Film.find();
  return res.send(films);
}); // create a route for the app


app.delete("/:id", async (req, res) => {
  const film = await Film.findByIdAndRemove(req.params.id);
  return res.send(film);
}
); // create a route for the app




app.put("/:id", async (req, res) => {
  const film = await Film.findByIdAndUpdate(req.params.id, {
    title: req.body.title,
    description: req.body.description,
    image_url: req.body.image_url,
    trailer_url: req.body.trailer_url,
  }, {
    new : true
  });

  
  return res.send(film);
}); // create a route for the app

app.post("/", async (req, res) => {
  const film = new Film({
    title: req.body.title,
    description: req.body.description,
    image_url: req.body.image_url,
    trailer_url: req.body.trailer_url,
  });

  await film.save();
  return res.send(film);
}); // create a route for the app

app.listen(port, () => {
  mongoose.connect(
    "mongodb+srv://leonardofasano18:L4Cfyqa3ybyBwrzk@starwars-api.v7ilbil.mongodb.net/?retryWrites=true&w=majority"
  );
  console.log("app run");
}); // run the server on port 3000 
