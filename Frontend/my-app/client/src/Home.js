import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Import the Link component
import './style.css';
import logo from './LOGO.jpeg';

const Home = () => {
  const [isNavBarActive, setIsNavBarActive] = useState(false);

  const handleHamMenuClick = () => {
    setIsNavBarActive(!isNavBarActive);
  };

  const handleNavLinkClick = () => {
    setIsNavBarActive(false);
  };

  const handleFileUpload = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      console.log('Selected file:', selectedFile);
    }
  };

  return (
    <div className="banner">
      <div className="navbar">
        <img src={logo} className="logo" alt="Logo" />
        <i
          className={isNavBarActive ? 'fas fa-times' : 'fas fa-bars'}
          id="ham-menu"
          
        ></i>
        <ul id="nav-bar" className={isNavBarActive ? 'active' : ''}>
        <li>
          <Link to="/">Home</Link> {/* Use Link component for internal navigation */}
      </li>
      <li>
          <Link to="/help">Help</Link> {/* Use Link component for internal navigation */}
      </li>
      <li>
          <Link to="/contact">Contact</Link> {/* Assuming you have a Contact page */}
      </li>
        </ul>
      </div>
      <div className="content">
        <h1>Resume Screener</h1>
        <p>Elevate your recruitment strategy by identifying the perfect fit and propel your team toward success</p>
        <div>
        <Link to="/upload"> {/* Use Link to navigate to Upload component */}
            <button type="button" id="navigateButton">
              <span>Get Started</span>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;





