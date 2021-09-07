const router = require("express").Router();
const { route } = require("../app");
const Celeb = require("../models/Celeb");
const Movie = require("../models/Movie");

router.get("/", (req, res, next) => res.render("index"));

router.get("/movies", (req, res, next) => {
  Movie.find()
    .populate("cast")
    .then((moviesFromDB) => {
      console.log(moviesFromDB);
      res.render("movies", { moviesList: moviesFromDB });
    })
    .catch((err) => {
      next(err);
    });
});

router.get("/movies/new", (req, res, next) => {
  Celeb.find().then((celebsFromDB) => {
    // console.log(celebsFromDB);
    res.render("movies/new", { celebs: celebsFromDB });
  });
});

router.post("/movies", (req, res, next) => {
  console.log(req.body);
  const { title, genre, plot, cast } = req.body;
  Movie.create({
    title: title,
    genre: genre,
    plot: plot,
    cast: cast,
  })
    .then((createdMovie) => {
      console.log("New Movie:", createdMovie);
      res.redirect("/movies");
      // res.redirect(`/movies/${createdMovie._id}`);
    })
    .catch((err) => next(err));
});

router.get("/movies/:id", (req, res, next) => {
  Movie.findById(req.params.id)
    .populate("cast")
    .then((moviesFromDB) => {
      res.render("movies/index", { movies: moviesFromDB });
    })
    .catch((err) => {
      next(err);
    });
});

router.post("/movies/:id", (req, res, next) => {
  const movieId = req.params.id;
  const { title, genre, plot, cast } = req.body;
  Movie.findByIdAndUpdate(
    movieId,
    {
      title: title,
      genre: genre,
      plot: plot,
      cast: cast,
    },
    { new: true }
  )
    .then((updatedMovie) => {
      console.log(updatedMovie);
      //res.redirect("/movies");
      res.redirect(`/movies/${updatedMovie._id}`);
    })
    .catch((err) => {
      next(err);
    });
});

router.get("/movies/:id/edit", (req, res, next) => {
  Celeb.find().then((celebs) =>
    Movie.findById(req.params.id)
      .populate("cast")
      .then((moviesFromDB) => {
        res.render("movies/edit", { movies: moviesFromDB, celebs });
      })
      .catch((err) => {
        next(err);
      })
  );
});

module.exports = router;
