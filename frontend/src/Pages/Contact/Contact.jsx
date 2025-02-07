import React, { useState } from "react";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  // const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);

    // Simulate API request (Replace with actual API call)
    // setTimeout(() => {
    //   setStatus("Message sent successfully! ✅");
    //   setFormData({ name: "", email: "", message: "" }); // Reset form
    // }, 1500);
  };

  return (
    <div className="dark:bg-white bg-gray-900 text-white min-h-screen py-12 px-4 sm:px-6 lg:px-12">
      <div className="max-w-6xl mx-auto">
        {/* Page Title */}
        <h1 className="text-4xl font-bold ubuntu-regular italic text-center text-amber-500 mb-8">
          Contact
        </h1>

        {/* Contact Information and Form */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Contact Information */}
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold ubuntu-regular italic text-amber-500">
              Get in Touch
            </h2>
            <p className="text-gray-400">
              Have questions or need assistance? Reach out to us! We're here to
              help.
            </p>

            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <i className="fas fa-map-marker-alt text-amber-500 text-xl"></i>
                <p className="text-gray-400">
                  123 Health Easy Street, Wellness City, WC 12345
                </p>
              </div>
              <div className="flex items-center space-x-4">
                <i className="fas fa-phone-alt text-amber-500 text-xl"></i>
                <p className="text-gray-400">+1 (123) 456-7890</p>
              </div>
              <div className="flex items-center space-x-4">
                <i className="fas fa-envelope text-amber-500 text-xl"></i>
                <p className="text-gray-400">support@healtheasy.com</p>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex space-x-6">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-amber-500 transition-colors"
              >
                <i className="fab fa-facebook-f text-2xl"></i>
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-amber-500 transition-colors"
              >
                <i className="fab fa-twitter text-2xl"></i>
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-amber-500 transition-colors"
              >
                <i className="fab fa-instagram text-2xl"></i>
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-amber-500 transition-colors"
              >
                <i className="fab fa-linkedin-in text-2xl"></i>
              </a>
            </div>
          </div>

          {/* Contact Form */}
          <div className="dark:bg-white bg-gray-800 p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold ubuntu-regular italic text-amber-500 mb-6">
              Send Us a Message
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-gray-400 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full bg-gray-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  placeholder="Your Name"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-gray-400 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-gray-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  placeholder="Your Email"
                  required
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-gray-400 mb-1">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows="5"
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full bg-gray-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  placeholder="Your Message"
                  required
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-amber-500 text-white py-2 rounded-lg hover:bg-amber-600 transition-colors"
              >
                Send Message
              </button>
            </form>

            {/* Form Status Message */}
            {status && <p className="mt-4 text-green-400">{status}</p>}
          </div>
        </div>

        {/* Embedded Map */}
        <div className="mt-12">
          <h2 className="text-2xl font-semibold ubuntu-regular italic text-amber-500 mb-6">
            Our Location
          </h2>
          <div className="rounded-lg overflow-hidden">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.835434509374!2d144.95373531531615!3d-37.816279742021665!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642af0f11fd81%3A0xf577d2a6c8e2299d!2sMelbourne%20VIC%2C%20Australia!5e0!3m2!1sen!2sus!4v1633023222539!5m2!1sen!2sus"
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              title="Google Map"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
