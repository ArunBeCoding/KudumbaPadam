import React, { Component } from 'react';
import Axios from "axios";
import { Card, Button, Typography, CardContent } from '@material-ui/core';

/*
    movieAge: 12
    movieName: "ennam"
    movieStudio: "utopia"
    movieValues: 7
    movieViolence: 3
    movieYear: 2012
    pendingID: "5f16dcd781616e25d44fde7e"
    __v: 0
    _id: "5f1844e736b822ae90d9c861"
*/

class ReviewedMovieCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            approvalStatus: 1,
            approvalText: "Approve",
            denialStatus: 1,
            denialText: "Deny",
            movieName: this.props.movie.movieName,
            movieStudio: this.props.movie.movieStudio,
            movieYear: this.props.movie.movieYear,
            reviewID: this.props.movie._id,
            movieViolence: this.props.movie.movieViolence,
            movieValues: this.props.movie.movieValues,
            movieAge: this.props.movie.movieAge
        }
    }

    approveReviewHandler = () => {
        if (this.state.approvalStatus === 1) {
            const review = {
                title: this.state.movieName,
                violence: this.state.movieViolence,
                values: this.state.movieValues,
                age: this.state.movieAge,
                reviewID: this.state.reviewID
            };
            Axios.post('/confirmReview', { review }, {
                headers: {
                  'Authorization': `Bearer ${this.props.token}`
                }
              }).then(res => {
                    console.log(res);
                    console.log(res.data);
                })

            this.setState({
                approvalStatus: 0,
                approvalText: "Review Approved"
            })
        }
        this.props.closeList();
    }

    sendBackHandler = () => {
        if(this.state.denialStatus === 1) {
            const reviewToDelete = {
                title: this.state.movieName,
                studio: this.state.movieStudio,
                year: this.state.movieYear,
                reviewID: this.state.reviewID
            }
            Axios.post('/sendBackReview', { reviewToDelete }, {
                headers: {
                  'Authorization': `Bearer ${this.props.token}`
                }
              }).then(res => {
                    console.log(res);
                    console.log(res.data);
                })

            this.setState({
                denialStatus: 0,
                denialText: "Review sent back"
            })
        }
        this.props.closeList();
    }

    render() {
        const CardStyle = {
            width: '300px',
            margin: 'auto',
            'margin-top': '20px',
            padding: "10px"
        }
        const buttonStyle = {
            margin: "10px"
        }
        return(
            <div>
                <Card style={CardStyle}>
                    <CardContent>
                        <Typography variant="subtitle2" color="secondary">Movie</Typography>
                        <Typography variant="h4" color="primary" gutterBottom> { this.state.movieName }</Typography>
                        <Typography variant="subtitle1" color="secondary">Violence Factor</Typography>
                        <Typography variant="h5" color="primary" gutterBottom> { this.state.movieViolence }</Typography>
                        <Typography variant="subtitle1" color="secondary">Positive Values</Typography>
                        <Typography variant="h5" color="primary" gutterBottom> { this.state.movieValues }</Typography>
                        <Typography variant="subtitle1" color="secondary">Minimum Age</Typography>
                        <Typography variant="h5" color="primary" gutterBottom> { this.state.movieAge }</Typography>
                    </CardContent>
                    <Button style={buttonStyle} variant="contained" color="primary" onClick={this.approveReviewHandler}>{this.state.approvalText}</Button>
                    <Button style={buttonStyle} variant="contained" color="primary" button onClick={this.sendBackHandler}> {this.state.denialText}</Button>
                </Card>
            </div>
        );
    }
}

export default ReviewedMovieCard;