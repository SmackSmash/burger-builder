import React, { Component } from 'react';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../components/hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-orders';

const INGREDIENT_PRICES = {
  salad: 0.5,
  bacon: 0.7,
  cheese: 0.4,
  meat: 1.3
};

class BurgerBuilder extends Component {
  state = {
    ingredients: null,
    totalPrice: 4,
    purchasable: false,
    purchasing: false,
    loading: false,
    error: false
  };

  componentDidMount() {
    axios
      .get('/ingredients.json')
      .then(response => {
        this.setState({ ingredients: response.data });
      })
      .catch(error => {
        this.setState({ error: true });
      });
  }

  updatePurchaseState = ingredientsCopy => {
    if (Object.values(ingredientsCopy).reduce((a, b) => a + b) === 0) {
      this.setState({ purchasable: false });
    } else {
      this.setState({ purchasable: true });
    }
  };

  addIngredientHandler = ingredient => {
    const ingredientsCopy = { ...this.state.ingredients };
    ingredientsCopy[ingredient] = ingredientsCopy[ingredient] + 1;
    this.setState({
      ingredients: ingredientsCopy,
      totalPrice: this.state.totalPrice + INGREDIENT_PRICES[ingredient]
    });
    this.updatePurchaseState(ingredientsCopy);
  };

  removeIngredientHandler = ingredient => {
    const ingredientsCopy = { ...this.state.ingredients };
    if (ingredientsCopy[ingredient] > 0) {
      ingredientsCopy[ingredient] = ingredientsCopy[ingredient] - 1;
      this.setState({
        ingredients: ingredientsCopy,
        totalPrice: this.state.totalPrice - INGREDIENT_PRICES[ingredient]
      });
    }
    this.updatePurchaseState(ingredientsCopy);
  };

  purchaseHandler = () => {
    this.setState({ purchasing: true });
  };

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };

  purchaseContinueHandler = () => {
    const queryParams = [];
    for (let ingredient in this.state.ingredients) {
      queryParams.push(
        `${encodeURIComponent(ingredient)}=${encodeURIComponent(
          this.state.ingredients[ingredient]
        )}`
      );
    }
    this.props.history.push({
      pathname: '/checkout',
      search: '?' + queryParams.join('&') + '&price=' + this.state.totalPrice.toFixed(2)
    });
  };

  render() {
    let orderSummary = null;
    let burger = this.state.error ? <p>Ingredients can't be loaded</p> : <Spinner />;

    if (this.state.ingredients) {
      orderSummary = (
        <OrderSummary
          purchaseCancelHandler={this.purchaseCancelHandler}
          purchaseContinueHandler={this.purchaseContinueHandler}
          ingredients={this.state.ingredients}
          totalPrice={this.state.totalPrice}
        />
      );
      burger = (
        <>
          <Burger ingredients={this.state.ingredients} />
          <BuildControls
            purchaseHandler={this.purchaseHandler}
            purchasable={this.state.purchasable}
            totalPrice={this.state.totalPrice}
            ingredients={this.state.ingredients}
            addIngredient={this.addIngredientHandler}
            removeIngredient={this.removeIngredientHandler}
          />
        </>
      );
    }
    if (this.state.loading) {
      orderSummary = <Spinner />;
    }
    return (
      <>
        <Modal show={this.state.purchasing} purchaseCancelHandler={this.purchaseCancelHandler}>
          {orderSummary}
        </Modal>
        {burger}
      </>
    );
  }
}

export default withErrorHandler(BurgerBuilder, axios);
