import React, { Component } from 'react';
import axios from "axios";
import PendingMovieCard from '../components/VolunteerCards/PendingMovie';
import ZeroResultsCard from '../components/CommonCards/ZeroResults';
import { Button } from '@material-ui/core';
import '../css/PendingMovies.css';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import IconButton from '@material-ui/core/IconButton';

class Volunteer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            MAX_LIST_ITEMS: 3,
            volunteerToken: this.props.currToken,
            volunteerName: this.props.currVolunteerName,
            isPending: -1,
            pendingMovies: [],
            PendingStartIndex: 0,
            PendingEndIndex: 3
        }
    }

    handlePendingList = event => {
        event.preventDefault();

        if(this.state.isPending !== -1) {
            this.setState({
                isPending: -1
            })
        } else{
            const pendingLink = "/getAllPending";
            axios.get(pendingLink, {
                headers: {
                  'Authorization': `Bearer ${this.state.volunteerToken}`
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

    listEachMovie = item => {
        return(
            <div>
                <p>Movie: { item.title }</p>
                <p>Production Studio: { item.studio }</p>
                <p>Year Released: { item.year }</p>
                {/* <button onClick={ this.setStateMovietoEdit(item) }>Edit Movie</button> */}
            </div>
        );
    }

    switchIsPending = () => {
        if(this.state.isPending !== -1) {
            this.setState({
                isPending: -1
            })
        }
    }

    showPendingList = () => {
        const ButtonMarginStyle = {
            margin: "20px"
        }
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
                <div>
                    <ul>{ pendingMovieList }</ul>
                    <IconButton color="primary" aria-label="NavigateBeforeIcon" onClick={this.handlePendingListPrevious}>
                        <NavigateBeforeIcon />
                    </IconButton>
                    <IconButton color="primary" aria-label="NavigateNextIcon" onClick={this.handlePendingListNext}>
                        <NavigateNextIcon />
                    </IconButton>
                    <p></p>
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

    render() {
        return(
            <div className="TableView">
                <h2>Hi {this.state.volunteerName}!</h2>
                <Button variant="contained" color="primary" onClick={ this.handlePendingList }>Toggle Pending List</Button>
                { this.showPendingList() }
                <p></p>
                <Button variant="contained" color="secondary" onClick={ this.props.onclick } >Logout</Button>
            </div>
        );
    }
}

export default Volunteer;