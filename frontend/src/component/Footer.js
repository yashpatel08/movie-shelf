import React, { useState } from 'react';
import emailjs from '@emailjs/browser';

const Footer = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [stateMessage, setStateMessage] = useState(null);
  const [feedback, setFeedback] = useState({
    message: '',
    from_name: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFeedback((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    console.log('Sending email...');
    emailjs
      .sendForm('service_xitsyxk', 'template_kz4u1qb', e.target, 'SsPDxBPGWiWRatgMj')
      .then(
        (result) => {
          console.log(result.text);
          setStateMessage('Message sent!');
          setIsSubmitting(false);
          setTimeout(() => {
            setStateMessage(null);
          }, 5000);
        },
        (error) => {
          console.log(error.text);
          setStateMessage('Something went wrong, please try again later');
          setIsSubmitting(false);
          setTimeout(() => {
            setStateMessage(null);
          }, 5000);
        }
      );
    e.target.reset();
    setFeedback({
      message: '',
      from_name: '',
    });
  };

  return (
    <div className='main-foot'>
      <div className="foot1">
        <h3>Feedback</h3>
        <form className='foot-form' onSubmit={handleSubmit}>
          <input
            type='text'
            placeholder='Name'
            className='foot-input'
            value={feedback.from_name}
            name="from_name"
            onChange={handleInputChange}
            required
          />
          <input
            type='email'
            placeholder='Email'
            className='foot-input'
            name="email_id"
            required
          />
          <textarea
            placeholder='Message'
            className='foot-texta'
            value={feedback.message}
            name="message"
            onChange={handleInputChange}
            required
          />
          <div className="center">
            <button className='foot-send' type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Sending...' : 'Send'}
            </button>
            {stateMessage && <p>{stateMessage}</p>}
          </div>
        </form>
      </div>

      <div className="foot2">
        <h4>Made by Yash</h4>
        <h5>Let's Connect</h5>
        <div className="foot-icon">
          <a href="https://github.com/yashpatel08">
            <i className="fa-brands fa-github"></i>
          </a>
          <a href="https://www.linkedin.com/in/patel-yash-ab2740225/">
            <i className="fa-brands fa-linkedin"></i>
          </a>
          <a href="https://twitter.com/Yashpatel0808">
            <i className="fa-brands fa-x-twitter"></i>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
