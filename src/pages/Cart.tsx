import React from 'react';

const Cart: React.FC = () => {
  return (
    <div className="cart-page">
      <h1>Your Cart</h1>
      <div className="cart-container">
        <section className="cart-items">
          {/* Cart items will be listed here */}
        </section>
        <section className="cart-summary">
          <h2>Order Summary</h2>
          <div className="summary-item">
            <span>Subtotal</span>
            <span>$0.00</span>
          </div>
          <div className="summary-item">
            <span>Shipping</span>
            <span>$0.00</span>
          </div>
          <div className="summary-item total">
            <span>Total</span>
            <span>$0.00</span>
          </div>
          <button className="checkout-button">Proceed to Checkout</button>
        </section>
      </div>
    </div>
  );
};

export default Cart; 