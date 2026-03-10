import { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { quizAPI } from '../../services/api';
import './Quiz.css';

const Quiz = () => {
  const [searchParams] = useSearchParams();
  const topicId = searchParams.get('topicId');
  const language = searchParams.get('language');

  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [error, setError] = useState('');

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [answers, setAnswers] = useState([]);
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    if (topicId) {
      fetchQuestions(topicId);
    }
  }, [topicId]);

  const fetchQuestions = async (id) => {
    try {
      setLoading(true);
      setError('');
      const response = await quizAPI.getQuestionsByTopic(id);
      setQuestions(response.data || []);
    } catch (err) {
      console.error(err);
      setError('Failed to load quiz questions');
    } finally {
      setLoading(false);
    }
  };

  const handleSelectAnswer = (optionKey) => {
    if (!submitted) {
      setSelectedAnswer(optionKey);
    }
  };

  const handleSubmitAnswer = () => {
    if (!selectedAnswer || questions.length === 0) return;

    const current = questions[currentQuestion];

    setSubmitted(true);
    setAnswers([
      ...answers,
      {
        questionId: current.id,
        selected: selectedAnswer,
        correct: current.correctAnswer,
      },
    ]);
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setSubmitted(false);
    } else {
      setShowResult(true);
      submitQuizResult();
    }
  };

  const handlePrev = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setSelectedAnswer(null);
      setSubmitted(false);
    }
  };

  const handleRetry = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setSubmitted(false);
    setAnswers([]);
    setShowResult(false);
  };

  const submitQuizResult = async () => {
    try {
      setSubmitLoading(true);

      const correctCount = [...answers].filter(
        (a) => a.selected === a.correct
      ).length;

      await quizAPI.submit({
        topicId: Number(topicId),
        score: correctCount,
        totalQuestions: questions.length,
      });
    } catch (err) {
      console.error('Failed to save quiz result:', err);
    } finally {
      setSubmitLoading(false);
    }
  };

  const getQuestionOptions = (question) => [
    { key: 'A', value: question.optionA },
    { key: 'B', value: question.optionB },
    { key: 'C', value: question.optionC },
    { key: 'D', value: question.optionD },
  ];

  if (!topicId) {
    return (
      <div className="quiz-page page-enter">
        <div className="container">
          <div className="empty-state" style={{ padding: '80px 0' }}>
            <h2>No quiz selected</h2>
            <p style={{ margin: '12px 0 24px' }}>
              Please choose a language and topic first to start the quiz.
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
      <div className="quiz-page page-enter">
        <div className="container">
          <div className="empty-state" style={{ padding: '80px 0' }}>
            <h2>Loading quiz...</h2>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="quiz-page page-enter">
        <div className="container">
          <div className="empty-state" style={{ padding: '80px 0' }}>
            <h2>{error}</h2>
          </div>
        </div>
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="quiz-page page-enter">
        <div className="container">
          <div className="empty-state" style={{ padding: '80px 0' }}>
            <h2>No quiz questions available</h2>
            <p style={{ margin: '12px 0 24px' }}>
              This topic does not have quiz questions yet.
            </p>
            <Link to="/languages" className="btn btn-primary">
              Back to Languages →
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (showResult) {
    const correctCount = answers.filter((a) => a.selected === a.correct).length;
    const total = questions.length;
    const percentage = Math.round((correctCount / total) * 100);
    const passed = percentage >= 60;

    return (
      <div className="quiz-page page-enter">
        <div className="container">
          <div className="quiz-result">
            <div className={`quiz-result-score ${passed ? 'pass' : 'fail'}`}>
              {percentage}%
              <small>Score</small>
            </div>

            <h2>{passed ? '🎉 Great Job!' : '📚 Keep Practicing!'}</h2>
            <p>
              {passed
                ? 'You passed the quiz! Keep up the excellent work.'
                : "Don't worry, practice makes perfect. Try again!"}
            </p>

            <div className="quiz-result-stats">
              <div className="quiz-result-stat">
                <h4 className="text-success">{correctCount}</h4>
                <p>Correct</p>
              </div>
              <div className="quiz-result-stat">
                <h4 className="text-error">{total - correctCount}</h4>
                <p>Incorrect</p>
              </div>
              <div className="quiz-result-stat">
                <h4>{total}</h4>
                <p>Total</p>
              </div>
            </div>

            {submitLoading && <p>Saving result...</p>}

            <div className="quiz-result-actions">
              <Link to="/languages" className="btn btn-primary">
                Try Another Topic
              </Link>
              <button className="btn btn-outline" onClick={handleRetry}>
                Retry This Quiz
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const question = questions[currentQuestion];
  const questionProgress = ((currentQuestion + 1) / questions.length) * 100;
  const options = getQuestionOptions(question);

  return (
    <div className="quiz-page page-enter">
      <div className="container">
        <div className="quiz-page-header">
          <span className="section-label">Test Your Knowledge</span>
          <h1>{language ? `${language.toUpperCase()} Quiz` : 'Topic Quiz'}</h1>
          <p>Answer the questions and get instant feedback</p>
        </div>

        <div className="quiz-active">
          <div className="quiz-progress-info">
            <span>Topic Quiz</span>
            <span>
              Question {currentQuestion + 1} of {questions.length}
            </span>
          </div>

          <div className="progress-bar quiz-progress-bar">
            <div
              className="progress-bar-fill"
              style={{ width: `${questionProgress}%` }}
            ></div>
          </div>

          <div className="quiz-question-card">
            <div className="quiz-question-number">
              Question {currentQuestion + 1}
            </div>

            <div className="quiz-question-text">{question.question}</div>

            <div className="quiz-options">
              {options.map((option, index) => {
                let cls = 'quiz-option';

                if (selectedAnswer === option.key) cls += ' selected';

                if (submitted) {
                  if (option.key === question.correctAnswer) cls += ' correct';
                  else if (
                    option.key === selectedAnswer &&
                    option.key !== question.correctAnswer
                  ) {
                    cls += ' incorrect';
                  }
                }

                return (
                  <div
                    key={option.key}
                    className={cls}
                    onClick={() => handleSelectAnswer(option.key)}
                  >
                    <span className="quiz-option-letter">
                      {String.fromCharCode(65 + index)}
                    </span>
                    <span>{option.value}</span>
                  </div>
                );
              })}
            </div>

            {submitted && (
              <div className="quiz-explanation">
                <strong>💡 Explanation: </strong>
                {question.explanation || 'No explanation available.'}
              </div>
            )}
          </div>

          <div className="quiz-nav">
            <button
              className="btn btn-outline"
              onClick={handlePrev}
              disabled={currentQuestion === 0}
            >
              ← Previous
            </button>

            {!submitted ? (
              <button
                className="btn btn-primary"
                onClick={handleSubmitAnswer}
                disabled={selectedAnswer === null}
              >
                Submit Answer
              </button>
            ) : (
              <button className="btn btn-primary" onClick={handleNext}>
                {currentQuestion < questions.length - 1
                  ? 'Next →'
                  : 'View Results'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Quiz;