// src/pages/Contact.jsx
import { useEffect } from 'react';
import feather from 'feather-icons';

export default function Contact() {
  useEffect(() => {
    feather.replace();
  }, []);

  return (
    <>
      {/* Header Section */}
      <section className="py-16 bg-gradient-to-r from-emerald-500 to-teal-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>
          <p className="text-xl text-emerald-100 max-w-2xl mx-auto">Have questions? We'd love to hear from you.</p>
        </div>
      </section>
      
      {/* Contact Section */}
      <section className="py-16 flex-grow">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              
              {/* Contact Information */}
              <div>
                <h2 className="text-2xl font-bold text-emerald-800 mb-6">Get in Touch</h2>
                {/* ... (All the contact info divs) ... */}
              </div>
              
              {/* Contact Form */}
              <div className="bg-white rounded-2xl shadow-xl p-8">
                <h2 className="text-2xl font-bold text-emerald-800 mb-6">Send us a Message</h2>
                <form>
                  {/* ... (All the form fields) ... */}
                  <button type="submit" className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-3 px-6 rounded-lg transition duration-300">
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}