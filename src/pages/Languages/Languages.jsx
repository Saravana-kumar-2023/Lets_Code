import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { languageAPI } from '../../services/api';
import './Languages.css';

const Languages = () => {
  const [languages, setLanguages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchLanguages();
  }, []);

  const fetchLanguages = async () => {
    try {
      setLoading(true);
      const response = await languageAPI.getAll();
      setLanguages(response.data);
    } catch (err) {
      setError('Failed to load languages');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const createSlug = (name) => {
    return name.toLowerCase().replace(/\s+/g, '-');
  };

  const getLanguageIcon = (name) => {
    const icons = {
      html: '🌐',
      css: '🎨',
      javascript: '⚡',
      java: '☕',
    };

    return icons[name.toLowerCase()] || '💻';
  };

  const getLanguageColor = (name) => {
    const colors = {
      html: '#e34f26',
      css: '#1572b6',
      javascript: '#f7df1e',
      java: '#f89820',
    };

    return colors[name.toLowerCase()] || '#6c63ff';
  };

  return (
    <div className="languages-page page-enter">
      <div className="container">
        <div className="languages-page-header">
          <span className="section-label">Browse Languages</span>
          <h1>Choose a Language to Learn</h1>
          <p>
            Pick from our collection of programming languages. Each comes with tutorials,
            notes, quizzes, and coding challenges.
          </p>
        </div>

        {loading && <p>Loading languages...</p>}
        {error && <p className="auth-error">{error}</p>}

        {!loading && !error && (
          <div className="languages-grid">
            {languages.map((lang) => {
              const slug = createSlug(lang.name);
              const color = getLanguageColor(lang.name);
              const icon = getLanguageIcon(lang.name);

              return (
                <Link to={`/languages/${slug}`} key={lang.id} className="lang-card" state={{ languageId: lang.id }}>
                  <div className="lang-card-icon" style={{ background: `${color}15` }}>
                    {icon}
                  </div>

                  <div className="lang-card-content">
                    <h2>{lang.name}</h2>

                    <div className="lang-card-meta">
                      <span className={`badge badge-${(lang.difficulty || 'beginner').toLowerCase()}`}>
                        {lang.difficulty || 'Beginner'}
                      </span>
                    </div>

                    <p>{lang.description}</p>

                    <div className="lang-card-stats">
                      <span className="lang-card-stat"><strong>Topics</strong> Available</span>
                      <span className="lang-card-stat"><strong>Notes</strong> Included</span>
                      <span className="lang-card-stat"><strong>Quiz</strong> Practice</span>
                      <span className="lang-card-stat"><strong>Challenges</strong> Ready</span>
                    </div>

                    <span className="btn btn-primary btn-sm">Start Learning →</span>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Languages;