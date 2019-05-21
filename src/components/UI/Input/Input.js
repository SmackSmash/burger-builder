import React from 'react';
import classes from './Input.module.css';

const input = props => {
  let inputElement = null;

  switch (props.elementType) {
    case 'input':
      inputElement = <input className={classes.Text} id={props.name} {...props.elementConfig} />;
      break;
    case 'textarea':
      inputElement = <textarea {...props.elementConfig} />;
      break;
    default:
      inputElement = <input className={classes.Text} {...props.elementConfig} />;
  }
  return (
    <div className={classes.Input}>
      <label htmlFor={props.name} className={classes.Label}>
        {props.label}
      </label>
      {inputElement}
    </div>
  );
};

export default input;
