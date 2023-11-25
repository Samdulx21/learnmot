import React, { useState, useEffect } from 'react';
import { Route, Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';

const PrivateRoute = ({ element: Element, allowedRoles, ...rest }) => {
  const [userRoles, setUserRoles] = useState([]);

  useEffect(() => {
    if (typeof window !== "undefined" && window.localStorage) {
      const user = JSON.parse(localStorage?.getItem("user"));
      setUserRoles(user?.roles || []);
    }
  }, []);

  const hasAccess = allowedRoles.some(role => userRoles.includes(role));

  return (
    <Route
      {...rest}
      element={(props) =>
        hasAccess ? (
          <Element {...props} />
        ) : (
          <Navigate to="/unauthorized" replace={true} />
        )
      }
    />
  );
};

PrivateRoute.propTypes = {
  element: PropTypes.elementType.isRequired,
  allowedRoles: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default PrivateRoute;