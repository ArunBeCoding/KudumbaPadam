import React, { Component } from 'react';
import { Card, CardContent } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';

class MovieCard extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const CardStyle = {
            width: '300px',
            margin: 'auto',
            'margin-top': '20px'
        }
        return(
        <div>
            <Card style={CardStyle}>
                <CardContent>
                    <Typography variant="subtitle1" gutterBottom>Movie Name:</Typography>
                    <Typography variant="h4" gutterBottom> { this.props.container.title }</Typography>
                    <Typography variant="subtitle1" gutterBottom>Violence Factor:</Typography>
                    <Typography variant="h6" gutterBottom> { this.props.container.violence }</Typography>
                    <Typography variant="subtitle1" gutterBottom>Positive Values:</Typography>
                    <Typography variant="h6" gutterBottom> { this.props.container.values }</Typography>
                    <Typography variant="subtitle1" gutterBottom>Recommended age and above:</Typography>
                    <Typography variant="h6" gutterBottom> { this.props.container.age }</Typography>
                </CardContent>
            </Card>
        </div>
        );
    };
}

export default MovieCard;