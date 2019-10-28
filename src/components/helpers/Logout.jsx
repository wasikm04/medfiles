import React from "react";
import { Redirect } from 'react-router-dom'
import { CardConsumer } from '../providers/CardProvider'

const Logout = (props) => {
    const { cookies } = props;
    cookies.remove("SESSION");
    localStorage.clear();
    props.updateCard({isAuthenticated: false})
    return (<Redirect to={{ pathname: '/'}} />);
  };


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
