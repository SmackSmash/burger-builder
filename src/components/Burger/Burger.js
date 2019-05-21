import React from 'react';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';
import classes from './Burger.module.css';

const burger = props => {
  const transformedArray = [];
  // Split ingredients object into 2 arrays
  const ingredientArray = Object.keys(props.ingredients);
  const quantityArray = Object.values(props.ingredients);
  //Push the defined number of each ingredient into a new array
  ingredientArray.forEach((ingredient, index) => {
    let quantity = quantityArray[index];
    for (let i = 0; i < quantity; i++) {
      transformedArray.push(ingredient);
    }
  });
  //Create an ingredient item for every item in the new array
  const filling = transformedArray.map((ingredient, key) => {
    return <BurgerIngredient key={key} type={ingredient} />;
  });
  //Show prompt if no ingredients set
  let warning = null;
  if (transformedArray.length === 0) {
    warning = <p>Choose some ingredients ya muppet!</p>;
  }

  return (
    <div className={classes.Burger}>
      <BurgerIngredient type="bread-top" />
      {filling}
      {warning}
      <BurgerIngredient type="bread-bottom" />
    </div>
  );
};

export default burger;
