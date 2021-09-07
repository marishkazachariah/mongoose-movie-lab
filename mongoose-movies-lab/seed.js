const mongoose = require("mongoose");

const Celeb = require("./models/Celeb");

mongoose.connect("mongodb://localhost/mongoose-movies-lab");

const celebs = [
  {
    name: "Rufus",
    occupation: "doggo",
    catchphrase: "bork"
  },
  {
    name: "Bugs Bunny",
    occupation: "tv show character",
    catchphrase: "Eh, what's up doc?"
  },
  {
    name: "Britney Spears",
    occupation: "actor",
    catchphrase: "Oops! I did it again"
  }
];




Celeb.insertMany(celebs)
.then((celebs) => {
  console.log(`Success - ${celebs.length} seeded to the database`);
  mongoose.connection.close();
})
.catch(err => {
    console.log(err);
})
