import React from 'react';
import { CardConsumer } from '../providers/CardProvider';
import {
  Route,
  Redirect
} from 'react-router-dom'

const ProtectedRoute = ({ component: Component, ...rest }) => (
    <CardConsumer>
        {({isAuthenticated }) => (
            <Route {...rest} render={(props) => (
                isAuthenticated === true ?
                    <Component {...props} /> : <Redirect to={{ pathname: '/', state: { from: props.location } }} />
            )} />
        )}
    </CardConsumer>
);

export default ProtectedRoute