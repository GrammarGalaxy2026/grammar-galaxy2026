import React, { useEffect, useState } from "react";
import { supabase } from "./supabase";

function App() {
  const [page, setPage] = useState("home");
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(false);
  const [completed, setCompleted] = useState(
    JSON.parse(localStorage.getItem("gg_completed") || "[]")
  );
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [question, setQuestion] = useState(0);

  const features = [
    {
      icon: "📚",
      title: "Grammar Lessons",
      description: "Learn English grammar step by step.",
      color: "#e8f0ff",
      action: "lessons",
    },
    {
      icon: "📝",
      title: "Fun Quizzes",
      description: "Test your knowledge with exciting quizzes.",
      color: "#fff0df",
      action: "quizzes",
    },
    {
      icon: "🏆",
      title: "Track Progress",
      description: "Improve your skills and earn achievements.",
      color: "#e7f9ee",
      action: "progress",
    },
    {
      icon: "🏫",
      title: "For Schools",
      description: "A complete learning platform for schools.",
      color: "#f5eaff",
      action: "schools",
    },
  ];

  const quizQuestions = [
    {
      question: "Choose the correct sentence.",
      options: [
        "She go to school.",
        "She goes to school.",
        "She going school.",
        "She gone to school.",
      ],
      answer: 1,
    },
    {
      question: "What is the past tense of 'eat'?",
      options: ["Eated", "Eating", "Ate", "Eats"],
      answer: 2,
    },
    {
      question: "Choose the correct article: ___ apple.",
      options: ["A", "An", "Thee", "No article"],
      answer: 1,
    },
    {
      question: "Which word is a noun?",
      options: ["Beautiful", "Quickly", "School", "Running"],
      answer: 2,
    },
    {
      question: "Choose the correct pronoun.",
      options: [
        "Me is happy.",
        "I am happy.",
        "My am happy.",
        "Mine am happy.",
      ],
      answer: 1,
    },
  ];

  useEffect(() => {
    async function loadLessons() {
      setLoading(true);

      const { data, error } = await supabase
        .from("lessons")
        .select("*");

      if (error) {
        console.log("Lessons Error:", error.message);
      } else {
        console.log("Lessons Loaded:", data);
        setLessons(data || []);
      }

      setLoading(false);
    }

    loadLessons();
  }, []);

  function completeLesson(id) {
    const updated = [...new Set([...completed, id])];
    setCompleted(updated);
    localStorage.setItem("gg_completed", JSON.stringify(updated));
  }

  function checkAnswer(index) {
    if (answered) return;

    setAnswered(true);

    if (index === quizQuestions[question].answer) {
      setScore(score + 1);
    }
  }

  function nextQuestion() {
    setAnswered(false);
    setQuestion(question + 1);
  }

  function restartQuiz() {
    setQuestion(0);
    setScore(0);
    setAnswered(false);
  }

  const buttonStyle = {
    background: "#5144d8",
    color: "white",
    border: "none",
    padding: "12px 25px",
    borderRadius: "25px",
    cursor: "pointer",
    fontWeight: "bold",
    margin: "8px",
  };

  return (
    <div className="app">
      <style>{`
        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }

        body {
          font-family: Arial, sans-serif;
          background: #f7f8ff;
          color: #20234a;
        }

        .navbar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px 7%;
          background: white;
          flex-wrap: wrap;
          gap: 15px;
        }

        .logo {
          font-size: 25px;
          font-weight: bold;
          color: #5144d8;
        }

        .navlinks {
          display: flex;
          gap: 20px;
          flex-wrap: wrap;
        }

        .navlinks button {
          border: none;
          background: none;
          color: #343653;
          font-weight: bold;
          cursor: pointer;
          font-size: 15px;
        }

        .hero {
          text-align: center;
          padding: 90px 20px;
          background: linear-gradient(135deg, #5144d8, #8875f5);
          color: white;
        }

        .hero h1 {
          font-size: 45px;
          margin-bottom: 20px;
        }

        .hero p {
          font-size: 19px;
          line-height: 1.7;
          margin-bottom: 30px;
        }

        .button {
          background: #ffcc57;
          color: #29234c;
          padding: 15px 32px;
          border-radius: 30px;
          border: none;
          font-weight: bold;
          cursor: pointer;
        }

        .section {
          padding: 60px 7%;
          text-align: center;
        }

        .section h2 {
          font-size: 32px;
          margin-bottom: 18px;
        }

        .cards {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 22px;
          margin-top: 35px;
        }

        .card {
          padding: 30px 20px;
          border-radius: 18px;
          box-shadow: 0 5px 20px #2222220d;
          cursor: pointer;
          transition: transform .2s;
        }

        .card:hover {
          transform: translateY(-6px);
        }

        .icon {
          font-size: 45px;
          margin-bottom: 18px;
        }

        .card h3 {
          margin-bottom: 12px;
          color: #5144d8;
        }

        .card p {
          line-height: 1.6;
          color: #65677e;
        }

        .lesson-card, .quiz-box {
          background: white;
          padding: 25px;
          margin: 18px auto;
          max-width: 650px;
          border-radius: 16px;
          box-shadow: 0 5px 20px #2222220d;
        }

        .option {
          display: block;
          width: 100%;
          padding: 14px;
          margin: 10px 0;
          background: #f0efff;
          border: 2px solid transparent;
          border-radius: 10px;
          cursor: pointer;
          font-size: 16px;
        }

        .option:hover {
          border-color: #5144d8;
        }

        .footer {
          background: #24234b;
          color: white;
          text-align: center;
          padding: 30px 15px;
          line-height: 2;
        }

        @media (max-width: 600px) {
          .hero h1 {
            font-size: 32px;
          }

          .navbar {
            justify-content: center;
          }

          .navlinks {
            justify-content: center;
          }
        }
      `}</style>

      <header className="navbar">
        <div
          className="logo"
          onClick={() => setPage("home")}
          style={{ cursor: "pointer" }}
        >
          🌍 Grammar Galaxy
        </div>

        <nav className="navlinks">
          <button onClick={() => setPage("home")}>Home</button>
          <button onClick={() => setPage("lessons")}>Lessons</button>
          <button onClick={() => setPage("quizzes")}>Quizzes</button>
          <button onClick={() => setPage("progress")}>Progress</button>
          <button onClick={() => setPage("schools")}>Schools</button>
        </nav>
      </header>

      <main>
        {page === "home" && (
          <>
            <section className="hero">
              <h1>Welcome to Grammar Galaxy! 🚀</h1>
              <p>
                Explore English Grammar, Learn New Skills
                <br />
                and Make Learning Fun!
              </p>

              <button
                className="button"
                onClick={() => setPage("lessons")}
              >
                Start Learning →
              </button>
            </section>

            <section className="section">
              <h2>Explore Your Learning Universe 🌟</h2>
              <p>Everything you need to improve your English.</p>

              <div className="cards">
                {features.map((feature) => (
                  <div
                    className="card"
                    key={feature.action}
                    style={{ background: feature.color }}
                    onClick={() => setPage(feature.action)}
                  >
                    <div className="icon">{feature.icon}</div>
                    <h3>{feature.title}</h3>
                    <p>{feature.description}</p>
                  </div>
                ))}
              </div>
            </section>
          </>
        )}
{page === "lesson" && selectedLesson && (
  <section className="section">
    <div className="lesson-card">
      <h2>📖 {selectedLesson.title}</h2>
      <p>{selectedLesson.content}</p>
      <button style={buttonStyle} onClick={() => setPage("lessons")}>
        ← Back to Lessons
      </button>
    </div>
  </section>
)}
        {page === "lessons" && (

          <section className="section">
            <h2>📚 Grammar Lessons</h2>
            <p>Explore your English learning journey!</p>

            {loading && <p>Loading lessons...</p>}

            {!loading && lessons.length === 0 && (
              <p>No lessons found in the database yet.</p>
            )}

            {lessons.map((lesson, index) => (
              <div className="lesson-card" key={lesson.id || index}>
                <h3>
                  {lesson.title || lesson.name || `Lesson ${index + 1}`}
                </h3>

                <p>
                  {lesson.description ||
                    lesson.content ||
                    "Explore this grammar lesson."}
                </p>

                <button
                  style={buttonStyle}
                  onClick={() => completeLesson(lesson.id || index)}
                >
                  {completed.includes(lesson.id || index)
                    ? "Completed ✓"
                    : "Mark as Completed"}
                    <button
  style={buttonStyle}
  onClick={() => {
    setSelectedLesson(lesson);
    setPage("lesson");
  }}
>
  📖 Read Lesson
</button>

<button
  style={buttonStyle}
  onClick={() => completeLesson(lesson.id || index)}
>
  {completed.includes(lesson.id || index)
    ? "Completed ✓"
    : "Mark as Completed"}
</button>
                </button>
              </div>
            ))}

            <button style={buttonStyle} onClick={() => setPage("home")}>
              ← Back Home
            </button>
          </section>
        )}

        {page === "quizzes" && (
          <section className="section">
            <h2>📝 Fun Grammar Quiz</h2>

            <div className="quiz-box">
              {question < quizQuestions.length ? (
                <>
                  <p>
                    Question {question + 1} of {quizQuestions.length}
                  </p>

                  <h3 style={{ margin: "25px 0" }}>
                    {quizQuestions[question].question}
                  </h3>

                  {quizQuestions[question].options.map((option, index) => (
                    <button
                      className="option"
                      key={index}
                      onClick={() => checkAnswer(index)}
                    >
                      {option}
                    </button>
                  ))}

                  {answered && (
                    <>
                      <p style={{ margin: "15px" }}>
                        {quizQuestions[question].options[
                          quizQuestions[question].answer
                        ]}
                        {" "}is the correct answer!
                      </p>

                      <button
                        style={buttonStyle}
                        onClick={nextQuestion}
                      >
                        Next Question →
                      </button>
                    </>
                  )}
                </>
              ) : (
                <>
                  <h2>🎉 Quiz Completed!</h2>
                  <h3>
                    Your Score: {score} / {quizQuestions.length}
                  </h3>

                  <button style={buttonStyle} onClick={restartQuiz}>
                    Play Again
                  </button>
                </>
              )}
            </div>

            <button style={buttonStyle} onClick={() => setPage("home")}>
              ← Back Home
            </button>
          </section>
        )}

        {page === "progress" && (
          <section className="section">
            <h2>🏆 Your Learning Progress</h2>

            <div className="quiz-box">
              <h3>Completed Lessons</h3>
              <h1 style={{ color: "#5144d8", margin: "20px" }}>
                {completed.length}
              </h1>
              <p>Keep learning and growing!</p>
            </div>

            <button style={buttonStyle} onClick={() => setPage("lessons")}>
              Continue Learning
            </button>

            <button style={buttonStyle} onClick={() => setPage("home")}>
              ← Back Home
            </button>
          </section>
        )}

        {page === "schools" && (
          <section className="section">
            <h2>🏫 Grammar Galaxy for Schools</h2>

            <div className="quiz-box">
              <h3>Welcome, Schools!</h3>
              <p style={{ margin: "20px" }}>
                Grammar Galaxy helps schools make English grammar
                learning simple, interactive and enjoyable.
              </p>
              <p>Learn • Practice • Grow Together ❤️</p>
              <p style={{ marginTop: "15px" }}>
                School features are coming soon!
              </p>
            </div>

            <button style={buttonStyle} onClick={() => setPage("home")}>
              ← Back Home
            </button>
          </section>
        )}
      </main>

      <footer className="footer">
        <h2>🌍 Grammar Galaxy</h2>
        <p>Learn • Practice • Grow</p>
        <p>© 2026 Grammar Galaxy. All Rights Reserved.</p>
        <p>Free Learning for Everyone ❤️</p>
      </footer>
    </div>
  );
}

export default App;