import React, { useContext } from 'react';

import classes from './Navigation.module.css';
import AuthContext from '../../store/AuthContext';
import { Link } from 'react-router-dom';

const Navigation = (props) => {

  const ctx = useContext(AuthContext);

  return (

    <nav className={classes.nav}>
      <ul>
        {ctx.isLoggedIn && (
          <li>

            <Link to="/">Home</Link>
          </li>
        )}
        {ctx.isLoggedIn && (
          <li>

            <Link to="/layout">Users</Link>
          </li>
        )}
        {ctx.isLoggedIn && (
          <li>

            <Link to="/admin">Admin</Link>
          </li>
        )}
        {ctx.isLoggedIn && (
          <li>
            <button onClick={ctx.onLogout}>Logout</button>
          </li>
        )}
      </ul>
    </nav>

  );
};

export default Navigation;
