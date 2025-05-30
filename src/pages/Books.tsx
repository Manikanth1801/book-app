import React from 'react';

const Books: React.FC = () => {
  return (
    <div className="books-page">
      <h1>Our Collection</h1>
      <div className="filters">
        {/* Filter components will be added here */}
      </div>
      <div className="books-grid">
        {/* Book cards will be rendered here */}
      </div>
      <div className="pagination">
        {/* Pagination will be added here */}
      </div>
    </div>
  );
};

export default Books; 