import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './Dashboard.css';

const Dashboard = () => {
  const { user, token } = useAuth();

  const authToken = token || localStorage.getItem('token');

  const [d, setD] = useState({
    startedLanguages: 0,
    totalLanguages: 4,
    completedTopics: 0,
    totalTopics: 0,
    watchedVideos: 0,
    totalVideos: 0,
    averageScore: 0,
    quizzesAttempted: 0,
    challengeSubmissions: 0,
    successfulSubmissions: 0,
    languageProgress: [
      { name: 'HTML', progress: 0 },
      { name: 'CSS', progress: 0 },
      { name: 'JavaScript', progress: 0 },
      { name: 'Java', progress: 0 }
    ],
    recentActivity: []
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        setLoading(true);
        setError('');

        console.log('Dashboard fetch started');
        console.log('User:', user);
        console.log('Token exists:', !!authToken);

        const response = await fetch('http://localhost:8080/api/dashboard', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authToken}`
          }
        });

        console.log('Dashboard response status:', response.status);

        if (!response.ok) {
          throw new Error('Failed to fetch dashboard data');
        }

        const data = await response.json();
        console.log('Dashboard response data:', data);

        setD({
          startedLanguages: data.startedLanguages ?? 0,
          totalLanguages: data.totalLanguages ?? 4,
          completedTopics: data.completedTopics ?? 0,
          totalTopics: data.totalTopics ?? 0,
          watchedVideos: data.watchedVideos ?? 0,
          totalVideos: data.totalVideos ?? 0,
          averageScore: data.averageScore ?? 0,
          quizzesAttempted: data.quizzesAttempted ?? 0,
          challengeSubmissions: data.challengeSubmissions ?? 0,
          successfulSubmissions: data.successfulSubmissions ?? 0,
          languageProgress: data.languageProgress?.length
            ? data.languageProgress
            : [
                { name: 'HTML', progress: 0 },
                { name: 'CSS', progress: 0 },
                { name: 'JavaScript', progress: 0 },
                { name: 'Java', progress: 0 }
              ],
          recentActivity: data.recentActivity ?? []
        });
      } catch (err) {
        console.error('Dashboard fetch error:', err);
        setError(err.message || 'Something went wrong while fetching dashboard data');
      } finally {
        setLoading(false);
      }
    };

    if (user && authToken) {
      fetchDashboard();
    } else {
      console.log('Dashboard fetch skipped. user/token missing');
      setLoading(false);
    }
  }, [user, authToken]);

  if (!user) return <Navigate to="/login" />;

  const displayName = user?.fullName || user?.name || 'User';
  const userRole = user?.role === 'ROLE_ADMIN' ? 'Administrator' : 'Student';
  const avatarLetter = displayName.charAt(0).toUpperCase();

  const getActivityIcon = (type) => {
    switch (type) {
      case 'quiz':
        return '❓';
      case 'video':
        return '🎬';
      case 'challenge':
        return '💻';
      case 'note':
        return '📝';
      default:
        return '📌';
    }
  };

  if (loading) {
    return (
      <div className="dashboard-page page-enter">
        <div className="container">
          <p>Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="dashboard-page page-enter">
        <div className="container">
          <p style={{ color: 'red' }}>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-page page-enter">
      <div className="container">
        <div className="dashboard-header">
          <div className="dashboard-avatar">{avatarLetter}</div>
          <div className="dashboard-user-info">
            <h1>Welcome back, {displayName}! 👋</h1>
            <p>{user.email} · {userRole}</p>
          </div>
        </div>

        <div className="dashboard-stats">
          <div className="dashboard-stat-card">
            <div className="dashboard-stat-icon">📚</div>
            <h3>{d.startedLanguages}/{d.totalLanguages}</h3>
            <p>Languages Started</p>
          </div>

          <div className="dashboard-stat-card">
            <div className="dashboard-stat-icon">✅</div>
            <h3>{d.completedTopics}/{d.totalTopics}</h3>
            <p>Topics Completed</p>
          </div>

          <div className="dashboard-stat-card">
            <div className="dashboard-stat-icon">🎬</div>
            <h3>{d.watchedVideos}/{d.totalVideos}</h3>
            <p>Videos Watched</p>
          </div>

          <div className="dashboard-stat-card">
            <div className="dashboard-stat-icon">🏆</div>
            <h3>{d.averageScore}%</h3>
            <p>Average Quiz Score</p>
          </div>
        </div>

        <div className="dashboard-grid">
          <div>
            <div className="dashboard-section">
              <h3>📊 Language Progress</h3>
              {d.languageProgress.map((lang, i) => (
                <div key={i} className="lang-progress-item">
                  <span className="lang-progress-name">{lang.name}</span>
                  <div className="progress-bar">
                    <div
                      className="progress-bar-fill"
                      style={{ width: `${lang.progress}%` }}
                    ></div>
                  </div>
                  <span className="lang-progress-percent">{lang.progress}%</span>
                </div>
              ))}
            </div>

            <div className="dashboard-section">
              <h3>📈 Performance Summary</h3>
              <div className="performance-grid">
                <div className="performance-item">
                  <h4>{d.quizzesAttempted}</h4>
                  <p>Quizzes Attempted</p>
                </div>
                <div className="performance-item">
                  <h4>{d.averageScore}%</h4>
                  <p>Average Score</p>
                </div>
                <div className="performance-item">
                  <h4>{d.challengeSubmissions}</h4>
                  <p>Challenges Attempted</p>
                </div>
                <div className="performance-item">
                  <h4>{d.successfulSubmissions}</h4>
                  <p>Successful Submissions</p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="dashboard-section">
              <h3>🕐 Recent Activity</h3>
              <div className="activity-list">
                {d.recentActivity.length > 0 ? (
                  d.recentActivity.map((activity, i) => (
                    <div key={i} className="activity-item">
                      <div className="activity-icon">{getActivityIcon(activity.type)}</div>
                      <div className="activity-content">
                        <h4>{activity.title}</h4>
                        <p>
                          {activity.score != null ? `Score: ${activity.score}%` : ''}
                          {activity.score != null && activity.status ? ' | ' : ''}
                          {activity.status ? `Status: ${activity.status}` : ''}
                          {activity.score == null && !activity.status ? 'Completed' : ''}
                        </p>
                      </div>
                      <span className="activity-meta">{activity.date}</span>
                    </div>
                  ))
                ) : (
                  <p>No recent activity yet.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;