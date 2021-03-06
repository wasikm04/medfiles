import React, { useContext } from 'react';
import { CardContext } from '../providers/CardProvider';
import {
    Route,
    Redirect
} from 'react-router-dom'

const ProtectedRoute = ({ component: Component, ...rest }) => {
    const { isAuthenticated } = useContext(CardContext);
    return (
   // <CardConsumer>
    //   {({ isAuthenticated }) => (
            <Route {...rest} render={ (props) =>
                isAuthenticated ?
                    <Component {...props} />
                    :
                    <Redirect to='/login'
                     />
            }
            />
    //    )}
  //  </CardConsumer>
    );
}

export default ProtectedRoute