const express = require("express");
const bodyParser = require("body-parser");
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
app.use(bodyParser.json());

//Welcome message/response at root file
app.get("/", (req, res) => {
  res.send("Welcome to myFlix!");
});

//Complete list of movies
app.get("/movies", (req, res) => {
  res.json(topTenMovies);
});

//Single movie by title
app.get("/movies/:title", (req, res) => {
  res.json(
    topTenMovies.find((movie) => {
      return movie.title === req.params.title;
    })
  );
});

//Data on single genre by genre name
app.get("/movies/genres/:genre", (req, res) => {
  res.json(topTenMovies.genre);
});

//Data about a director by name
app.get("/movies/directors/:director", (req, res) => {
  res.json(topTenMovies.director);
});

//New user registration
app.post("/users", (req, res) => {
  res.send("Congrats, you have registered for a new user account!");
});

//Updates the username
app.put("/users/:username", (req, res) => {
  res.send("Your username has been updated.");
});

//Adds a movie to the Favorites list
app.post("/movies/favorites", (req, res) => {
  res.send("Your favorite movie has been added.");
});

//Removes a movie from the Favorites list
app.delete("/movies/favorites/:title", (req, res) => {
  res.send("A movie has been deleted from your Favorites list.");
});

//Deregisters the user
app.delete("/users/:username", (req, res) => {
  res.send("Your account has been deleted.");
});

app.use(express.static("public"));

app.use((err, req, res, next) => {
  console.log(err.stack);
  res.status(500).send("Something broke!");
});

app.listen(8080, () => {
  console.log("Your app is listening on port 8080.");
});
