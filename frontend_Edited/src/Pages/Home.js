import React, { Component } from 'react'
import axios from "axios";
import MovieCard from '../components/UserCards/MovieReview';
import ZeroResultsCard from '../components/CommonCards/ZeroResults';
import { TextField } from '@material-ui/core';
import { Button } from '@material-ui/core';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchResult:"",
            result:-1,
            container: {}
        };
    }

    handleChange = event => {
        this.setState({ searchResult: event.target.value });
    }
    
    handleSubmit = event => {
        event.preventDefault();
        
        const movieLink = "/movies/" + this.state.searchResult;
        axios.get(movieLink).then(res => {
            console.log(res.data);
            if(res.data.length === 0) {
                this.setState({
                    result: 0
                });
            } else {
                this.setState({
                    result: 1,
                    container: res.data
                });
            }
        });
    }

    handleWindow = () => {
        if(this.state.result === 0) {
            return( < ZeroResultsCard /> );
        } else if(this.state.result === 1) {
            return (
                <div>
                  {this.state.container.map((item, index) => (
                    <MovieCard container={item} />
                  ))}
                </div>
              );
        }
    }

    render() {
        return(
            <div>
                {this.props.navbar("Home")}
                <form onSubmit={ this.handleSubmit }>
                    <label>
                        <h3>Search Movie</h3>
                        <TextField variant="outlined" type="text" label="movie name" onChange={ this.handleChange } />
                    </label>
                    <p></p>
                    <Button variant="contained" color="primary" type="submit">Search Movie!</Button>
                </form>
                { this.handleWindow() }
            </div>
        );
    }
}

export default Home;