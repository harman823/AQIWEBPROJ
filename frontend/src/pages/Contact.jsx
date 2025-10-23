// src/pages/Contact.jsx
import { useEffect, useState } from 'react';
import feather from 'feather-icons';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState(''); // To show submission status

  useEffect(() => {
    feather.replace(); // Initialize Feather icons
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  // Handle form submission (basic example)
  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('Sending...');
    // Simulate API call
    console.log('Form data submitted:', formData);
    setTimeout(() => {
      setStatus('Message sent successfully!');
      setFormData({ name: '', email: '', subject: '', message: '' }); // Clear form
       // Clear status message after a few seconds
       setTimeout(() => setStatus(''), 3000);
    }, 1500);
     // In a real app, you would POST this data to your backend or a service like Formspree
  };


  return (
    <>
      {/* Header Section */}
      <section className="py-16 bg-linear-to-r from-emerald-500 to-teal-600 text-white"> {/* Correction: bg-linear-to-r */}
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>
          <p className="text-xl text-emerald-100 max-w-2xl mx-auto">Have questions or feedback? We'd love to hear from you.</p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 grow bg-gray-50"> {/* Correction: grow */}
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto"> {/* Wider container */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">

              {/* Contact Information Column */}
              <div className="space-y-8"> {/* Added spacing between info blocks */}
                <h2 className="text-3xl font-bold text-emerald-800 mb-6">Get in Touch</h2>

                {/* Address Block */}
                <div className="flex items-start space-x-4">
                  <div className="shrink-0 w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center"> {/* Correction: shrink-0 */}
                     <i data-feather="map-pin" className="text-emerald-600 w-6 h-6"></i>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">Our Office</h3>
                    <p className="text-gray-600">123 Green St, Eco City, 98765</p>
                  </div>
                </div>

                 {/* Email Block */}
                <div className="flex items-start space-x-4">
                  <div className="shrink-0 w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center"> {/* Correction: shrink-0 */}
                     <i data-feather="mail" className="text-emerald-600 w-6 h-6"></i>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">Email Us</h3>
                    <a href="mailto:info@aqipredictor.com" className="text-emerald-600 hover:underline">info@aqipredictor.com</a>
                  </div>
                </div>

                {/* Phone Block */}
                 <div className="flex items-start space-x-4">
                  <div className="shrink-0 w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center"> {/* Correction: shrink-0 */}
                     <i data-feather="phone" className="text-emerald-600 w-6 h-6"></i>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">Call Us</h3>
                    <p className="text-gray-600">+1 (555) 123-4567</p>
                  </div>
                </div>
              </div>

              {/* Contact Form Column */}
              <div className="bg-white rounded-2xl shadow-xl p-8">
                <h2 className="text-3xl font-bold text-emerald-800 mb-6">Send us a Message</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name Field */}
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      placeholder="John Doe"
                    />
                  </div>
                  {/* Email Field */}
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                       value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      placeholder="you@example.com"
                    />
                  </div>
                   {/* Subject Field */}
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      placeholder="Question about predictions"
                    />
                  </div>
                  {/* Message Field */}
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Your Message</label>
                    <textarea
                      id="message"
                      name="message"
                      rows="5" // Increased rows
                       value={formData.message}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      placeholder="How can we help you?"
                    ></textarea>
                  </div>
                  {/* Submit Button */}
                  <div className="text-right"> {/* Aligned button right */}
                     <button
                        type="submit"
                        className="inline-flex items-center bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-2.5 px-6 rounded-lg transition duration-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 disabled:opacity-50"
                        disabled={status === 'Sending...'} // Disable button while sending
                    >
                        {status === 'Sending...' ? 'Sending...' : 'Send Message'}
                         {status !== 'Sending...' && <i data-feather="send" className="ml-2 w-4 h-4"></i>}
                     </button>
                  </div>
                   {/* Status Message */}
                  {status && status !== 'Sending...' && (
                    <p className={`text-sm mt-4 ${status.includes('successfully') ? 'text-green-600' : 'text-red-600'}`}>
                      {status}
                    </p>
                  )}
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}