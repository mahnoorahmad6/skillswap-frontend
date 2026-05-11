import React, { useState } from 'react';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'General Inquiry',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Submitted:', formData);
    setSubmitted(true);
    // Here you would typically send the data to your backend API
  };

  return (
    <div className="contact-container">
      <div className="contact-header">
        <h1>Get in Touch</h1>
        <p>Have questions about swapping skills? We're here to help.</p>
      </div>

      <div className="contact-content">
        {/* Contact Info Sidebar */}
        <div className="contact-info">
          <div className="info-item">
            <h3>Support</h3>
            <p>support@skillswap.com</p>
          </div>
          <div className="info-item">
            <h3>Community</h3>
            <p>Join our Discord Server</p>
          </div>
          <div className="info-item">
            <h3>Safety</h3>
            <p>report@skillswap.com</p>
          </div>
        </div>

        {/* Contact Form */}
        <div className="contact-form-card">
          {submitted ? (
            <div className="success-message">
              <h3>Message Sent!</h3>
              <p>Our team will get back to you within 24 hours.</p>
              <button onClick={() => setSubmitted(false)}>Send another</button>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Name</label>
                <input 
                  type="text" 
                  name="name" 
                  value={formData.name} 
                  onChange={handleChange} 
                  placeholder="Your name" 
                  required 
                />
              </div>

              <div className="form-group">
                <label>Email</label>
                <input 
                  type="email" 
                  name="email" 
                  value={formData.email} 
                  onChange={handleChange} 
                  placeholder="Email address" 
                  required 
                />
              </div>

              <div className="form-group">
                <label>Subject</label>
                <select name="subject" value={formData.subject} onChange={handleChange}>
                  <option value="General Inquiry">General Inquiry</option>
                  <option value="Technical Issue">Technical Issue</option>
                  <option value="Safety Report">Report a User</option>
                  <option value="Partnership">Partnership</option>
                </select>
              </div>

              <div className="form-group">
                <label>Message</label>
                <textarea 
                  name="message" 
                  value={formData.message} 
                  onChange={handleChange} 
                  placeholder="How can we help?" 
                  rows="5" 
                  required
                ></textarea>
              </div>

              <button type="submit" className="submit-btn">Send Message</button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Contact;