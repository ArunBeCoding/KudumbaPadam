const mongoose = require('mongoose');

const pendingMovie = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    year: {
        type: Number,
        default: 0,
        validate(value) {
          if (value < 0) throw new Error("Negative years cannot be entered.");
        }
    }, 
    studio: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
});


module.exports = pendingMovieSchema = mongoose.model('New-Movie', pendingMovie);
