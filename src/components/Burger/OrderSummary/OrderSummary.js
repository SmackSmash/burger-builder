import React from 'react';
import Button from '../../UI/Button/Button';

const orderSummary = props => {
  const ingredientSummary = Object.keys(props.ingredients).map(key => (
    <li key={key}>
      <span style={{ textTransform: 'capitalize' }}>{key}</span>: {props.ingredients[key]}
    </li>
  ));
  return (
    <>
      <h3>Your Order</h3>
      <p>A delicious burger with the following ingredients:</p>
      <ul>{ingredientSummary}</ul>
      <p>${props.totalPrice.toFixed(2)}</p>
      <p>Continue to checkout</p>
      <Button btnType="Danger" clicked={props.purchaseCancelHandler}>
        CANCEL
      </Button>
      <Button btnType="Success" clicked={props.purchaseContinueHandler}>
        PROCEED
      </Button>
    </>
  );
};

export default orderSummary;
