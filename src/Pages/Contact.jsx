
import React, { useState } from "react";

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", form);
    alert("Thanks for contacting us!");
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <section className="bg-white py-16 px-4" id="contact">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-10">Contact Us</h2>
        <form
          onSubmit={handleSubmit}
          className="bg-[#f9f5f2] p-8 rounded-lg shadow-lg grid gap-6"
        >
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={form.name}
            onChange={handleChange}
            required
            className="p-3 rounded border border-gray-300"
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={form.email}
            onChange={handleChange}
            required
            className="p-3 rounded border border-gray-300"
          />
          <textarea
            name="message"
            rows="5"
            placeholder="Your Message"
            value={form.message}
            onChange={handleChange}
            required
            className="p-3 rounded border border-gray-300"
          ></textarea>
          <button
            type="submit"
            className="bg-pink-600 text-white py-3 rounded hover:bg-pink-700 transition duration-300"
          >
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
};

export default Contact;
