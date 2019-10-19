import React, { Component } from "react";
import { FormControl, Button, InputLabel, Input } from '@material-ui/core';
import { Redirect } from 'react-router-dom'
import { CardConsumer } from '../providers/CardProvider'

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isAuthenticated: this.props.isAuthenticated,
            username: "",
            password: ""
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    validateForm() {
        return this.state.username.length > 0 && this.state.password.length > 0;
    }

    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    }

    componentDidMount() {
        const { cookies } = this.props;
        if (cookies.get("SESSION") != null) {
            let username = localStorage.getItem("username");
            if (username != null) {
                const axios = require('axios');
                axios.get('/user/role/' + username + '/', { withCredentials: true })
                    .then((response) => {
                       // if(response.data.includes("ROLE_USER")){
                        var bool = response.data.includes("ROLE_DOCTOR") ? true : false;
                        this.props.updateCard({
                            isDoctor: bool,
                            isAuthenticated: true,
                            user: username
                        });
                        this.setState({
                            isAuthenticated: true
                        });
                   // }
                    })
                    .catch(function (error) {
                        // handle error
                        console.log(error);
                    })
            }
        }
    }

    handleSubmit = event => {
        event.preventDefault();
        var formData = new FormData();
        formData.append('username', this.state.username);
        formData.append('password', this.state.password);
        const axios = require('axios');
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }

        axios.post('/login', formData, config)
            .then((response) => {
                axios.get('/user/role/' + this.state.username + '/', { withCredentials: true })
                    .then((response) => {
                        var bool = response.data.includes("ROLE_DOCTOR") ? true : false;
                        this.props.updateCard({
                            isDoctor: bool,
                            isAuthenticated: true,
                            user: this.state.username
                        });
                        this.setState({
                            password: '',
                            isAuthenticated: true
                        });
                        localStorage.setItem("username", this.state.username);
                    })
                    .catch(function (error) {
                        // handle error
                        console.log(error);
                    })
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
    }

    render() {
        if (this.state.isAuthenticated) {
            return (<Redirect to={{ pathname: '/home', state: { from: this.props.location } }} />);
        } else {
            return (
                < div className="Login" >
                    <form onSubmit={this.handleSubmit}>
                        <FormControl>
                            <InputLabel htmlFor="username">Email</InputLabel>
                            <Input id="username"
                                aria-describedby="my-helper-text"
                                autoFocus
                                type="email"
                                value={this.state.username}
                                onChange={this.handleChange} />
                        </FormControl>
                        <FormControl>
                            <InputLabel htmlFor="password">Hasło</InputLabel>
                            <Input id="password"
                                aria-describedby="my-helper-text"
                                autoFocus
                                type="password"
                                value={this.state.password}
                                onChange={this.handleChange} />
                        </FormControl>
                        <Button
                            // disabled={!this.validateForm()}
                            type="submit"
                        >Zaloguj</Button>
                    </form>
                </div >
            );
        }

    }
}



const ConnectedLogin = props => (
    <CardConsumer>
        {({ isAuthenticated, updateCard }) => (
            <Login
                {...props}
                isAuthenticated={isAuthenticated}
                updateCard={updateCard}
            />
        )}
    </CardConsumer>
)


export default ConnectedLogin;