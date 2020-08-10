const mongoose = require('mongoose');

const movie = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    violence: {
        type: Number,
        default: 0,
        validate(value) {
          if (value < 0) throw new Error("Negative scores aren't real.");
        }
    }, 
    values: {
        type: Number,
        default: 0,
        validate(value) {
          if (value < 0) throw new Error("Negative scores aren't real.");
        }
    }, 
    age: {
        type: Number,
        default: 0,
        validate(value) {
          if (value < 0) throw new Error("Negative scores aren't real.");
        }
    },
});


module.exports = movieSchema = mongoose.model('Reviewed-movie', movie);
