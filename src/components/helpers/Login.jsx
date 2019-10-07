import React, { Component } from "react";
import { FormControl, Button, InputLabel, Input } from '@material-ui/core';
import { axios } from 'axios';
import { withCookies, useCookies } from "react-cookie";
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
    }

    validateForm() {
        return this.state.email.length > 0 && this.state.password.length > 0;
    }

    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    }

    handleSubmit = event => {
        event.preventDefault();
        const body = { username: this.state.username, password: this.state.password }


        fetch("/login")
            .then(res => res.json())
            .then(json => this.setState({ contacts: json.results }));

             /*
        axios.get('http://localhost:8080/card/userNew@pw.pl', { withCredentials: true })
            .then(function (response) {
                this.props.updateCard({ card: response })
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })



        if (body != null) {

            var formData = new FormData();
            formData.append('username', this.state.username);
            formData.append('password', this.state.password);


            try {
                const response = fetch('/login', {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                });
                const json = response.json();
                console.log('Success:', JSON.stringify(json));
            } catch (error) {
                console.error('Error:', error);
            }

           
                        axios.post('/login', { body })
                            .then(function (response) {
                                this.props.updateCard({
                                    isAuthenticated: true,
                                    user: this.state.username
            
                                })
                                const updatedCard = { isAuthenticated: true }
                                this.props.updateCard(updatedCard)
            
                                axios.get('/user' + this.state.username, { withCredentials: true })
                                    .then(function (response) {
                                        const [cookies, setCookie, removeCookie] = useCookies(['SESSION']);
                                        this.props.updateCard({ isDoctor: false })
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
        }*/
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
                            //disabled={!this.validateForm()}
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


export default ConnectedLogin