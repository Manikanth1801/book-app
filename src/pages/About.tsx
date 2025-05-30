import React from 'react';

const About: React.FC = () => {
  return (
    <div className="about-page">
      <h1>About Us</h1>
      <section className="our-story">
        <h2>Our Story</h2>
        <p>Welcome to our Subhman.Store, where we bring the joy of reading to everyone.</p>
      </section>
      <section className="mission">
        <h2>Our Mission</h2>
        <p>To provide access to quality books and promote the love of reading.</p>
      </section>
      <section className="team">
        <h2>Our Team</h2>
        {/* Team members will be added here */}
      </section>
    </div>
  );
};

export default About; 