const express = require("express");
const app = express();

let topTenMovies = [
  { title: "Inside Out", director: "Pete Docter", genre: "family animated" },
  {
    title: "Eternal Sunshine of the Spotless Mind",
    director: "Michel Gondry",
    genre: "drama",
  },
  {
    title: "Brokeback Mountain",
    director: "Ang Lee",
    genre: "neo-Western romantic drama",
  },
  {
    title: "My Beautiful Broken Brain",
    director: "Sophie Robinson",
    genre: "documentary",
  },
  {
    title: "Star Trek: Voyager",
    director: "Rick Berman",
    genre: "science fiction",
  },
  {
    title: "Everything Everywhere All at Once",
    director: "Daniel Kwan",
    genre: "comedy-drama",
  },
  {
    title: "Sense and Sensibility",
    director: "Ang Lee",
    genre: "period drama",
  },
  {
    title: "Moonlight",
    director: "Barry Jenkins",
    genre: "coming-of-age drama",
  },
  {
    title: "Where the Lilies Bloom",
    director: "William A Graham",
    genre: "drama",
  },
  {
    title: "The Sound of Music",
    director: "Robert Wise",
    genre: "musical drama",
  },
];

let myLogger = (req, res, next) => {
  console.log(req.url);
  next();
};

app.use(myLogger);

app.get("/", (req, res) => {
  res.send("Welcome to myFlix!");
});

app.get("/movies", (req, res) => {
  res.json(topTenMovies);
});

app.use(express.static("public"));

app.use((err, req, res, next) => {
  console.log(err.stack);
  res.status(500).send("Something broke!");
});

app.listen(8080, () => {
  console.log("Your app is listening on port 8080.");
});
