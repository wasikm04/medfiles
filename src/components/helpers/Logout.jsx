import React from "react";
import { Redirect } from 'react-router-dom'

//
//cookies clear();
const Logout = () => {
    const { cookies } = this.props;
    cookies.removeCookie("SESSION");
    localStorage.clear();
    return (<Redirect to={{ pathname: '/'}} />);
  };

  export default Logout;
