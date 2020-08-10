import React, { Component } from 'react';
import Popup from "reactjs-popup";
import ReviewMovieForm from '../Forms/reviewMovieForm.js';
import { Card, CardContent, Button, Typography, Dialog } from '@material-ui/core';
import CreateIcon from '@material-ui/icons/Create';

class PendingMovieCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            submitButton: "Submit"
        }
    }
     render() {
        const CardStyle = {
            width: '300px',
            margin: 'auto',
            'margin-top': '20px',
            padding: "10px"
        }
         return(
            <div>
                <Card style={CardStyle}>
                <CardContent>
                    <Typography variant="subtitle2" color="secondary">Movie</Typography>
                    <Typography variant="h4" color="primary" gutterBottom> { this.props.container.title }</Typography>
                    <Typography variant="subtitle1" color="secondary">Studio Name</Typography>
                    <Typography variant="h5" color="primary" gutterBottom> { this.props.container.studio }</Typography>
                    <Typography variant="subtitle1" color="secondary">Year Released</Typography>
                    <Typography variant="h5" color="primary" gutterBottom> { this.props.container.year }</Typography>
                </CardContent>
                    <Popup trigger={open => (<Button
                                                variant="contained"
                                                color="primary"
                                                endIcon={<CreateIcon/>}
                                            >Review</Button>)} modal closeOnDocumentClick>
                        {close => (
                            <div className="Popup">
                                <div className="content">
                                    <ReviewMovieForm movie={this.props.container} token={this.props.token} onclick={() => {close();}} isAdmin={this.props.isAdmin} closeList={this.props.closeList}/>
                                </div>
                            </div>
                        )}
                    </Popup>
                </Card>
            </div>

         );
     };
}

export default PendingMovieCard;