import React from 'react';
import classes from './BuildControl.module.css';

const buildControl = props => {
  let lessDisabled = null;
  if (props.quantity === 0) {
    lessDisabled = 'disabled';
  }
  return (
    <div className={classes.BuildControl}>
      <div className={classes.Label}>{props.ingredient}</div>
      <button
        disabled={lessDisabled}
        className={classes.More}
        onClick={() => props.removeIngredient(props.ingredient)}
      >
        Less
      </button>
      <button className={classes.Less} onClick={() => props.addIngredient(props.ingredient)}>
        More
      </button>
    </div>
  );
};

export default buildControl;
