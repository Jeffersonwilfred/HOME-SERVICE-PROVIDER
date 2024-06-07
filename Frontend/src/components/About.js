import React from 'react';
import './styles/About.css'; // Import the CSS file for styling
import Header from './Header';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone } from '@fortawesome/free-solid-svg-icons';
import { faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons';

const About = () => {
  const backgroundStyles = {
    backgroundImage: 'url("./assets/bg3.jpg")',
    backgroundSize: 'cover',
    backgroundPosition: 'top',
    backgroundRepeat: 'no-repeat',
    minHeight: 'calc(97.5vh - 64px)', // Adjusted height to remove header height
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
  };

  return (
    <div><Header/>
    <div style={backgroundStyles} className="background-styles">
      <div className="about-content">
        <h2 style={{ textTransform: 'uppercase' }}>About Us</h2>
        <p style={{ color: 'white' }}>
          HomeService provides Electrical, Plumbing, Pest Control, Carpenter, Heating, Cooling Services.<br/>
          HomeService is a platform in India where you can find and get services according to your requirement at your place.<br/>
          We assure better customer experience and services for all your needs.
        </p>
        <p style={{ color: 'white' }}>
          We are available 7 days a week and offer 10 hours of service from 10:00 am to 8:00 pm.
        </p>
      </div>
      <div className="footer">
        <div className="contact">
          <FontAwesomeIcon icon={faPhone} />
          <p style={{ color: 'white' }}>Phone Number</p>
        </div>
        <div className="follow">
          <FontAwesomeIcon icon={faInstagram} />
          <p style={{ color: 'white' }}>Instagram</p>
        </div>
        <div className="follow">
          <FontAwesomeIcon icon={faTwitter} />
          <p style={{ color: 'white' }}>Twitter</p>
        </div>
      </div>
    </div>
    </div>
  );
}

export default About;
