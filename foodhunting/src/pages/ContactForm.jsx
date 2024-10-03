import React, { useState } from 'react';

export default function Contact() {
  // State to hold form data
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    subject: '',
    message: ''
  });

  // Handle change for each input field
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    console.log(formData); // Log the form data to the console
    // You can also add additional logic here, like sending the data to a server
  };

  return (
    <div className="py-2 px-4 mx-auto max-w-screen-md">
      <h2 className="mb-4 text-4xl font-extrabold text-center text-gray-900">
        Contact Us
      </h2>
      <p className="mb-4 font-light text-left text-gray-500 sm:text-xl">
        Got an issue?Let us know.
      </p>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-row">
          <div className="w-1/2 pr-2">
            <label htmlFor="firstName" className="block my-2 text-left text-sm font-medium text-gray-900">
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="shadow-sm bg-orange-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
              placeholder="Enter First Name"
              required
            />
          </div>
          <div className="w-1/2 pl-2">
            <label htmlFor="lastName" className="block my-2 text-left text-sm font-medium text-gray-900">
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="shadow-sm bg-orange-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
              placeholder="Enter Last Name"
            />
          </div>
        </div>
        <div>
          <label htmlFor="email" className="block my-2 text-left text-sm font-medium text-gray-900">
            Your email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="shadow-sm bg-orange-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
            placeholder="abc@geeksforgeeks.org"
            required
          />
        </div>
        <div>
          <label htmlFor="subject" className="block my-2 text-left text-sm font-medium text-gray-900">
            Subject
          </label>
          <input
            type="text"
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            className="block p-3 w-full text-sm text-gray-900 bg-orange-50 rounded-lg border border-gray-300 shadow-sm"
            placeholder="What issue/suggestion do you have?"
            required
          />
        </div>
        <div>
          <label htmlFor="message" className="block my-2 text-left text-sm font-medium text-gray-900">
            Your message
          </label>
          <textarea
            id="message"
            name="message"
            rows="6"
            value={formData.message}
            onChange={handleChange}
            className="block p-2.5 w-full text-sm text-gray-900 bg-orange-50 rounded-lg shadow-sm border  border-gray-300"
            placeholder="Query/Suggestion..."
          />
        </div>
        <button
          type="submit"
          className="mt-2 p-2 float-right text-white rounded-lg border-orange-500 bg-orange-500 hover:bg-green-600 hover:scale-105"
        >
          Send message
        </button>
      </form>
    </div>
  );
}
