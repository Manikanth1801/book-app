import React from 'react';

const Home: React.FC = () => {
  return (
    <div className="home-page">
      <h1>Welcome to Our Book Store</h1>
      <section className="featured-books">
        <h2>Featured Books</h2>
        {/* Featured books will be added here */}
      </section>
      <section className="categories">
        <h2>Browse by Category</h2>
        {/* Categories will be added here */}
      </section>
    </div>
  );
};

export default Home; 