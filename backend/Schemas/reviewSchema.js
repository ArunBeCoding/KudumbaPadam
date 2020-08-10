const mongoose = require('mongoose');

/*
    movieName: this.state.movieName,            //text
    movieStudio: this.state.movieStudio,        //text
    movieYear: this.state.movieYear,            //number
    pendingID: this.state.pendingID,            //text
    movieViolence: this.state.movieViolence,    //number
    movieValues: this.state.movieValues,        //number
    movieAge: this.state.movieAge               //number
*/

const MovieReview = new mongoose.Schema({
    movieName: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    movieYear: {
        type: Number,
        default: 0,
        validate(value) {
          if (value < 0) throw new Error("Negative years cannot be entered.");
        }
    }, 
    movieStudio: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    pendingID: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    movieViolence: {
        type: Number,
        default: 0,
        validate(value) {
          if (value < 0) throw new Error("Negative score cannot be entered.");
        }
    }, 
    movieValues: {
        type: Number,
        default: 0,
        validate(value) {
          if (value < 0) throw new Error("Negative score cannot be entered.");
        }
    }, 
    movieAge: {
        type: Number,
        default: 0,
        validate(value) {
          if (value < 0) throw new Error("Negative age cannot be entered.");
        }
    }, 
});


module.exports = MovieReviewSchema = mongoose.model('Pending-Review', MovieReview);
