import { useEffect, useMemo, useState } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import { languageAPI, topicAPI, progressAPI } from '../../services/api';
import './LanguageDetail.css';

const LanguageDetail = () => {
  const { slug } = useParams();
  const location = useLocation();

  const [activeTab, setActiveTab] = useState('roadmap');
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState(null);

  const [language, setLanguage] = useState(null);
  const [topics, setTopics] = useState([]);
  const [topicDetails, setTopicDetails] = useState({
    notes: [],
    videos: [],
    quizQuestions: [],
    challenges: [],
  });

  const [userProgress, setUserProgress] = useState([]);
  const [videoUpdating, setVideoUpdating] = useState(false);
  const [notesUpdating, setNotesUpdating] = useState(false);

  const [loading, setLoading] = useState(true);
  const [detailsLoading, setDetailsLoading] = useState(false);
  const [error, setError] = useState('');

  const languageIdFromState = location.state?.languageId;

  const createSlug = (name) => {
    return name?.toLowerCase().replace(/\s+/g, '-');
  };

  const getLanguageIcon = (name) => {
    const icons = {
      html: '🌐',
      css: '🎨',
      javascript: '⚡',
      java: '☕',
    };
    return icons[name?.toLowerCase()] || '💻';
  };

  const getLanguageColor = (name) => {
    const colors = {
      html: '#e34f26',
      css: '#1572b6',
      javascript: '#f7df1e',
      java: '#f89820',
    };
    return colors[name?.toLowerCase()] || '#6c63ff';
  };

  useEffect(() => {
    fetchLanguageAndTopics();
    fetchMyProgress();
  }, [slug]);

  useEffect(() => {
    if (selectedTopic) {
      fetchTopicDetails(selectedTopic);
    }
  }, [selectedTopic]);

  const fetchLanguageAndTopics = async () => {
    try {
      setLoading(true);
      setError('');

      const langResponse = await languageAPI.getAll();
      const allLanguages = langResponse.data || [];

      const matchedLanguage =
        allLanguages.find(
          (lang) =>
            createSlug(lang.name) === slug ||
            Number(lang.id) === Number(languageIdFromState)
        ) || null;

      if (!matchedLanguage) {
        setError('Language not found');
        return;
      }

      setLanguage(matchedLanguage);

      const topicResponse = await topicAPI.getByLanguage(matchedLanguage.id);
      const topicList = topicResponse.data || [];
      setTopics(topicList);

      if (topicList.length > 0) {
        setSelectedTopic(topicList[0].id);
      }
    } catch (err) {
      console.error('Failed to load language details:', err);
      setError('Failed to load language details');
    } finally {
      setLoading(false);
    }
  };

  const fetchTopicDetails = async (topicId) => {
    try {
      setDetailsLoading(true);

      const response = await topicAPI.getDetails(topicId);
      const data = response.data || {
        notes: [],
        videos: [],
        quizQuestions: [],
        challenges: [],
      };

      console.log('Topic details response:', data);

      setTopicDetails({
        notes: data.notes || [],
        videos: data.videos || [],
        quizQuestions: data.quizQuestions || [],
        challenges: data.challenges || [],
      });

      setSelectedVideo(null);
    } catch (err) {
      console.error('Failed to load topic details:', err);
      setTopicDetails({
        notes: [],
        videos: [],
        quizQuestions: [],
        challenges: [],
      });
    } finally {
      setDetailsLoading(false);
    }
  };

  const fetchMyProgress = async () => {
    try {
      const response = await progressAPI.getMyProgress();
      console.log('Progress response:', response.data);
      setUserProgress(response.data || []);
    } catch (err) {
      console.error('Failed to load progress', err);
      setUserProgress([]);
    }
  };

  const handleVideoComplete = async () => {
    if (!selectedTopic) return;

    try {
      setVideoUpdating(true);
      await progressAPI.markVideoCompleted(selectedTopic);
      await fetchMyProgress();
      alert('Video marked as completed');
    } catch (err) {
      console.error('Failed to mark video completed', err);
      alert('Failed to update video progress');
    } finally {
      setVideoUpdating(false);
    }
  };

  const handleNotesComplete = async () => {
    if (!selectedTopic) return;

    try {
      setNotesUpdating(true);
      await progressAPI.markNotesCompleted(selectedTopic);
      await fetchMyProgress();
      alert('Notes marked as completed');
    } catch (err) {
      console.error('Failed to mark notes completed', err);
      alert('Failed to update notes progress');
    } finally {
      setNotesUpdating(false);
    }
  };

  const currentNote = useMemo(() => {
    return topicDetails.notes && topicDetails.notes.length > 0
      ? topicDetails.notes[0]
      : null;
  }, [topicDetails]);

  const currentVideo = useMemo(() => {
    if (selectedVideo) return selectedVideo;
    return topicDetails.videos && topicDetails.videos.length > 0
      ? topicDetails.videos[0]
      : null;
  }, [selectedVideo, topicDetails]);

  const currentTopicProgress = useMemo(() => {
    return (
      userProgress.find(
        (p) =>
          Number(p.topicId) === Number(selectedTopic) ||
          Number(p.topic?.id) === Number(selectedTopic)
      ) || null
    );
  }, [userProgress, selectedTopic]);

  const isVideoCompleted = currentTopicProgress?.videoCompleted || false;
  const isNotesCompleted = currentTopicProgress?.notesCompleted || false;
  const isTopicCompleted = currentTopicProgress?.topicCompleted || false;

  const progress = topics.length > 0 ? Math.round((1 / topics.length) * 100) : 0;

  if (loading) {
    return (
      <div className="container" style={{ padding: '80px 0', textAlign: 'center' }}>
        <h2>Loading language...</h2>
      </div>
    );
  }

  if (error || !language) {
    return (
      <div className="container" style={{ padding: '80px 0', textAlign: 'center' }}>
        <h2>{error || 'Language not found'}</h2>
        <Link to="/languages" className="btn btn-primary" style={{ marginTop: '20px' }}>
          Back to Languages
        </Link>
      </div>
    );
  }

  const color = getLanguageColor(language.name);
  const icon = getLanguageIcon(language.name);

  return (
    <div className="lang-detail-page page-enter">
      <div className="container">
        <div className="lang-detail-header" style={{ background: `${color}10` }}>
          <div className="lang-detail-header-inner">
            <div className="lang-detail-icon" style={{ background: `${color}20` }}>
              {icon}
            </div>
            <div className="lang-detail-info">
              <h1>{language.name}</h1>
              <p>{language.description}</p>
              <div className="lang-detail-progress">
                <div className="progress-bar">
                  <div className="progress-bar-fill" style={{ width: `${progress}%` }}></div>
                </div>
                <span>{topics.length} topics available</span>
              </div>

              {selectedTopic && (
                <div style={{ marginTop: '12px' }}>
                  <span className={`badge ${isTopicCompleted ? 'badge-success' : 'badge-beginner'}`}>
                    {isTopicCompleted ? 'Topic Completed ✅' : 'Topic In Progress'}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="lang-tabs">
          {['roadmap', 'notes', 'videos', 'quiz', 'challenges'].map((tab) => (
            <button
              key={tab}
              className={`lang-tab ${activeTab === tab ? 'active' : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab === 'roadmap' && '🗺️ '}
              {tab === 'notes' && '📝 '}
              {tab === 'videos' && '🎬 '}
              {tab === 'quiz' && '❓ '}
              {tab === 'challenges' && '💻 '}
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {activeTab === 'roadmap' && (
          <div className="topics-list">
            {topics.length > 0 ? (
              topics.map((topic, index) => {
                const topicProgress =
                  userProgress.find(
                    (p) =>
                      Number(p.topicId) === Number(topic.id) ||
                      Number(p.topic?.id) === Number(topic.id)
                  ) || null;

                return (
                  <div
                    key={topic.id}
                    className="topic-item"
                    onClick={() => {
                      setSelectedTopic(topic.id);
                      setActiveTab('notes');
                    }}
                  >
                    <div className="topic-number">
                      {topic.topicOrder || index + 1}
                    </div>
                    <div className="topic-content">
                      <h4>{topic.title}</h4>
                      <span className={`badge ${topicProgress?.topicCompleted ? 'badge-success' : 'badge-beginner'}`}>
                        {topicProgress?.topicCompleted ? 'Completed' : 'Topic'}
                      </span>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="empty-state">
                <p>No topics available yet.</p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'notes' && (
          <div>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '24px' }}>
              {topics.map((topic) => (
                <button
                  key={topic.id}
                  className={`btn btn-sm ${selectedTopic === topic.id ? 'btn-primary' : 'btn-outline'}`}
                  onClick={() => setSelectedTopic(topic.id)}
                >
                  {topic.title}
                </button>
              ))}
            </div>

            {detailsLoading ? (
              <div className="empty-state">
                <p>Loading notes...</p>
              </div>
            ) : currentNote ? (
              <div className="notes-container">
                <h2>📝 {currentNote.title}</h2>

                <div className="note-section">
                  <h3>📖 Content</h3>
                  <p style={{ whiteSpace: 'pre-line' }}>{currentNote.content}</p>
                </div>

                <div style={{ marginTop: '24px', display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                  <button
                    className="btn btn-primary"
                    onClick={handleNotesComplete}
                    disabled={isNotesCompleted || notesUpdating}
                  >
                    {notesUpdating
                      ? 'Updating...'
                      : isNotesCompleted
                      ? 'Notes Completed ✅'
                      : 'Mark Notes as Completed'}
                  </button>
                </div>
              </div>
            ) : (
              <div className="empty-state">
                <p>No notes available for this topic.</p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'videos' && (
          <div className="videos-container">
            <div className="video-player">
              {currentVideo ? (
                <>
                  <iframe
                    src={currentVideo.embedUrl}
                    title={currentVideo.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                  <div className="video-player-info">
                    <h3>{currentVideo.title}</h3>

                    <div style={{ marginTop: '16px' }}>
                      <button
                        className="btn btn-primary"
                        onClick={handleVideoComplete}
                        disabled={isVideoCompleted || videoUpdating}
                      >
                        {videoUpdating
                          ? 'Updating...'
                          : isVideoCompleted
                          ? 'Video Completed ✅'
                          : 'Mark Video as Completed'}
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <div className="empty-state">
                  <p>No videos available yet.</p>
                </div>
              )}
            </div>

            <div className="video-list">
              {topicDetails.videos?.map((video) => (
                <div
                  key={video.id}
                  className={`video-list-item ${currentVideo?.id === video.id ? 'active' : ''}`}
                  onClick={() => setSelectedVideo(video)}
                >
                  <h4>{video.title}</h4>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'quiz' && (
          <div className="empty-state" style={{ padding: '60px 0' }}>
            <h3>📝 Quizzes for {language.name}</h3>
            <p style={{ margin: '12px 0 24px' }}>
              {topicDetails.quizQuestions?.length > 0
                ? `${topicDetails.quizQuestions.length} quiz questions available for this topic.`
                : 'Test your knowledge with MCQ quizzes.'}
            </p>
            {selectedTopic ? (
              <Link to={`/quiz?topicId=${selectedTopic}&language=${slug}`} className="btn btn-primary">
                Go to Quizzes →
              </Link>
            ) : (
              <button className="btn btn-primary" disabled>
                Select a topic first
              </button>
            )}
          </div>
        )}

        {activeTab === 'challenges' && (
          <div className="empty-state" style={{ padding: '60px 0' }}>
            <h3>💻 Coding Challenges for {language.name}</h3>
            <p style={{ margin: '12px 0 24px' }}>
              {topicDetails.challenges?.length > 0
                ? `${topicDetails.challenges.length} coding challenges available for this topic.`
                : 'Practice coding with hands-on challenges.'}
            </p>
            {selectedTopic ? (
              <Link to={`/challenges?topicId=${selectedTopic}&language=${slug}`} className="btn btn-primary">
                Go to Challenges →
              </Link>
            ) : (
              <button className="btn btn-primary" disabled>
                Select a topic first
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default LanguageDetail;