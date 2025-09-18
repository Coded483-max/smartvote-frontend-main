import { React, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/navbar.css";
import { Button } from "@/components/ui/button";

import { NavLink, useNavigate } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
import Logo from "./Logo";
import { Vote } from "lucide-react";

const Navbar = () => {
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      {/* <header className="navbar-header bg-blue-900">
        <div className="nav-logo">
          <img src={logo} alt="logo" />
        </div>
        <div className="hamburger-menu" onClick={toggleMenu}>
          {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </div>
        <nav className={`topnav ${isOpen ? "open" : ""}`} onClick={toggleMenu}>
          <ul className="navlinks">
            <li>
              <NavLink to="/home">Home</NavLink>
            </li>
            <li>
              <NavLink to="/about">About Us</NavLink>
            </li>
            <li>
              <NavLink to="/contact">Contact Us</NavLink>
            </li>
            <li>
              <NavLink to="/faqs">FAQs</NavLink>
            </li>
          </ul>
        </nav>
        <div className="navbar-buttons">
          <Button className="login-button" onClick={() => navigate("/login")}>
            Login
          </Button>
          <Button
            className="register-button"
            onClick={() => navigate("/register")}
          >
            Register
          </Button>
        </div>
      </header> */}

      <nav className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Logo />
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <div className="hamburger-menu" onClick={toggleMenu}>
                {isOpen ? (
                  <FiX size={24} color="blue" />
                ) : (
                  <FiMenu size={24} color="blue" />
                )}
              </div>
              <nav
                className={`topnav ${isOpen ? "open" : ""}`}
                onClick={toggleMenu}
              >
                <ul className="navlinks">
                  <li>
                    <NavLink
                      className="text-gray-600 font-bold hover:text-gray-900 transition-colors"
                      to="/"
                    >
                      Home
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      className="text-gray-600 font-bold hover:text-gray-900 transition-colors"
                      to="/candidate-registration"
                    >
                      Elections
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      className="text-gray-600 font-bold hover:text-gray-900 transition-colors"
                      to="/about"
                    >
                      About Us
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      className="text-gray-600 font-bold hover:text-gray-900 transition-colors"
                      to="/contact"
                    >
                      Contact Us
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      className="text-gray-600 font-bold hover:text-gray-900 transition-colors"
                      to="/faqs"
                    >
                      FAQs
                    </NavLink>
                  </li>
                </ul>
              </nav>

              <Link to="/login">
                <Button variant="outline" size="sm">
                  Sign In
                </Button>
              </Link>
              <Link to="/register">
                <Button size="sm">Get Started</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
