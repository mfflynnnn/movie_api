const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const mongoose = require("mongoose");
const Models = require("./models.js");
const Movies = Models.Movie;
const Users = Models.User;

app.use(myLogger);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect("mongodb://localhost:27017/cfDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//Welcome message/response at root file
app.get("/", (req, res) => {
  res.send("Welcome to myFlix!");
});

//Complete list of movies
app.get("/movies", (req, res) => {
  Movies.find()
    .then((movies) => {
      res.status(201).json(movies);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error: " + err);
    });
});

//Single movie by title
app.get("/movies/:title", (req, res) => {
  Movies.findOne({ Title: req.params.Title })
    .then((movie) => {
      res.json(movie);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error: " + err);
    });
});

//Data on single genre by genre name
app.get("/movies/genres/:genre", (req, res) => {
  Movies.findOne({ "Genre.Name": req.params.Genre.Name })
    .then((genre) => {
      res.json(genre);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error: " + err);
    });
});

//Data about a director by name
app.get("/movies/directors/:director", (req, res) => {
  Movies.findOne({ "Director.Name": req.params.Director.Name })
    .then((director) => {
      res.json(director);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error: " + err);
    });
});

//New user registration
/* Expects JSON in the following format:
{
  ID: Integer,
  Username: String,
  Password: String,
  Email: String,
  Birthday: Date
}*/
app.post("/users", (req, res) => {
  Users.findOne({ Username: req.body.Username })
    .then((user) => {
      if (user) {
        return res.status(400).send(req.body.Username + " already exists");
      } else {
        Users.create({
          Username: req.body.Username,
          Password: req.body.Password,
          Email: req.body.Email,
          Birthday: req.body.Birthday,
        })
          .then((user) => {
            res.status(201).json(user);
          })
          .catch((err) => {
            console.error(err);
            res.send(500).send("Error: " + err);
          });
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error: " + err);
    });
});

//Updates the user's info, by username
/*Expects JSON in the following format:
  Username: String,
  Password: String,
  Email: String,
  Birthday: Date
}*/
app.put("/users/:username", (req, res) => {
  Users.findOneAndUpdate(
    { Username: req.params.Username },
    {
      $set: {
        Username: req.body.Username,
        Password: req.body.Password,
        Email: req.body.Email,
        Birthday: req.body.Birthday,
      },
    },
    { new: true }
  )
    .then((user) => {
      res.status(201).json(user);
    })
    .catch((err) => {
      res.status(500).send("Error: " + err);
    });
});

//Adds a movie to the Favorites list
/*Expects JSON in the following format:
{Title: String,
  Description: String,
  Genre: {
    Name: String,
    Description: String,
  },
  Director: {
    Name: String,
    Bio: String,
  },
  Actors: [String],
  ImagePath: String,
  Featured: Boolean
}*/
app.post("/movies/favorites", (req, res) => {
  Movies.findOne({ Title: req.body.Title })
    .then((movie) => {
      if (movie) {
        return res.status(400).send(req.body.Title);
      } else {
        Movies.create({
          Title: req.body.Title,
          Description: req.body.Description,
          Genre: {
            Name: req.body.Name,
            Description: req.body.Description,
          },
          Director: {
            Name: req.body.Name,
            Bio: req.body.Bio,
          },
          Actors: [req.body.Actors],
          ImagePath: req.body.ImagePath,
          Featured: req.body.Featured,
        })
          .then((movie) => {
            res.status(201).json(movie);
          })
          .catch((err) => {
            console.log(err);
            res.status(500).send("Error: " + err);
          });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send("Error: " + err);
    });
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
