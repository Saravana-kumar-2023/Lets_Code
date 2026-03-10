import { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { challengeAPI } from '../../services/api';
import './Challenges.css';

const Challenges = () => {
  const [searchParams] = useSearchParams();
  const topicId = searchParams.get('topicId');
  const language = searchParams.get('language') || 'code';

  const [challenges, setChallenges] = useState([]);
  const [selectedChallenge, setSelectedChallenge] = useState(null);
  const [code, setCode] = useState('');
  const [output, setOutput] = useState(null);
  const [isRunning, setIsRunning] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (topicId) {
      fetchChallenges(topicId);
    }
  }, [topicId]);

  const fetchChallenges = async (id) => {
    try {
      setLoading(true);
      setError('');
      const response = await challengeAPI.getByTopic(id);
      setChallenges(response.data || []);
    } catch (err) {
      console.error(err);
      setError('Failed to load coding challenges');
    } finally {
      setLoading(false);
    }
  };

  const handleSelectChallenge = (challenge) => {
    setSelectedChallenge(challenge);
    setCode(challenge.starterCode || '');
    setOutput(null);
  };

  const handleRunCode = async () => {
    setIsRunning(true);
    setOutput(null);

    setTimeout(() => {
      setOutput({
        status: 'success',
        text: `// Code execution preview\n// Judge0 integration can be added next\n\n> Program finished successfully`,
      });
      setIsRunning(false);
    }, 1200);
  };

  const handleSubmitCode = async () => {
    if (!selectedChallenge) return;

    try {
      setIsRunning(true);
      setOutput(null);

      const response = await challengeAPI.submit({
        challengeId: selectedChallenge.id,
        code,
        languageUsed: language,
      });

      const saved = response.data;

      setOutput({
        status: saved.verdict === 'Accepted' ? 'success' : 'error',
        text: `Challenge: ${selectedChallenge.title}\nStatus: ${saved.verdict}\n\nOutput:\n${saved.output || 'No output'}`,
      });
    } catch (err) {
      console.error(err);
      setOutput({
        status: 'error',
        text: '❌ Failed to submit challenge. Please try again.',
      });
    } finally {
      setIsRunning(false);
    }
  };

  const handleBack = () => {
    setSelectedChallenge(null);
    setOutput(null);
    setCode('');
  };

  if (!topicId) {
    return (
      <div className="challenges-page page-enter">
        <div className="container">
          <div className="empty-state" style={{ padding: '80px 0' }}>
            <h2>No challenge topic selected</h2>
            <p style={{ margin: '12px 0 24px' }}>
              Please choose a language and topic first to start solving challenges.
            </p>
            <Link to="/languages" className="btn btn-primary">
              Browse Languages →
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="challenges-page page-enter">
        <div className="container">
          <div className="empty-state" style={{ padding: '80px 0' }}>
            <h2>Loading challenges...</h2>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="challenges-page page-enter">
        <div className="container">
          <div className="empty-state" style={{ padding: '80px 0' }}>
            <h2>{error}</h2>
          </div>
        </div>
      </div>
    );
  }

  if (selectedChallenge) {
    return (
      <div className="challenges-page page-enter">
        <div className="container">
          <button className="btn btn-outline btn-sm challenge-back-btn" onClick={handleBack}>
            ← Back to Challenges
          </button>

          <div className="challenge-detail">
            <div className="challenge-problem">
              <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '16px' }}>
                <h2>{selectedChallenge.title}</h2>
                <span
                  className={`badge badge-${
                    selectedChallenge.difficulty === 'Easy'
                      ? 'beginner'
                      : selectedChallenge.difficulty === 'Medium'
                      ? 'intermediate'
                      : 'advanced'
                  }`}
                >
                  {selectedChallenge.difficulty || 'Easy'}
                </span>
              </div>

              <div className="challenge-problem-section">
                <h4>📋 Problem Statement</h4>
                <p>{selectedChallenge.problemStatement}</p>
              </div>

              {selectedChallenge.sampleInput && (
                <div className="challenge-problem-section">
                  <h4>📥 Sample Input</h4>
                  <div className="code-block">
                    <pre>{selectedChallenge.sampleInput}</pre>
                  </div>
                </div>
              )}

              {selectedChallenge.sampleOutput && (
                <div className="challenge-problem-section">
                  <h4>📤 Expected Output</h4>
                  <div className="code-block">
                    <pre>{selectedChallenge.sampleOutput}</pre>
                  </div>
                </div>
              )}
            </div>

            <div className="challenge-editor-panel">
              <div className="challenge-editor-header">
                <span style={{ fontWeight: 600, fontSize: '0.9rem' }}>Code Editor</span>
                <span className="badge badge-primary">{language.toUpperCase()}</span>
              </div>

              <div className="challenge-editor">
                <textarea
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  spellCheck={false}
                  placeholder="Write your code here..."
                />
              </div>

              <div className="challenge-actions">
                <button
                  className="btn btn-secondary"
                  onClick={handleRunCode}
                  disabled={isRunning}
                >
                  {isRunning ? '⏳ Running...' : '▶ Run Code'}
                </button>

                <button
                  className="btn btn-primary"
                  onClick={handleSubmitCode}
                  disabled={isRunning || !code.trim()}
                >
                  {isRunning ? '⏳ Submitting...' : '🚀 Submit'}
                </button>
              </div>

              {output && (
                <div className={`challenge-output ${output.status}`}>
                  <h4>📤 Output</h4>
                  <pre>{output.text}</pre>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="challenges-page page-enter">
      <div className="container">
        <div className="challenges-page-header">
          <span className="section-label">Practice Coding</span>
          <h1>Coding Challenges</h1>
          <p>Sharpen your skills with hands-on coding problems</p>
        </div>

        <div className="challenges-grid">
          {challenges.map((challenge) => (
            <div
              key={challenge.id}
              className="challenge-card"
              onClick={() => handleSelectChallenge(challenge)}
            >
              <div className="challenge-card-header">
                <h3>{challenge.title}</h3>
                <span
                  className={`badge badge-${
                    challenge.difficulty === 'Easy'
                      ? 'beginner'
                      : challenge.difficulty === 'Medium'
                      ? 'intermediate'
                      : 'advanced'
                  }`}
                >
                  {challenge.difficulty || 'Easy'}
                </span>
              </div>

              <p>{challenge.problemStatement?.slice(0, 120)}...</p>

              <div className="challenge-card-footer">
                <span className="badge badge-primary">{language.toUpperCase()}</span>
                <button className="btn btn-primary btn-sm">Solve →</button>
              </div>
            </div>
          ))}
        </div>

        {challenges.length === 0 && (
          <div className="empty-state">
            <p>No challenges available for this topic.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Challenges;