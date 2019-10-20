import React, { Component } from "react";
import { Button } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import CircularProgress from '@material-ui/core/CircularProgress';

export default class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            repassword: '',
            status: '',
            isStatus: false
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        //this.handleChange = this.handleChange.bind(this);
        //this.validateForm = this.validateForm.bind(this);
    }

    validateForm = () => {
        return this.state.email.length > 0 && this.state.password.length > 0 && this.state.repassword === this.state.password;
    }

    handleChange = event => {
        this.setState({ [event.target.id]: event.target.value });
    };

    handleSubmit = event => {
        event.preventDefault();
        this.setState({
            status: "",
            isStatus: true
        });
        var formData = new FormData();
        formData.append('email', this.state.email);
        formData.append('password', this.state.password);
        const axios = require('axios');
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }
        axios.post('/register', formData, config)
            .then((response) => {
                this.setState({
                    status: "Pomyślnie dokonano rejestracji",
                    isStatus: false
                });
            })
            .catch(function (error) {
                this.setState({
                    status: "Rejestracja nieudana " + error,
                    isStatus: false
                });
                console.log(error);
            })
    }

    render() {
        return (
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <form onSubmit={this.handleSubmit}>
                    <Typography align="center" component="h1" variant="h5">
                        Rejestracja
                 </Typography>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
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
                        label="Hasło"
                        type="password"
                        id="password"
                        autoComplete="Wpisz hasło"
                        onChange={this.handleChange}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="repassword"
                        label="Hasło"
                        type="password"
                        id="repassword"
                        autoComplete="Wpisz hasło ponownie"
                        onChange={this.handleChange}
                    />
                    {this.state.isStatus ?
                        <Typography variant="h4" component="h3" align="center" margin="normal">
                            <CircularProgress align="center" />
                        </Typography> :
                        <Button
                            disabled={!this.validateForm()}
                            type="submit"
                            fullWidth
                            color="primary"
                            variant="contained">
                            Zarejestruj
                        </Button>
                    }
                </form>
                <Typography variant="h4" component="h3" align="center" margin="normal">
                        {this.state.status}
                </Typography>
            </Container>
        )
    }
}