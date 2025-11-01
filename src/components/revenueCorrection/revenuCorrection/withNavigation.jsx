// withNavigation.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

const withNavigation = (WrappedComponent) => {
  return function (props) {
    const navigate = useNavigate();
    return <WrappedComponent {...props} navigate={navigate} />;
  };
};

export default withNavigation;
