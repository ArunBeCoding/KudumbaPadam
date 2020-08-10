import React, { Component } from 'react';
import Axios from 'axios';
import {Button, Typography, TextField } from '@material-ui/core'

class CreateNewVolunteerForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pageHandler: true,
            volunteerError: false,
            name: "",
            email: "",
            password: ""
        }
    }

    handleChangeName = event => {
        this.setState({ name: event.target.value });
    }
    handleChangeEmail = event => {
        this.setState({ email: event.target.value });
    }
    handleChangePassword = event => {
        this.setState({ password: event.target.value });
    }
    submitNewVolunteer = event => {
        event.preventDefault();

        //REQUIRES INPUT VALIDATION
        const volunteer = {
            "name": this.state.name,
            "email": this.state.email,
            "password": this.state.password
        }

        try{
            Axios.post('/newVolunteer',{ volunteer }, {
                headers: {
                  'Authorization': `Bearer ${this.props.token}`
                }
              }).then(res => {
                    console.log(res);
                    this.setState({pageHandler: false});
                }).catch(err => {
                    if (err.response.status === 400) {
                        this.setState({volunteerError: true})
                    }
                    throw err;
                });
        } catch (err) {
            const error = err;
        }
    
        document.getElementById("create-new-volunteer").reset();
    }

    showIfError = () => {
        if(this.state.volunteerError) {
            return(<p>Registration details are invalid. Enter again.</p>);
        } else {
            return(<p></p>);
        }
    }

    showForm = () => {
        const labelStyle = {
            "display": "block",
            "margin": "20px"
        }
        return(
            <div>
                <form id="create-new-volunteer" onSubmit= { this.submitNewVolunteer } >
                    <label style={labelStyle}>
                        <TextField type="text" label="Username" onChange= { this.handleChangeName } />
                    </label>
                    <label style={labelStyle}>
                        <TextField type="text" label="Email" onChange= { this.handleChangeEmail } />
                    </label>
                    <label style={labelStyle}>
                        <TextField type="text" label="Password" onChange= { this.handleChangePassword } />
                    </label>
                    <Button variant="contained" color="secondary" type="submit">Create Volunteer</Button>
                </form>
                { this.showIfError() }
            </div>
        );
    }

    pageHandlerSwitch = event => {
        this.setState({
            pageHandler: !this.state.pageHandler
        })
    }

    showSubmitted = () => {
        return(
            <div>
                <h4>New Volunteer has been registered!</h4>
                <Button variant="contained" color="primary" onClick={ this.pageHandlerSwitch }>Create another volunteer!</Button>
            </div>
        );
    }

    render() {
        return(
            <div>
                { this.state.pageHandler === true ? this.showForm(): this.showSubmitted() }
            </div>
        );
    }
}

export default CreateNewVolunteerForm;