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
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-2xl font-semibold mb-4">Feedback</h3>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Name"
                className="w-full p-3 border border-gray-600 rounded-lg bg-gray-900 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={feedback.from_name}
                name="from_name"
                onChange={handleInputChange}
                required
              />
              <input
                type="email"
                placeholder="Email"
                className="w-full p-3 border border-gray-600 rounded-lg bg-gray-900 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                name="email_id"
                required
              />
              <textarea
                placeholder="Message"
                className="w-full p-3 border border-gray-600 rounded-lg bg-gray-900 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={feedback.message}
                name="message"
                onChange={handleInputChange}
                required
              />
              <div className="flex items-center justify-between">
                <button
                  className={`px-6 py-2 rounded-lg text-white bg-blue-600 hover:bg-blue-700 transition ease-in-out ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                  type="submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Sending...' : 'Send'}
                </button>
                {stateMessage && (
                  <p className={`mt-2 ${stateMessage.includes('Error') ? 'text-red-400' : 'text-green-400'}`}>
                    {stateMessage}
                  </p>
                )}
              </div>
            </form>
          </div>

          <div>
            <h4 className="text-xl font-semibold mb-2">Made by Yash</h4>
            <h5 className="text-lg mb-4">Let's Connect</h5>
            <div className="flex space-x-4">
              <a
                href="https://github.com/yashpatel08"
                className="text-gray-400 hover:text-white transition ease-in-out"
                aria-label="GitHub"
              >
                <i className="fa-brands fa-github text-2xl"></i>
              </a>
              <a
                href="https://www.linkedin.com/in/patel-yash-ab2740225/"
                className="text-gray-400 hover:text-white transition ease-in-out"
                aria-label="LinkedIn"
              >
                <i className="fa-brands fa-linkedin text-2xl"></i>
              </a>
              <a
                href="https://twitter.com/Yashpatel0808"
                className="text-gray-400 hover:text-white transition ease-in-out"
                aria-label="Twitter"
              >
                <i className="fa-brands fa-twitter text-2xl"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
