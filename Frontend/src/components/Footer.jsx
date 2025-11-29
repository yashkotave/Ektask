import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-10 mt-20">
      <div className="max-w-7xl mx-auto px-5 grid grid-cols-1 md:grid-cols-4 gap-10">

        {/* Logo & Tagline */}
        <div>
          <h2 className="text-3xl font-bold">Ektask</h2>
          <p className="text-gray-400 mt-3">
            India’s trusted platform for jobs and professional services.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-gray-300">
            <li><Link to="/" className="hover:text-blue-400">Home</Link></li>
            <li><Link to="/services" className="hover:text-blue-400">Services</Link></li>
            <li><Link to="/jobs" className="hover:text-blue-400">Jobs</Link></li>
            <li><Link to="/apply" className="hover:text-blue-400">Apply Job</Link></li>
          </ul>
        </div>

        {/* More Links */}
        <div>
          <h3 className="text-xl font-semibold mb-3">Company</h3>
          <ul className="space-y-2 text-gray-300">
            <li><Link to="/testimonials" className="hover:text-blue-400">Testimonials</Link></li>
            <li><Link to="/contact" className="hover:text-blue-400">Contact Us</Link></li>
            <li><Link to="/admin" className="hover:text-blue-400">Admin Login</Link></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-xl font-semibold mb-3">Contact</h3>
          <p className="text-gray-400">📍 Indore, MP, India</p>
          <p className="text-gray-400">📞 +91 98765 12345</p>
          <p className="text-gray-400">📧 support@ektask.com</p>
        </div>

      </div>

      <div className="text-center text-gray-500 mt-10 border-t border-gray-700 pt-4">
        © 2025 Ektask — All Rights Reserved.
      </div>
    </footer>
  );
}
