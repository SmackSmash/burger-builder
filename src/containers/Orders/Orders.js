import React, { Component } from 'react';

import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../components/hoc/withErrorHandler/withErrorHandler';

class Orders extends Component {
  state = {
    orders: [],
    loading: true
  };

  componentDidMount() {
    axios
      .get('/orders.json')
      .then(response => {
        console.log(response);
        const orders = [];
        for (let order in response.data) {
          orders.push({ ...response.data[order], id: order });
        }
        this.setState({ orders: orders, loading: false });
      })
      .catch(error => {
        this.setState({ loading: false });
      });
  }

  render() {
    return (
      <div>
        {this.state.orders.map(order => (
          <Order ingredients={order.ingredients} price={order.price} key={order.id} />
        ))}
      </div>
    );
  }
}

export default withErrorHandler(Orders, axios);
