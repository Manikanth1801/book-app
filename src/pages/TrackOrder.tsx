import React from 'react';

const TrackOrder: React.FC = () => {
  return (
    <div className="track-order-page">
      <h1>Track Your Order</h1>
      <div className="track-order-container">
        <section className="order-search">
          <h2>Enter Order Details</h2>
          <div className="search-form">
            {/* Order tracking form will be added here */}
          </div>
        </section>
        
        <section className="order-status">
          <h2>Order Status</h2>
          <div className="status-timeline">
            {/* Order status timeline will be added here */}
          </div>
        </section>

        <section className="order-details">
          <h2>Order Details</h2>
          <div className="details-container">
            {/* Order details will be displayed here */}
          </div>
        </section>
      </div>
    </div>
  );
};

export default TrackOrder; 