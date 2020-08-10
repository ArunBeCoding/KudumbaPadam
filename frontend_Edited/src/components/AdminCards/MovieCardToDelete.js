import React, { Component } from 'react';
import Axios from 'axios';
import Popup from "reactjs-popup";
import { Card, Button, Typography, CardContent } from '@material-ui/core';

class MovieCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = { open: false };
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    openModal() {
        this.setState({ open: true });
      }
      closeModal() {
        this.setState({ open: false });
      }
    

    deleteMovie = () => {
        const movie_id = {
            id: this.props.movie._id
        }
        Axios.post('/deleteSubmittedMovie', {movie_id}, {
            headers: {
              'Authorization': `Bearer ${this.props.token}` 
            }
            }).then(res => {
                console.log(res);
                console.log(res.data);
            })
        this.props.closeList();
        this.closeModal();
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
              <Typography variant="h4" color="primary" gutterBottom> { this.props.movie.title }</Typography>
              <Typography variant="subtitle1" color="secondary">Violence Factor</Typography>
              <Typography variant="h5" color="primary" gutterBottom> { this.props.movie.violence }</Typography>
              <Typography variant="subtitle1" color="secondary">Positive Values</Typography>
              <Typography variant="h5" color="primary" gutterBottom> { this.props.movie.values }</Typography>
              <Typography variant="subtitle1" color="secondary">Minimum Age</Typography>
              <Typography variant="h5" color="primary" gutterBottom> { this.props.movie.age }</Typography>
            </CardContent>
            <Button variant="contained" color="primary" className="button" onClick={this.openModal}>Delete Movie</Button>
            <Popup open={this.state.open} closeOnDocumentClick onClose={this.closeModal}>
              <div className="modal">
                <p>This action is irreversible. Are you sure you want to delete this Movie?</p>
                <Button variant="contained" color="secondary" onClick={this.deleteMovie}>Yes, I am Sure</Button>
              </div>
            </Popup>
          </Card>
        </div>
        );
    };
}

export default MovieCard;