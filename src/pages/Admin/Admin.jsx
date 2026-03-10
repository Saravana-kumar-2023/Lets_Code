import { useEffect, useMemo, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { adminAPI, adminContentAPI, languageAPI } from '../../services/api';
import './Admin.css';

const initialForm = {
  id: null,
  name: '',
  title: '',
  description: '',
  difficulty: 'Beginner',
  iconUrl: '',
  languageId: '',
  topicId: '',
  topicOrder: '',
  content: '',
  youtubeUrl: '',
  embedUrl: '',
};

const Admin = () => {
  const { user, isAdmin } = useAuth();

  const [activeTab, setActiveTab] = useState('overview');
  const [showForm, setShowForm] = useState(false);
  const [formType, setFormType] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState(initialForm);

  const [stats, setStats] = useState(null);
  const [languages, setLanguages] = useState([]);
  const [topics, setTopics] = useState([]);
  const [notes, setNotes] = useState([]);
  const [videos, setVideos] = useState([]);
  const [users, setUsers] = useState([]);
  const [results, setResults] = useState({
    quizResults: [],
    challengeSubmissions: [],
    progress: [],
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const tabs = ['overview', 'languages', 'topics', 'notes', 'videos', 'quizzes', 'challenges', 'students'];

  useEffect(() => {
    if (!user || !isAdmin()) {
      setLoading(false);
      return;
    }
    fetchAdminData();
  }, [user, isAdmin]);

  const fetchAdminData = async () => {
    try {
      setLoading(true);
      setError('');

      const [statsRes, usersRes, resultsRes, languagesRes, topicsRes, notesRes, videosRes] = await Promise.all([
        adminAPI.getStats(),
        adminAPI.getUsers(),
        adminAPI.getResults(),
        languageAPI.getAll(),
        adminContentAPI.getAllTopics(),
        adminContentAPI.getAllNotes(),
        adminContentAPI.getAllVideos(),
      ]);

      setStats(statsRes.data || {});
      setUsers(usersRes.data || []);
      setResults(resultsRes.data || { quizResults: [], challengeSubmissions: [], progress: [] });
      setLanguages(languagesRes.data || []);
      setTopics(topicsRes.data || []);
      setNotes(notesRes.data || []);
      setVideos(videosRes.data || []);
    } catch (err) {
      console.error('Admin data load error:', err);
      setError('Failed to load admin data');
    } finally {
      setLoading(false);
    }
  };

  const studentsData = useMemo(() => {
    return users
      .filter((u) => u.role !== 'ROLE_ADMIN')
      .map((u) => {
        const userQuizResults = (results.quizResults || []).filter((q) => q.userId === u.id);
        const userProgress = (results.progress || []).filter((p) => p.userId === u.id);

        const avgScore =
          userQuizResults.length > 0
            ? Math.round(userQuizResults.reduce((sum, q) => sum + (q.percentage || 0), 0) / userQuizResults.length)
            : 0;

        const totalProgress = userProgress.length;
        const completedProgress = userProgress.filter((p) => p.topicCompleted).length;
        const progressPercent = totalProgress > 0 ? Math.round((completedProgress / totalProgress) * 100) : 0;

        return {
          id: u.id,
          name: u.fullName,
          email: u.email,
          progress: progressPercent,
          quizScore: avgScore,
        };
      });
  }, [users, results]);

  const openForm = (type, item = null) => {
    setFormType(type);
    setEditMode(!!item);

    if (item) {
      if (type === 'language') {
        setFormData({
          ...initialForm,
          id: item.id,
          name: item.name || '',
          description: item.description || '',
          difficulty: item.difficulty || 'Beginner',
          iconUrl: item.iconUrl || '',
        });
      } else if (type === 'topic') {
        setFormData({
          ...initialForm,
          id: item.id,
          title: item.title || '',
          description: item.description || '',
          topicOrder: item.topicOrder || '',
          languageId: item.language?.id || '',
        });
      } else if (type === 'note') {
        setFormData({
          ...initialForm,
          id: item.id,
          title: item.title || '',
          content: item.content || '',
          topicId: item.topic?.id || '',
        });
      } else if (type === 'video') {
        setFormData({
          ...initialForm,
          id: item.id,
          title: item.title || '',
          youtubeUrl: item.youtubeUrl || '',
          embedUrl: item.embedUrl || '',
          topicId: item.topic?.id || '',
        });
      }
    } else {
      setFormData(initialForm);
    }

    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    setEditMode(false);
    setFormType('');
    setFormData(initialForm);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      if (formType === 'language') {
        const payload = {
          name: formData.name,
          description: formData.description,
          difficulty: formData.difficulty,
          iconUrl: formData.iconUrl,
        };

        if (editMode) await adminContentAPI.updateLanguage(formData.id, payload);
        else await adminContentAPI.createLanguage(payload);
      }

      if (formType === 'topic') {
        const payload = {
          title: formData.title,
          description: formData.description,
          topicOrder: Number(formData.topicOrder),
          language: { id: Number(formData.languageId) },
        };

        if (editMode) await adminContentAPI.updateTopic(formData.id, payload);
        else await adminContentAPI.createTopic(payload);
      }

      if (formType === 'note') {
        const payload = {
          title: formData.title,
          content: formData.content,
          topic: { id: Number(formData.topicId) },
        };

        if (editMode) await adminContentAPI.updateNote(formData.id, payload);
        else await adminContentAPI.createNote(payload);
      }

      if (formType === 'video') {
        const payload = {
          title: formData.title,
          youtubeUrl: formData.youtubeUrl,
          embedUrl: formData.embedUrl,
          topic: { id: Number(formData.topicId) },
        };

        if (editMode) await adminContentAPI.updateVideo(formData.id, payload);
        else await adminContentAPI.createVideo(payload);
      }

      await fetchAdminData();
      closeForm();
    } catch (err) {
      console.error('Save failed:', err);
      alert('Failed to save data');
    }
  };

  const handleDelete = async (type, id) => {
    const ok = window.confirm('Are you sure you want to delete this item?');
    if (!ok) return;

    try {
      if (type === 'language') await adminContentAPI.deleteLanguage(id);
      if (type === 'topic') await adminContentAPI.deleteTopic(id);
      if (type === 'note') await adminContentAPI.deleteNote(id);
      if (type === 'video') await adminContentAPI.deleteVideo(id);

      await fetchAdminData();
    } catch (err) {
      console.error('Delete failed:', err);
      alert('Failed to delete data');
    }
  };

  if (!user) return <Navigate to="/login" />;
  if (!isAdmin()) return <Navigate to="/dashboard" />;

  if (loading) {
    return (
      <div className="admin-page page-enter">
        <div className="container" style={{ padding: '80px 0', textAlign: 'center' }}>
          <h2>Loading admin panel...</h2>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="admin-page page-enter">
        <div className="container" style={{ padding: '80px 0', textAlign: 'center' }}>
          <h2>{error}</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-page page-enter">
      <div className="container">
        <div className="admin-header">
          <h1>⚙️ Admin Panel</h1>
          <p>Manage your platform content and view student progress</p>
        </div>

        <div className="admin-tabs">
          {tabs.map((tab) => (
            <button
              key={tab}
              className={`admin-tab ${activeTab === tab ? 'active' : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {activeTab === 'overview' && (
          <>
            <div className="admin-stats">
              <div className="admin-stat-card"><h3>{stats?.totalLanguages ?? 0}</h3><p>Languages</p></div>
              <div className="admin-stat-card"><h3>{stats?.totalTopics ?? 0}</h3><p>Topics</p></div>
              <div className="admin-stat-card"><h3>{users.filter((u) => u.role !== 'ROLE_ADMIN').length}</h3><p>Students</p></div>
              <div className="admin-stat-card"><h3>{results?.progress?.length ?? 0}</h3><p>Progress Records</p></div>
            </div>
          </>
        )}

        {activeTab === 'languages' && (
          <div className="admin-table-wrapper">
            <div className="admin-table-header">
              <h3>Languages</h3>
              <button className="btn btn-primary btn-sm" onClick={() => openForm('language')}>
                + Add Language
              </button>
            </div>

            <table className="admin-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Difficulty</th>
                  <th>Description</th>
                  <th>Icon</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {languages.map((lang) => (
                  <tr key={lang.id}>
                    <td>{lang.id}</td>
                    <td>{lang.name}</td>
                    <td>{lang.difficulty}</td>
                    <td>{lang.description}</td>
                    <td>{lang.iconUrl}</td>
                    <td>
                      <div className="admin-table-actions">
                        <button className="admin-btn-edit" onClick={() => openForm('language', lang)}>Edit</button>
                        <button className="admin-btn-delete" onClick={() => handleDelete('language', lang.id)}>Delete</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'topics' && (
          <div className="admin-table-wrapper">
            <div className="admin-table-header">
              <h3>Topics</h3>
              <button className="btn btn-primary btn-sm" onClick={() => openForm('topic')}>
                + Add Topic
              </button>
            </div>

            <table className="admin-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Title</th>
                  <th>Order</th>
                  <th>Description</th>
                  <th>Language</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {topics.map((topic) => (
                  <tr key={topic.id}>
                    <td>{topic.id}</td>
                    <td>{topic.title}</td>
                    <td>{topic.topicOrder}</td>
                    <td>{topic.description}</td>
                    <td>{topic.language?.name || topic.language?.id}</td>
                    <td>
                      <div className="admin-table-actions">
                        <button className="admin-btn-edit" onClick={() => openForm('topic', topic)}>Edit</button>
                        <button className="admin-btn-delete" onClick={() => handleDelete('topic', topic.id)}>Delete</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'notes' && (
          <div className="admin-table-wrapper">
            <div className="admin-table-header">
              <h3>Notes</h3>
              <button className="btn btn-primary btn-sm" onClick={() => openForm('note')}>
                + Add Note
              </button>
            </div>

            <table className="admin-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Title</th>
                  <th>Topic</th>
                  <th>Content</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {notes.map((note) => (
                  <tr key={note.id}>
                    <td>{note.id}</td>
                    <td>{note.title}</td>
                    <td>{note.topic?.title || note.topic?.id}</td>
                    <td>{note.content?.slice(0, 80)}...</td>
                    <td>
                      <div className="admin-table-actions">
                        <button className="admin-btn-edit" onClick={() => openForm('note', note)}>Edit</button>
                        <button className="admin-btn-delete" onClick={() => handleDelete('note', note.id)}>Delete</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'videos' && (
          <div className="admin-table-wrapper">
            <div className="admin-table-header">
              <h3>Videos</h3>
              <button className="btn btn-primary btn-sm" onClick={() => openForm('video')}>
                + Add Video
              </button>
            </div>

            <table className="admin-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Title</th>
                  <th>Topic</th>
                  <th>YouTube URL</th>
                  <th>Embed URL</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {videos.map((video) => (
                  <tr key={video.id}>
                    <td>{video.id}</td>
                    <td>{video.title}</td>
                    <td>{video.topic?.title || video.topic?.id}</td>
                    <td>{video.youtubeUrl}</td>
                    <td>{video.embedUrl}</td>
                    <td>
                      <div className="admin-table-actions">
                        <button className="admin-btn-edit" onClick={() => openForm('video', video)}>Edit</button>
                        <button className="admin-btn-delete" onClick={() => handleDelete('video', video.id)}>Delete</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'quizzes' && (
          <div className="admin-table-wrapper">
            <div className="admin-table-header">
              <h3>Quiz Results</h3>
            </div>
            <table className="admin-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>User</th>
                  <th>Email</th>
                  <th>Score</th>
                  <th>Total Questions</th>
                  <th>Percentage</th>
                  <th>Topic</th>
                </tr>
              </thead>
              <tbody>
                {(results.quizResults || []).map((q) => (
                  <tr key={q.id}>
                    <td>{q.id}</td>
                    <td>{q.userName || 'Unknown'}</td>
                    <td>{q.userEmail || 'Unknown'}</td>
                    <td>{q.score}</td>
                    <td>{q.totalQuestions}</td>
                    <td>{Math.round(q.percentage || 0)}%</td>
                    <td>{q.topicTitle || 'Unknown'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'challenges' && (
          <div className="admin-table-wrapper">
            <div className="admin-table-header">
              <h3>Challenge Submissions</h3>
            </div>
            <table className="admin-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>User</th>
                  <th>Email</th>
                  <th>Challenge</th>
                  <th>Language</th>
                  <th>Verdict</th>
                </tr>
              </thead>
              <tbody>
                {(results.challengeSubmissions || []).map((c) => (
                  <tr key={c.id}>
                    <td>{c.id}</td>
                    <td>{c.userName || 'Unknown'}</td>
                    <td>{c.userEmail || 'Unknown'}</td>
                    <td>{c.challengeTitle || 'Unknown'}</td>
                    <td>{c.languageUsed}</td>
                    <td>{c.verdict}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'students' && (
          <div className="admin-table-wrapper">
            <div className="admin-table-header">
              <h3>Student Results</h3>
            </div>
            <table className="admin-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Progress</th>
                  <th>Avg Score</th>
                </tr>
              </thead>
              <tbody>
                {studentsData.map((s) => (
                  <tr key={s.id}>
                    <td>{s.id}</td>
                    <td>{s.name}</td>
                    <td>{s.email}</td>
                    <td>{s.progress}%</td>
                    <td>{s.quizScore}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {showForm && (
          <div className="admin-form-modal" onClick={closeForm}>
            <div className="admin-form-card" onClick={(e) => e.stopPropagation()}>
              <h3>{editMode ? 'Edit' : 'Add New'} {formType.charAt(0).toUpperCase() + formType.slice(1)}</h3>

              {formType === 'language' && (
                <>
                  <div className="form-group">
                    <label className="form-label">Name</label>
                    <input name="name" value={formData.name} onChange={handleChange} type="text" className="form-input" />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Description</label>
                    <textarea name="description" value={formData.description} onChange={handleChange} className="form-input" rows="3" />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Difficulty</label>
                    <select name="difficulty" value={formData.difficulty} onChange={handleChange} className="form-input">
                      <option value="Beginner">Beginner</option>
                      <option value="Intermediate">Intermediate</option>
                      <option value="Advanced">Advanced</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Icon</label>
                    <input name="iconUrl" value={formData.iconUrl} onChange={handleChange} type="text" className="form-input" />
                  </div>
                </>
              )}

              {formType === 'topic' && (
                <>
                  <div className="form-group">
                    <label className="form-label">Title</label>
                    <input name="title" value={formData.title} onChange={handleChange} type="text" className="form-input" />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Description</label>
                    <textarea name="description" value={formData.description} onChange={handleChange} className="form-input" rows="3" />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Topic Order</label>
                    <input name="topicOrder" value={formData.topicOrder} onChange={handleChange} type="number" className="form-input" />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Language</label>
                    <select name="languageId" value={formData.languageId} onChange={handleChange} className="form-input">
                      <option value="">Select Language</option>
                      {languages.map((l) => (
                        <option key={l.id} value={l.id}>{l.name}</option>
                      ))}
                    </select>
                  </div>
                </>
              )}

              {formType === 'note' && (
                <>
                  <div className="form-group">
                    <label className="form-label">Title</label>
                    <input name="title" value={formData.title} onChange={handleChange} type="text" className="form-input" />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Content</label>
                    <textarea name="content" value={formData.content} onChange={handleChange} className="form-input" rows="6" />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Topic</label>
                    <select name="topicId" value={formData.topicId} onChange={handleChange} className="form-input">
                      <option value="">Select Topic</option>
                      {topics.map((t) => (
                        <option key={t.id} value={t.id}>{t.title}</option>
                      ))}
                    </select>
                  </div>
                </>
              )}

              {formType === 'video' && (
                <>
                  <div className="form-group">
                    <label className="form-label">Title</label>
                    <input name="title" value={formData.title} onChange={handleChange} type="text" className="form-input" />
                  </div>
                  <div className="form-group">
                    <label className="form-label">YouTube URL</label>
                    <input name="youtubeUrl" value={formData.youtubeUrl} onChange={handleChange} type="text" className="form-input" />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Embed URL</label>
                    <input name="embedUrl" value={formData.embedUrl} onChange={handleChange} type="text" className="form-input" />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Topic</label>
                    <select name="topicId" value={formData.topicId} onChange={handleChange} className="form-input">
                      <option value="">Select Topic</option>
                      {topics.map((t) => (
                        <option key={t.id} value={t.id}>{t.title}</option>
                      ))}
                    </select>
                  </div>
                </>
              )}

              <div className="admin-form-actions">
                <button className="btn btn-outline" onClick={closeForm}>Cancel</button>
                <button className="btn btn-primary" onClick={handleSave}>
                  {editMode ? 'Update' : 'Save'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;