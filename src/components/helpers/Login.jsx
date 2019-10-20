import React, { Component } from "react";
import { Button } from '@material-ui/core';
import { Redirect } from 'react-router-dom'
import { CardConsumer } from '../providers/CardProvider'
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';

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
                <Container component="main" maxWidth="xs">
                    <CssBaseline />
                    <form onSubmit={this.handleSubmit}>
                        <Typography align="center" component="h1" variant="h5">
                            Logowanie
                         </Typography>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="username"
                            label="Email "
                            name="email"
                            autoComplete="Adres email"
                            autoFocus
                            onChange={this.handleChange}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="hasło"
                            type="password"
                            id="password"
                            autoComplete="Wpisz hasło"
                            onChange={this.handleChange}
                        />
                        <Button
                            disabled={!this.validateForm()}
                            type="submit"
                            fullWidth
                            color="primary"
                            variant="contained"
                        >Zaloguj</Button>
                    </form>
                </Container>

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