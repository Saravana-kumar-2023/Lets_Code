import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <div className="footer-logo">
              <span className="logo-icon">&lt;/&gt;</span>
              Lets Code
            </div>
            <p>
              A modern learning platform designed to help students master programming
              through interactive tutorials, guided notes, quizzes, and hands-on coding challenges.
            </p>
          </div>

          <div className="footer-section">
            <h4>Languages</h4>
            <Link to="/languages/html">HTML</Link>
            <Link to="/languages/css">CSS</Link>
            <Link to="/languages/javascript">JavaScript</Link>
            <Link to="/languages/java">Java</Link>
          </div>

          <div className="footer-section">
            <h4>Resources</h4>
            <Link to="/quiz">Quizzes</Link>
            <Link to="/challenges">Challenges</Link>
            <Link to="/languages">Tutorials</Link>
            <Link to="/dashboard">Dashboard</Link>
          </div>

          <div className="footer-section">
            <h4>Platform</h4>
            <Link to="/login">Login</Link>
            <Link to="/register">Sign Up</Link>
            <Link to="/">About Us</Link>
            <Link to="/">Contact</Link>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© 2026 Lets Code. Built for learning, designed with Lots of ☕</p>
          <div className="footer-social">
            <a href="#" aria-label="GitHub">GH</a>
            <a href="#" aria-label="Twitter">TW</a>
            <a href="#" aria-label="LinkedIn">LN</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
