import React from 'react';

const Contact: React.FC = () => {
  return (
    <div className="contact-page">
      <h1>Contact Us</h1>
      <div className="contact-container">
        <section className="contact-info">
          <h2>Get in Touch</h2>
          <div className="info-item">
            <h3>Address</h3>
            <p>123 Book Street, Reading City, RC 12345</p>
          </div>
          <div className="info-item">
            <h3>Email</h3>
            <p>contact@bookstore.com</p>
          </div>
          <div className="info-item">
            <h3>Phone</h3>
            <p>+1 (555) 123-4567</p>
          </div>
        </section>
        <section className="contact-form">
          <h2>Send us a Message</h2>
          {/* Contact form will be added here */}
        </section>
      </div>
    </div>
  );
};

export default Contact; 