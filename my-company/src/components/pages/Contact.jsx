// src/components/Contact.jsx
import React, { useState } from 'react';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate form submission
    console.log('Form submitted:', formData);
    setSubmitted(true);
    // Optionally reset form
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div style={{ padding: '20px', maxWidth: '500px', margin: '0 auto' }}>
      <h2>Contact Us</h2>
      {submitted ? (
        <p style={{ color: 'green' }}>Thank you! Your message has been received.</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '10px' }}>
            <label>Name:</label><br />
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              style={{ width: '100%' }}
            />
          </div>

          <div style={{ marginBottom: '10px' }}>
            <label>Email:</label><br />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              style={{ width: '100%' }}
            />
          </div>

          <div style={{ marginBottom: '10px' }}>
            <label>Message:</label><br />
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              style={{ width: '100%' }}
            />
          </div>

          <button type="submit">Send Message</button>
        </form>
      )}
    </div>
  );
}

export default Contact;