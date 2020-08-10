const pendingSchema = require('../../Schemas/pendingMovieSchema.js');
const reviewSchema = require('../../Schemas/reviewSchema');

exports.getAllPendingMovies = async(req, res) => {
    const pendingMovies = await pendingSchema.find();
    try {
      res.send(pendingMovies);
    } catch (err) {
      res.status(500).send(err);
    }
}

exports.postNewMovieReview = async(req, res) => {
    console.log(req.body.movieReview);
    const MovieReview = new reviewSchema(req.body.movieReview);
    const IDtoDelete = req.body.movieReview.pendingID;
  
    pendingSchema.findByIdAndDelete(IDtoDelete, function (err) {
      if(err) console.log(err);
      console.log(`Successful deletion of pending movie: ${IDtoDelete}`);
    });
  
    try {
      await MovieReview.save();
      res.send(MovieReview);
    } catch (err) {
      res.status(500).send(err);
    }
}