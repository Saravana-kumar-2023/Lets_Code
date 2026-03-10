import { Link } from 'react-router-dom';
import { languages } from '../../data/mockData';
import './Home.css';

const Home = () => {
  return (
    <div className="page-enter">
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <div className="hero-text">
              <h1>
                Master Coding with{' '}
                <span className="text-gradient">Lets Code</span>
              </h1>
              <p>
                Your all-in-one platform to learn programming through interactive
                tutorials, structured notes, engaging quizzes, and hands-on coding
                challenges. Start your journey today!
              </p>
              <div className="hero-buttons">
                <Link to="/languages" className="btn btn-primary btn-lg">
                  🚀 Start Learning
                </Link>
                <Link to="/languages" className="btn btn-secondary btn-lg">
                  📚 Explore Languages
                </Link>
              </div>
              <div className="hero-stats">
                <div className="hero-stat">
                  <h3>4+</h3>
                  <p>Languages</p>
                </div>
                <div className="hero-stat">
                  <h3>50+</h3>
                  <p>Topics</p>
                </div>
                <div className="hero-stat">
                  <h3>100+</h3>
                  <p>Challenges</p>
                </div>
              </div>
            </div>
            <div className="hero-visual">
              <div className="hero-code-card">
                <div className="hero-code-header">
                  <span className="hero-code-dot"></span>
                  <span className="hero-code-dot"></span>
                  <span className="hero-code-dot"></span>
                </div>
                <div className="hero-code-body">
                  <div><span className="code-comment">// Welcome to Lets Code! 🚀</span></div>
                  <div><span className="code-keyword">const</span> <span className="code-variable">learner</span> = {'{'}</div>
                  <div>&nbsp;&nbsp;name: <span className="code-string">"You"</span>,</div>
                  <div>&nbsp;&nbsp;skills: [<span className="code-string">"HTML"</span>, <span className="code-string">"CSS"</span>],</div>
                  <div>&nbsp;&nbsp;motivation: <span className="code-string">"∞"</span></div>
                  <div>{'}'};</div>
                  <br />
                  <div><span className="code-keyword">function</span> <span className="code-function">startCoding</span>() {'{'}</div>
                  <div>&nbsp;&nbsp;<span className="code-keyword">return</span> <span className="code-string">"Let's build!"</span>;</div>
                  <div>{'}'}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Languages Section */}
      <section className="languages-section">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Popular Languages</span>
            <h2>Choose Your Learning Path</h2>
            <p>Start with any language and progress at your own pace with structured content and practice</p>
          </div>
          <div className="language-cards-grid">
            {languages.map((lang) => (
              <Link to={`/languages/${lang.slug}`} key={lang.id} className="language-card">
                <div className="language-card-icon" style={{ background: `${lang.color}15` }}>
                  {lang.icon}
                </div>
                <h3>{lang.name}</h3>
                <p>{lang.description}</p>
                <span className={`badge badge-${lang.difficulty.toLowerCase()}`}>
                  {lang.difficulty}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Platform Features</span>
            <h2>Everything You Need to Learn Coding</h2>
            <p>A complete learning ecosystem designed to take you from beginner to confident coder</p>
          </div>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🎬</div>
              <h3>Video Tutorials</h3>
              <p>Learn through curated YouTube video tutorials organized by topic and difficulty level.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📝</div>
              <h3>Structured Notes</h3>
              <p>Topic-wise notes with explanations, syntax examples, key points, and best practices.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">❓</div>
              <h3>Interactive Quizzes</h3>
              <p>Test your understanding with MCQ quizzes that provide instant feedback and explanations.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">💻</div>
              <h3>Coding Challenges</h3>
              <p>Practice with real coding problems, write code, and get instant execution results.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📊</div>
              <h3>Progress Tracking</h3>
              <p>Monitor your learning journey with detailed progress reports and completion tracking.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🗺️</div>
              <h3>Learning Roadmap</h3>
              <p>Follow a structured path from basics to advanced topics for each language.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Section */}
      <section className="why-section">
        <div className="container">
          <div className="why-grid">
            <div>
              <span className="section-label">Why Lets Code?</span>
              <h2>Built for Students, by Developers</h2>
              <p style={{ marginTop: '16px', marginBottom: '32px' }}>
                We've designed every aspect of the platform with student learning in mind.
                Our guided approach ensures you never feel lost.
              </p>
            </div>
            <div className="why-list">
              <div className="why-item">
                <div className="why-item-icon">✨</div>
                <div>
                  <h4>Beginner Friendly</h4>
                  <p>Start from zero with clear explanations and step-by-step guidance.</p>
                </div>
              </div>
              <div className="why-item">
                <div className="why-item-icon">🎯</div>
                <div>
                  <h4>Practice-First Approach</h4>
                  <p>Learn by doing with quizzes and coding challenges for every topic.</p>
                </div>
              </div>
              <div className="why-item">
                <div className="why-item-icon">📈</div>
                <div>
                  <h4>Track Your Growth</h4>
                  <p>See your progress and celebrate achievements along your learning path.</p>
                </div>
              </div>
              <div className="why-item">
                <div className="why-item-icon">🔄</div>
                <div>
                  <h4>Multiple Learning Modes</h4>
                  <p>Learn through videos, notes, or interactive practice — whatever suits you.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <h2>Ready to Start Your Coding Journey?</h2>
          <p>Join thousands of students already learning and growing with Lets Code.</p>
          <Link to="/register" className="btn btn-lg">
            Get Started — It's Free
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
