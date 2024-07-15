import React from 'react';

import Navigation from './Navigation';
import classes from './MainHeader.module.css';

const MainHeader = (props) => {
  return (
    <nav className={classes['main-header']}>
      <h1>Expense Diray</h1>
      <Navigation onLogout={props.onLogout} />
    </nav>
  );
};

export default MainHeader;
