import React from "react";
import { Redirect } from 'react-router-dom'
import { CardConsumer } from '../providers/CardProvider'

const Logout = (props) => {
    const { cookies } = props;
    invalidateSession();
    cookies.remove("SESSION");
    localStorage.clear();
    props.updateCard({isAuthenticated: false})
    return (<Redirect to={{ pathname: '/'}} />);
  };

  const invalidateSession = () => {
    const axios = require('axios');

    axios.post('/logout',  { withCredentials: true })
      .then((response) => {  
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      })
  }

  const ConnectedLogout = props => (
    <CardConsumer>
        {({ updateCard }) => (
            <Logout
                {...props}
                updateCard={updateCard}
            />
        )}
    </CardConsumer>
)

  export default ConnectedLogout;
