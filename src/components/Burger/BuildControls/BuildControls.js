import React from 'react';
import classes from './BuildControls.module.css';
import BuildControl from './BuildControl/BuildControl';

const buildControls = props => {
  return (
    <div className={classes.BuildControls}>
      <p>
        Total Price: <strong>${props.totalPrice.toFixed(2)}</strong>
      </p>
      {Object.keys(props.ingredients).map(ingredient => (
        <BuildControl
          key={ingredient}
          ingredient={ingredient}
          quantity={props.ingredients[ingredient]}
          addIngredient={props.addIngredient}
          removeIngredient={props.removeIngredient}
        />
      ))}
      <button
        onClick={props.purchaseHandler}
        disabled={!props.purchasable}
        className={classes.OrderButton}
      >
        ORDER NOW
      </button>
    </div>
  );
};

export default buildControls;
