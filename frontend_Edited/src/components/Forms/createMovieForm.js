import React, { Component } from 'react'
import Axios from 'axios';
import {Button, Typography, TextField } from '@material-ui/core'

class CreateMovieForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "",
            studio: "",
            year: 0,
            showForm: true
        }
    }

    switchPage = event => {
        this.setState({
            showForm: !this.state.showForm
        })
    }

    handleChangeMovie = event => {
        this.setState({ movie: event.target.value });
    }
    handleChangeStudio = event => {
        this.setState({ studio: event.target.value });
    }
    handleChangeYear = event => {
        this.setState({ year: event.target.value });
    }

    handleSubmit = event => {
        event.preventDefault();

        const newMovie = {
            title: this.state.movie,
            studio: this.state.studio,
            year: this.state.year
        };

        Axios.post('/postNewMovie', {newMovie}, {
            headers: {
              'Authorization': `Bearer ${this.props.token}`
            }
          }).then(res => {
                console.log(res);
                console.log(res.data);
            })
        
        document.getElementById("create-movie-form-admin").reset();

        this.setState({
            showForm: !this.state.showForm
        })
    }

    showCreateMovieForm = () => {
        const labelStyle = {
            "display": "block",
            "margin": "20px"
        }
        return(
            <div>
                <form id="create-movie-form-admin" onSubmit={this.handleSubmit}>
                    <label style={labelStyle}>
                        <TextField type="text" label="Movie Name" onChange={ this.handleChangeMovie } />
                    </label>
                    <label style={labelStyle}>
                        <TextField type="text" label="Studio Name" onChange={ this.handleChangeStudio } />
                    </label>
                    <label style={labelStyle}>
                        <TextField type="number" label="Year Released" onChange={ this.handleChangeYear } />
                    </label>
                    <Button variant="contained" color="secondary" type="submit">New Movie</Button>
                </form>
            </div>
        );
    }

    showSubmittedPage = () => {
        return(
            <div>
                <h3>New Movie has been submitted!</h3>
                <Button variant="contained" color="primary" onClick={this.switchPage}>Submit Another Movie</Button>
            </div>
        );
    }

    render() {
        return(
            <div>
                {this.state.showForm === true? this.showCreateMovieForm(): this.showSubmittedPage()}
                <p></p>
            </div>
        );
    }
}

export default CreateMovieForm;