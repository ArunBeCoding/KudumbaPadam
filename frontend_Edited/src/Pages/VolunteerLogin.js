import React, { Component } from 'react';
import Axios from 'axios';
import Volunteer from "./Volunteer";
import { Input, Card, Button } from '@material-ui/core';

class VolunteerLogin extends React.Component {
    constructor(props) {
        super(props);
        this.state  = {
            isLoggedIn: false,
            loginError: false,
            currVolunteerName: "",
            currToken: "",
            emailAttempt: "", 
            passwordAttempt: ""
        }
    }

    handleChangeEmail = event => {
        this.setState({ emailAttempt: event.target.value });
    }
    handleChangePassword = event => {
        this.setState({ passwordAttempt: event.target.value });
    }
    submitLoginPage = event => {
        event.preventDefault();

        const loginCredentials = {
            email: this.state.emailAttempt,
            password: this.state.passwordAttempt
        }
            
        try{
            Axios.post('/loginVolunteer',{ loginCredentials })
                .then(res => {
                    console.log(res);
                    this.setState({
                        isLoggedIn: true,
                        currVolunteerName: res.data.volunteer_name,
                        currToken: res.data.token
                    });
                }).catch(err => {
                    this.setState({loginError: true})
                    throw err;
                });
        } catch (err) {
            const error = err;
        }
    }

    showIfError = () => {
        if(this.state.loginError) {
            return(<p>Login credentials are invalid. Try again.</p>);
        } else {
            return(<p></p>);
        }
    }

    loginPage = () => {
        const CardStyle = {
            width: '300px',
            margin: 'auto',
            'margin-top': '20px'
        }
        return(
            <div>
                <Card style={CardStyle}>
                    <h4>Enter Volunteer Credentials</h4>
                    <form id="login-volunteer" onSubmit = { this.submitLoginPage } >
                        <label>
                            <Input type="text" placeholder="email" onChange={ this.handleChangeEmail } />
                        </label>
                        <label>
                            <Input type="password" placeholder="password" onChange={ this.handleChangePassword } />
                        </label>
                        <p></p>
                        <Button variant="contained" color="secondary" type="submit">Login</Button>
                    </form>
                    { this.showIfError() }
                </Card>
            </div>
        );
    }

    logout = () => {
        try{
            Axios.post('/postLogoutVolunteerAllDevices',{}, {
                headers: {
                  'Authorization': `Bearer ${this.state.currToken}`
                }
              }).then(res => {
                    console.log(res);
                    this.setState({
                        isLoggedIn: false
                    })
                })
        } catch (err) {
            console.log(err);
        }
    }

    volunteerPage = () => {
        return(
            <div>
                <Volunteer onclick={ this.logout } currVolunteerName={this.state.currVolunteerName} currToken={this.state.currToken} />
            </div>
        );
    }

    render() {
        return(
            <div>
                {this.props.navbar("Volunteer")}
                {this.state.isLoggedIn ? this.volunteerPage() : this.loginPage()}
            </div>
        );
    }
}

export default VolunteerLogin;