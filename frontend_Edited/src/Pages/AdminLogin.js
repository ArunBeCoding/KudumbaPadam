import React, { Component } from 'react';
import Axios from 'axios';
import Admin from "./Admin";
import { Input, Card, Button } from '@material-ui/core';

class AdminLogin extends React.Component {
    constructor(props) {
        super(props);
        this.state  = {
            isLoggedIn: false,
            loginError: false,
            AdminName: "",
            currToken: "",
            usernameAttempt: "", 
            passwordAttempt: ""
        }
    }

    handleChangeUsername = event => {
        this.setState({ usernameAttempt: event.target.value });
    }
    handleChangePassword = event => {
        this.setState({ passwordAttempt: event.target.value });
    }
    submitLoginPage = event => {
        event.preventDefault();

        const loginCredentials = {
            username: this.state.usernameAttempt,
            password: this.state.passwordAttempt
        }
            
        try{
            Axios.post('/postLoginAdmin',{ loginCredentials })
                .then(res => {
                    console.log(res);
                    this.setState({
                        isLoggedIn: true,
                        AdminName: res.data.admin_name,
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
                    <h4>Enter Admin Credentials</h4>
                    <form id="login-admin" onSubmit = { this.submitLoginPage } >
                        <label>
                            <Input type="text" placeholder="username" onChange={ this.handleChangeUsername } />
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
            Axios.post('/postLogoutAdminAllDevices',{}, {
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

    adminPage = () => {
        return(
            <div>
                <Admin onclick={ this.logout } AdminName={this.state.AdminName} token={this.state.currToken} />
            </div>
        );
    }

    render() {
        return(
            <div>
                {this.props.navbar("Admin")}
                {this.state.isLoggedIn ? this.adminPage() : this.loginPage()}
            </div>
        );
    }
}

export default AdminLogin;