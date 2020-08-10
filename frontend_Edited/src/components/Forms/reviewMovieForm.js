import React, { Component } from 'react';
import Axios from "axios";
import { Button, TextField, Typography } from "@material-ui/core";


class ReviewMovieForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            reviewStatus: "Review Movie",
            movieName: this.props.movie.title,
            movieStudio: this.props.movie.studio,
            movieYear: this.props.movie.year,
            pendingID: this.props.movie._id,
            movieViolence: 0,
            movieValues: 0,
            movieAge: 0,
        }
    }

    handleChangeViolence = event => {
        this.setState({ movieViolence: event.target.value });
    }

    handleChangeValues = event => {
        this.setState({ movieValues: event.target.value });
    }

    handleChangeAge = event => {
        this.setState({ movieAge: event.target.value });
    }

    handleSubmit = event => {
        event.preventDefault();
        const movieReview = {
            movieName: this.state.movieName,
            movieStudio: this.state.movieStudio,
            movieYear: this.state.movieYear,
            pendingID: this.state.pendingID,
            movieViolence: this.state.movieViolence,
            movieValues: this.state.movieValues,
            movieAge: this.state.movieAge
        };

        console.log(movieReview);

        const postLink = this.props.isAdmin? "/postMovieReviewForAdmin" : "/postMovieReview";
        
        Axios.post(postLink, {movieReview}, {
            headers: {
            'Authorization': `Bearer ${this.props.token}` 
            }
        }).then(res => {
                console.log(res);
                console.log(res.data);
            })
        
        document.getElementById("create-movie-form-review").reset();
        this.setState({
            reviewStatus: "Review Sent"
        })

        this.props.onclick();
        this.props.closeList();

    }

    render() {        
        return(
            <div>
                <h2>Review for { this.state.movieName}:</h2>
                <form id="create-movie-form-review" onSubmit={this.handleSubmit}>
                    <label>
                        <Typography variant="subtitle1" gutterBottom>Violence Factor</Typography>
                        <TextField variant="outlined" label="Violence Score" type="number" label="Violence" onChange={ this.handleChangeViolence } />
                    </label>
                    <p></p>
                    <label>
                        <Typography variant="subtitle1" gutterBottom>Positive Values</Typography>
                        <TextField variant="outlined" label="Violence Positive Values" type="number" label="Values" onChange={ this.handleChangeValues } />
                    </label>
                    <p></p>
                    <label>
                        <Typography variant="subtitle1" gutterBottom>Recommended minimum age</Typography>
                        <TextField variant="outlined" label="Minimum Age" name="name" type="number" label="Min Age" onChange={ this.handleChangeAge } />
                    </label>
                    <p></p>
                    <Button variant="contained" color="secondary" type="submit">Send Review</Button>
                </form>
            </div>
        );
    }
}

export default ReviewMovieForm;