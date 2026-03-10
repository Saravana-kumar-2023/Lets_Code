import { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const { user, logout, isAdmin } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [isMobileOpen]);

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsMobileOpen(false);
  };

  const closeMobile = () => setIsMobileOpen(false);

  const displayName = user?.fullName || user?.name || 'User';
  const avatarLetter = displayName.charAt(0).toUpperCase();

  return (
    <>
      <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
        <div className="navbar-inner">
          <Link to="/" className="navbar-logo">
            <span className="logo-icon">&lt;/&gt;</span>
            Lets Code
          </Link>

          <div className="navbar-links">
            <NavLink to="/" end>Home</NavLink>
            <NavLink to="/languages">Languages</NavLink>
            <NavLink to="/quiz">Quiz</NavLink>
            <NavLink to="/challenges">Challenges</NavLink>
            {user && <NavLink to="/dashboard">Dashboard</NavLink>}
            {user && isAdmin() && <NavLink to="/admin">Admin</NavLink>}
          </div>

          <div className="navbar-actions">
            {user ? (
              <>
                <div className="navbar-user">
                  <span className="user-avatar">{avatarLetter}</span>
                  <span>{displayName}</span>
                </div>

                <button className="btn btn-outline btn-sm" onClick={handleLogout}>
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="btn btn-outline btn-sm">Login</Link>
                <Link to="/register" className="btn btn-primary btn-sm">Sign Up</Link>
              </>
            )}

            <div
              className={`hamburger ${isMobileOpen ? 'open' : ''}`}
              onClick={() => setIsMobileOpen(!isMobileOpen)}
            >
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        </div>
      </nav>

      <div className={`mobile-nav ${isMobileOpen ? 'open' : ''}`}>
        <NavLink to="/" end onClick={closeMobile}>🏠 Home</NavLink>
        <NavLink to="/languages" onClick={closeMobile}>📚 Languages</NavLink>
        <NavLink to="/quiz" onClick={closeMobile}>❓ Quiz</NavLink>
        <NavLink to="/challenges" onClick={closeMobile}>💻 Challenges</NavLink>
        {user && <NavLink to="/dashboard" onClick={closeMobile}>📊 Dashboard</NavLink>}
        {user && isAdmin() && <NavLink to="/admin" onClick={closeMobile}>⚙️ Admin</NavLink>}

        <div className="mobile-nav-actions">
          {user ? (
            <button className="btn btn-outline" onClick={handleLogout}>Logout</button>
          ) : (
            <>
              <Link to="/login" className="btn btn-outline" onClick={closeMobile}>Login</Link>
              <Link to="/register" className="btn btn-primary" onClick={closeMobile}>Sign Up</Link>
            </>
          )}
        </div>
      </div>

      <div style={{ height: 'var(--navbar-height)' }}></div>
    </>
  );
};

export default Navbar;