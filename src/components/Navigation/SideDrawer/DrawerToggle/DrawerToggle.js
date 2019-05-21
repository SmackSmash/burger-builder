import React from 'react';
import classes from './DrawerToggle.module.css';

const drawerToggle = props => (
  <div className={classes.Menu} onClick={props.sideDrawerToggleHandler}>
    &#9776;
  </div>
);

export default drawerToggle;
