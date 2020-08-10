const movieSchema = require('../../Schemas/movieSchema.js');

exports.getSpecificMovieReview = async(req, res) => {
    const id = req.params.id;

    const movies = await movieSchema.find({"title": id});
    console.log(`called Movie: ${ id }`);
    try {
        res.send(movies);
    } catch (err) {
        res.status(500).send(err);
    }
}