import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const navItems = [
    { title: "Home", path: "/" },
    { title: "Services", path: "/services" },
    { title: "Jobs", path: "/jobs" },
    { title: "Testimonials", path: "/testimonials" },
    { title: "Contact", path: "/contact" },
  ];

  return (
    <nav className="w-full shadow-md bg-white fixed top-0 left-0 z-50">
      <div className="max-w-7xl mx-auto px-5 flex justify-between items-center h-16">

        <Link to="/" className="text-2xl font-bold text-blue-600">
          Ektask
        </Link>

        <ul className="hidden md:flex space-x-6">
          {navItems.map((item) => (
            <li key={item.title}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `font-medium ${
                    isActive ? "text-blue-600" : "text-gray-700 hover:text-blue-600"
                  }`
                }
              >
                {item.title}
              </NavLink>
            </li>
          ))}
        </ul>

        <Link
          to="/apply"
          className="hidden md:block bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Apply Now
        </Link>

        <button
          className="md:hidden text-3xl"
          onClick={() => setOpen(!open)}
        >
          {open ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {open && (
        <ul className="md:hidden bg-white shadow-md px-5 pb-4 space-y-4">
          {navItems.map((item) => (
            <li key={item.title}>
              <NavLink
                to={item.path}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `block py-2 ${
                    isActive
                      ? "text-blue-600 font-semibold"
                      : "text-gray-700 hover:text-blue-600"
                  }`
                }
              >
                {item.title}
              </NavLink>
            </li>
          ))}

          <Link
            to="/apply"
            onClick={() => setOpen(false)}
            className="block bg-blue-600 text-center text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Apply Now
          </Link>
        </ul>
      )}
    </nav>
  );
}
