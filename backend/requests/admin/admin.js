const pendingSchema = require('../../Schemas/pendingMovieSchema.js');
const reviewSchema = require('../../Schemas/reviewSchema');
const movieSchema = require('../../Schemas/movieSchema');

exports.postNewPendingMovie = async(req, res) => {
    console.log(req.body.newMovie);
    const newMovie = new pendingSchema(req.body.newMovie);
  
    try {
      await newMovie.save();
      res.send(newMovie);
    } catch (err) {
      res.status(500).send(err);
    }
}

exports.getAllUncomfirmedReviews = async(req, res) => {
    console.log("Post All Reviews found");
    const reviewedMovies = await reviewSchema.find();
    try {
      res.send(reviewedMovies);
    } catch (err) {
      res.status(500).send(err);
    }
}

exports.confirmMovieReview = async(req, res) => {
    console.log(req.body.review);
    const movie = new movieSchema(req.body.review);
    const IDtoDelete = req.body.review.reviewID;
  
    reviewSchema.findByIdAndDelete(IDtoDelete, function (err) {
      if(err) console.log(err);
      console.log(`Successful deletion of reviewed movie: ${IDtoDelete}`);
    });
  
    try {
      await movie.save();
      res.send(movie);
    } catch (err) {
      res.status(500).send(err);
    }
}

exports.denyMovieReview = async(req, res) => {
    console.log(req.body.reviewToDelete);
    const movie = new pendingSchema(req.body.reviewToDelete);
    const IDtoDelete = req.body.reviewToDelete.reviewID;
  
    reviewSchema.findByIdAndDelete(IDtoDelete, function (err) {
      if(err) console.log(err);
      console.log(`Successful deletion of reviewed movie: ${IDtoDelete}`);
    });
  
    try {
      await movie.save();
      res.send(movie);
    } catch (err) {
      res.status(500).send(err);
    }
}

exports.getAllMoviesToDelete = async(req, res) => {
  const allMovies = await movieSchema.find();
    try {
      res.send(allMovies);
    } catch (err) {
      res.status(500).send(err);
    }
}

exports.deleteSubmittedMovie = async(req, res) => {
  const IDtoDelete = req.body.movie_id.id;
  
    movieSchema.findByIdAndDelete(IDtoDelete, function (err) {
      if(err) console.log(err);
      console.log(`Successful deletion of submitted movie: ${IDtoDelete}`);
    });
}