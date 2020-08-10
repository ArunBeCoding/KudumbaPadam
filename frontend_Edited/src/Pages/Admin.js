import React, { Component } from 'react';
import Axios from 'axios';
import CreateMovieForm from '../components/Forms/createMovieForm';
import CreateNewVolunteerForm from '../components/Forms/createNewVolunteerForm';
import PendingMovieCard from '../components/VolunteerCards/PendingMovie';
import ReviewedMovieCard from '../components/AdminCards/ReviewedMovie';
import MovieCardToDelete from '../components/AdminCards/MovieCardToDelete';
import ZeroResultsCard from '../components/CommonCards/ZeroResults';
import { Card, Typography, Button } from '@material-ui/core';
import '../css/PendingMovies.css';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import IconButton from '@material-ui/core/IconButton';

class Admin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            MAX_LIST_ITEMS: 3,
            isPending: -1,
            pendingMovies: [],
            isReviewedShown: -1,
            ReviewedMovies: [],
            isSubmittedShown: -1,
            SubmittedMovies: [],
            SubmittedStartIndex: 0,
            SubmittedEndIndex: 3,
            PendingStartIndex: 0,
            PendingEndIndex: 3,
            ReviewedStartIndex: 0,
            ReviewedEndIndex: 3
        }
    }

    //PENDING MOVIES LIST

    switchIsPending = () => {
        if(this.state.isPending !== -1) {
            this.setState({
                isPending: -1
            })
        }
    }

    handlePendingList = event => {
        event.preventDefault();

        if(this.state.isPending !== -1) {
            this.setState({
                isPending: -1
            })
        } else{
            const pendingLink = "/getAllPendingForAdmin";
            Axios.get(pendingLink,{
                headers: {
                  'Authorization': `Bearer ${this.props.token}`
                }
              }).then(res => {
                if(res.data.length === 0) {
                    this.setState({
                        isPending: 0
                    });
                } else {
                    this.setState({
                        isPending: 1,
                        pendingMovies: res.data
                    });
                }
            });
        }
    }
    
    showPendingList = () => {
        if(this.state.isPending === -1) {
            return(
                <div></div>
            );
        } else if(this.state.isPending === 0) {
            return( < ZeroResultsCard /> );
        }else if(this.state.isPending === 1) {
            const pendingMovieList = this.state.pendingMovies.slice(this.state.PendingStartIndex, this.state.PendingEndIndex).map(
                (item, index) => (
                        <li>
                            <PendingMovieCard container={item} token={this.state.volunteerToken} isAdmin={false} closeList={this.switchIsPending}/>
                        </li>
                    ));
            return (
                <div className="TableView">
                    <ul>{ pendingMovieList }</ul>
                    <IconButton color="primary" aria-label="NavigateBeforeIcon" onClick={this.handlePendingListPrevious}>
                        <NavigateBeforeIcon />
                    </IconButton>
                    <IconButton color="primary" aria-label="NavigateNextIcon" onClick={this.handlePendingListNext}>
                        <NavigateNextIcon />
                    </IconButton>
                </div>
              );
        }
    }

    handlePendingListNext = () => {
        const listLen = this.state.pendingMovies.length;
        const MAX_LIST_ITEMS = this.state.MAX_LIST_ITEMS;
        if (this.state.PendingEndIndex + MAX_LIST_ITEMS > listLen) {
            this.setState({
                PendingStartIndex: listLen - MAX_LIST_ITEMS,
                PendingEndIndex: listLen 
            })
        } else {
            this.setState({
                PendingStartIndex: this.state.PendingStartIndex + MAX_LIST_ITEMS,
                PendingEndIndex: this.state.PendingEndIndex + MAX_LIST_ITEMS
            })
        }
    }

    handlePendingListPrevious = () => {
        const listLen = this.state.pendingMovies.length;
        const MAX_LIST_ITEMS = this.state.MAX_LIST_ITEMS;
        if (this.state.PendingStartIndex - MAX_LIST_ITEMS < 0) {
            this.setState({
                PendingStartIndex: 0,
                PendingEndIndex:MAX_LIST_ITEMS
            })
        } else {
            this.setState({
                PendingStartIndex: this.state.PendingStartIndex - MAX_LIST_ITEMS,
                PendingEndIndex: this.state.PendingEndIndex - MAX_LIST_ITEMS
            })
        }
    }

    //REVIEWED MOVIES LIST

    switchIsReviewedListShown = () => {
        if(this.state.isReviewedShown !== -1) {
            this.setState({
                isReviewedShown: -1
            })
        }
    }

    handleReviewedList = event => {
        event.preventDefault();

        if(this.state.isReviewedShown !== -1) {
            this.setState({
                isReviewedShown: -1
            })
        } else{
            const reviewsLink = "/postAllReviewed";
            Axios.get(reviewsLink, {
                headers: {
                  'Authorization': `Bearer ${this.props.token}`
                }
              }).then(res => {
                console.log(res.data);
                if(res.data.length === 0) {
                    this.setState({
                        isReviewedShown: 0
                    });
                } else {
                    this.setState({
                        isReviewedShown: 1,
                        ReviewedMovies: res.data
                    });
                }
            });
        }
    }
    
    showReviewedList = () => {
        if(this.state.isReviewedShown === -1) {
            return(
                <div></div>
            );
        } else if(this.state.isReviewedShown === 0) {
            return( < ZeroResultsCard /> );
        }else if(this.state.isReviewedShown === 1) {
            const reviewedMovieList = this.state.ReviewedMovies.slice(this.state.ReviewedStartIndex, this.state.ReviewedEndIndex).map(
                (item, index) => (
                        <li>
                             <ReviewedMovieCard movie={item} token={ this.props.token } closeList={this.switchIsReviewedListShown}/>
                        </li>
                    ));
            return (
                <div className="TableView">
                    <ul>{ reviewedMovieList }</ul>
                    <IconButton color="primary" aria-label="NavigateBeforeIcon" onClick={this.handleReviewedListPrevious}>
                        <NavigateBeforeIcon />
                    </IconButton>
                    <IconButton color="primary" aria-label="NavigateNextIcon" onClick={this.handleReviewedListNext}>
                        <NavigateNextIcon />
                    </IconButton>
                </div>
            );
        }
    }

    handleReviewedListNext = () => {
        const listLen = this.state.ReviewedMovies.length;
        const MAX_LIST_ITEMS = this.state.MAX_LIST_ITEMS;
        if (this.state.ReviewedEndIndex + MAX_LIST_ITEMS > listLen) {
            this.setState({
                ReviewedStartIndex: listLen - MAX_LIST_ITEMS,
                ReviewedEndIndex: listLen 
            })
        } else {
            this.setState({
                ReviewedStartIndex: this.state.ReviewedStartIndex + MAX_LIST_ITEMS,
                ReviewedEndIndex: this.state.ReviewedEndIndex + MAX_LIST_ITEMS
            })
        }
    }

    handleReviewedListPrevious = () => {
        const listLen = this.state.ReviewedMovies.length;
        const MAX_LIST_ITEMS = this.state.MAX_LIST_ITEMS;
        if (this.state.ReviewedStartIndex - MAX_LIST_ITEMS < 0) {
            this.setState({
                ReviewedStartIndex: 0,
                ReviewedEndIndex:MAX_LIST_ITEMS
            })
        } else {
            this.setState({
                ReviewedStartIndex: this.state.ReviewedStartIndex - MAX_LIST_ITEMS,
                ReviewedEndIndex: this.state.ReviewedEndIndex - MAX_LIST_ITEMS
            })
        }
    }

    //SUBMITTED MOVIES LIST

    switchIsSubmittedListShown = () => {
        if(this.state.isSubmittedShown !== -1) {
            this.setState({
                isSubmittedShown: -1
            })
        }
    }

    handleSubmittedList = event => {
        event.preventDefault();

        if(this.state.isSubmittedShown !== -1) {
            this.setState({
                isSubmittedShown: -1
            })
        } else{
            const submittedLink = "/getAllMoviesToDelete";
            Axios.get(submittedLink, {
                headers: {
                  'Authorization': `Bearer ${this.props.token}`
                }
              }).then(res => {
                console.log(res.data);
                if(res.data.length === 0) {
                    this.setState({
                        isSubmittedShown: 0
                    });
                } else {
                    this.setState({
                        isSubmittedShown: 1,
                        SubmittedMovies: res.data
                    });
                }
            });
        }
    }

    showSubmittedList = () => {
        if(this.state.isSubmittedShown === -1) {
            return(
                <div></div>
            );
        } else if(this.state.isSubmittedShown === 0) {
            return( < ZeroResultsCard /> );
        }else if(this.state.isSubmittedShown === 1) {
            const SubmittedList = this.state.SubmittedMovies.slice(this.state.SubmittedStartIndex, this.state.SubmittedEndIndex).map((item, index) => (
                <li>
                    <MovieCardToDelete movie={item} token={ this.props.token } closeList={this.switchIsSubmittedListShown}/>
                </li>
            ));
            return (
                <div className="TableView">
                    <ul>{ SubmittedList }</ul>
                    <IconButton color="primary" aria-label="NavigateBeforeIcon" onClick={this.handleSubmittedListPrevious}>
                        <NavigateBeforeIcon />
                    </IconButton>
                    <IconButton color="primary" aria-label="NavigateNextIcon" onClick={this.handleSubmittedListNext}>
                        <NavigateNextIcon />
                    </IconButton>
                </div>
              );
        }
    }

    handleSubmittedListNext = () => {
        const listLen = this.state.SubmittedMovies.length;
        const MAX_LIST_ITEMS = this.state.MAX_LIST_ITEMS;
        if (this.state.SubmittedEndIndex + MAX_LIST_ITEMS > listLen) {
            this.setState({
                SubmittedStartIndex: listLen - MAX_LIST_ITEMS,
                SubmittedEndIndex: listLen 
            })
        } else {
            this.setState({
                SubmittedStartIndex: this.state.SubmittedStartIndex + MAX_LIST_ITEMS,
                SubmittedEndIndex: this.state.SubmittedEndIndex + MAX_LIST_ITEMS
            })
        }
    }

    handleSubmittedListPrevious = () => {
        const listLen = this.state.SubmittedMovies.length;
        const MAX_LIST_ITEMS = this.state.MAX_LIST_ITEMS;
        if (this.state.SubmittedStartIndex - MAX_LIST_ITEMS < 0) {
            this.setState({
                SubmittedStartIndex: 0,
                SubmittedEndIndex:MAX_LIST_ITEMS
            })
        } else {
            this.setState({
                SubmittedStartIndex: this.state.SubmittedStartIndex - MAX_LIST_ITEMS,
                SubmittedEndIndex: this.state.SubmittedEndIndex - MAX_LIST_ITEMS
            })
        }
    }

    render() {
        const CardStyle = {
            width: '1200px',
            margin: 'auto',
            'margin-top': '20px',
            "padding": "20px"
        }
        return(
            <div>
                <Typography variant="h4"> Hi { this.props.AdminName }! </Typography>
                <Card style={CardStyle}>
                    <Typography variant="h5">Enter new movie</Typography>
                    < CreateMovieForm token={ this.props.token }/> 
                </Card>
                <Card style={CardStyle}>
                    <Typography variant="h5">Pending List</Typography>
                    <Button variant="contained" color="secondary" onClick={ this.handlePendingList }>Toggle Pending List</Button>
                    { this.showPendingList() }
                </Card>
                <Card style={CardStyle} className="ApprovePending">
                    <Typography variant="h5">Approve Reviewed Movies</Typography>
                    <Button variant="contained" color="secondary" onClick={ this.handleReviewedList }>Toggle Reviewed List</Button>
                    { this.showReviewedList() }
                </Card>
                <Card style={CardStyle} className="checkMovie">
                    <Typography variant="h5">Submitted Movies</Typography>
                    <Button variant="contained" color="secondary" onClick={ this.handleSubmittedList }>All Movies</Button>
                    { this.showSubmittedList() }
                </Card>
                <Card style={CardStyle} className="RegisterNewVolunteer">
                    <Typography variant="h5">Register new volunteer</Typography>
                    < CreateNewVolunteerForm token={ this.props.token }/>
                </Card>
                <p></p>
                <Button variant="contained" color="secondary" onClick={ this.props.onclick } >Logout</Button>
                <p></p>
            </div>
        );
    }
}

export default Admin;