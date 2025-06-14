import React, { useState, useEffect, useRef } from "react";
import {
  Clock,
  Trophy,
  Play,
  RotateCcw,
  Timer,
  Award,
  Target,
  CheckCircle,
  XCircle,
  Volume2,
} from "lucide-react";

// Custom color classes based on your design system
const colors = {
  background: "bg-[#fbfbfb]",
  primary: "bg-[#1d0042] text-white",
  secondary: "bg-[#400c7c] text-white",
  tertiary: "bg-[#4f4f4f] text-white",
  accent: "bg-[#ffc33e] text-[#1d0042]",
  error: "bg-[#ff0000] text-white",
  success: "bg-green-500 text-white",
  primaryText: "text-[#1d0042]",
  secondaryText: "text-[#400c7c]",
  tertiaryText: "text-[#4f4f4f]",
  accentText: "text-[#ffc33e]",
};

const QuizApp = () => {
  const [quizStarted, setQuizStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showOptions, setShowOptions] = useState(false);
  const [timeLeft, setTimeLeft] = useState(5);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [questionPhase, setQuestionPhase] = useState("question");
  const [randomizedQuestions, setRandomizedQuestions] = useState([]);
  const [currentQuestionData, setCurrentQuestionData] = useState(null);

  // Sound refs
  const tickSoundRef = useRef(null);
  const correctSoundRef = useRef(null);
  const wrongSoundRef = useRef(null);
  const timeUpSoundRef = useRef(null);

  // Create audio elements
  useEffect(() => {
    // Create simple beep sounds using Web Audio API
    const createBeepSound = (frequency, duration) => {
      return () => {
        const audioContext = new (window.AudioContext ||
          window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);

        oscillator.frequency.value = frequency;
        oscillator.type = "sine";

        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(
          0.01,
          audioContext.currentTime + duration
        );

        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + duration);
      };
    };

    tickSoundRef.current = createBeepSound(800, 0.1);
    correctSoundRef.current = createBeepSound(600, 0.3);
    wrongSoundRef.current = createBeepSound(300, 0.5);
    timeUpSoundRef.current = createBeepSound(200, 0.8);
  }, []);

  const originalQuizData = {
    name: "Advanced Knowledge Quiz",
    totalMarks: 10,
    questions: [
      {
        question: "What is the capital of France?",
        options: ["London", "Berlin", "Paris", "Madrid"],
        correct: 2,
      },
      {
        question: "Which planet is known as the Red Planet?",
        options: ["Venus", "Mars", "Jupiter", "Saturn"],
        correct: 1,
      },
      {
        question: "What is 2 + 2?",
        options: ["3", "4", "5", "6"],
        correct: 1,
      },
      {
        question: "Who painted the Mona Lisa?",
        options: ["Van Gogh", "Picasso", "Leonardo da Vinci", "Michelangelo"],
        correct: 2,
      },
      {
        question: "What is the largest ocean on Earth?",
        options: ["Atlantic", "Indian", "Arctic", "Pacific"],
        correct: 3,
      },
      {
        question: "Which gas makes up most of Earth's atmosphere?",
        options: ["Oxygen", "Nitrogen", "Carbon Dioxide", "Hydrogen"],
        correct: 1,
      },
      {
        question: "What is the smallest country in the world?",
        options: ["Monaco", "Vatican City", "San Marino", "Liechtenstein"],
        correct: 1,
      },
      {
        question: "Who wrote 'Romeo and Juliet'?",
        options: [
          "Charles Dickens",
          "William Shakespeare",
          "Jane Austen",
          "Mark Twain",
        ],
        correct: 1,
      },
      {
        question: "What is the chemical symbol for gold?",
        options: ["Go", "Gd", "Au", "Ag"],
        correct: 2,
      },
      {
        question: "Which continent is the largest?",
        options: ["Africa", "Asia", "North America", "Europe"],
        correct: 1,
      },
    ],
  };

  // Shuffle array function
  const shuffleArray = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  // Randomize questions and options
  const randomizeQuizData = () => {
    const shuffledQuestions = shuffleArray(originalQuizData.questions).map(
      (question) => {
        const correctAnswer = question.options[question.correct];
        const shuffledOptions = shuffleArray(question.options);
        const newCorrectIndex = shuffledOptions.indexOf(correctAnswer);

        return {
          ...question,
          options: shuffledOptions,
          correct: newCorrectIndex,
        };
      }
    );

    setRandomizedQuestions(shuffledQuestions);
    setCurrentQuestionData(shuffledQuestions[0]);
  };

  useEffect(() => {
    let timer;
    if (quizStarted && !quizCompleted && !showResult) {
      timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            handleTimeout();
            return 0;
          }
          // Play tick sound for last 5 seconds
          if (prev <= 6 && tickSoundRef.current) {
            tickSoundRef.current();
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [quizStarted, currentQuestion, questionPhase, showResult, quizCompleted]);

  useEffect(() => {
    if (quizStarted && !showResult && !quizCompleted) {
      if (questionPhase === "question" && timeLeft === 0) {
        setQuestionPhase("options");
        setTimeLeft(25);
        setShowOptions(true);
      }
    }
  }, [timeLeft, questionPhase, quizStarted, showResult, quizCompleted]);

  // Auto-progress to next question after showing result
  useEffect(() => {
    let timer;
    if (showResult && !quizCompleted) {
      timer = setTimeout(() => {
        nextQuestion();
      }, 2500);
    }
    return () => clearTimeout(timer);
  }, [showResult, quizCompleted]);

  // Update current question data when question changes
  useEffect(() => {
    if (
      randomizedQuestions.length > 0 &&
      currentQuestion < randomizedQuestions.length
    ) {
      setCurrentQuestionData(randomizedQuestions[currentQuestion]);
    }
  }, [currentQuestion, randomizedQuestions]);

  const startQuiz = () => {
    randomizeQuizData();
    setQuizStarted(true);
    setCurrentQuestion(0);
    setScore(0);
    setTimeLeft(5);
    setShowOptions(false);
    setSelectedAnswer(null);
    setShowResult(false);
    setQuizCompleted(false);
    setQuestionPhase("question");
  };

  const handleTimeout = () => {
    if (questionPhase === "question") {
      setQuestionPhase("options");
      setTimeLeft(25);
      setShowOptions(true);
    } else {
      setShowResult(true);
      setTimeLeft(0);
      if (timeUpSoundRef.current) {
        timeUpSoundRef.current();
      }
    }
  };

  const handleAnswerSelect = (answerIndex) => {
    if (selectedAnswer !== null || showResult) return;

    setSelectedAnswer(answerIndex);
    setShowResult(true);

    if (answerIndex === currentQuestionData.correct) {
      setScore((prev) => prev + 1);
      if (correctSoundRef.current) {
        correctSoundRef.current();
      }
    } else {
      if (wrongSoundRef.current) {
        wrongSoundRef.current();
      }
    }
  };

  const nextQuestion = () => {
    if (currentQuestion + 1 < randomizedQuestions.length) {
      setCurrentQuestion((prev) => prev + 1);
      setSelectedAnswer(null);
      setShowResult(false);
      setShowOptions(false);
      setTimeLeft(5);
      setQuestionPhase("question");
    } else {
      setQuizCompleted(true);
    }
  };

  const resetQuiz = () => {
    setQuizStarted(false);
    setCurrentQuestion(0);
    setShowOptions(false);
    setTimeLeft(5);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setQuizCompleted(false);
    setQuestionPhase("question");
    setRandomizedQuestions([]);
    setCurrentQuestionData(null);
  };

  const getOptionStyle = (optionIndex) => {
    if (!showResult)
      return `bg-white hover:bg-[#400c7c] hover:text-white border-3 border-[#400c7c] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1`;

    if (optionIndex === currentQuestionData.correct) {
      return `${colors.success} border-3 border-green-600 shadow-lg transform scale-105`;
    }

    if (
      optionIndex === selectedAnswer &&
      selectedAnswer !== currentQuestionData.correct
    ) {
      return `${colors.error} border-3 border-red-600 shadow-lg transform scale-105`;
    }

    return "bg-gray-100 border-3 border-gray-300 text-gray-500 opacity-60";
  };

  const getOptionIcon = (optionIndex) => {
    if (!showResult) return null;

    if (optionIndex === currentQuestionData.correct) {
      return <CheckCircle className="w-6 h-6 text-white" />;
    }

    if (
      optionIndex === selectedAnswer &&
      selectedAnswer !== currentQuestionData.correct
    ) {
      return <XCircle className="w-6 h-6 text-white" />;
    }

    return null;
  };

  if (!quizStarted) {
    return (
      <div
        className={`min-h-screen ${colors.background} flex items-center justify-center p-4 relative overflow-hidden`}
      >
        {/* Animated background */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-10 left-10 w-20 h-20 bg-[#1d0042] rounded-full animate-pulse"></div>
          <div className="absolute top-40 right-20 w-16 h-16 bg-[#400c7c] rounded-full animate-bounce"></div>
          <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-[#ffc33e] rounded-full animate-ping"></div>
          <div className="absolute bottom-40 right-1/3 w-14 h-14 bg-[#1d0042] rounded-full animate-pulse"></div>
        </div>

        <div className="bg-white rounded-3xl shadow-2xl p-12 text-center max-w-2xl w-full border border-gray-100 relative z-10">
          <div className="mb-12">
            <div
              className={`w-24 h-24 ${colors.accent} rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg animate-bounce`}
            >
              <Trophy className="w-12 h-12 text-[#1d0042]" />
            </div>
            <h1
              className={`text-5xl font-bold ${colors.primaryText} mb-6 bg-gradient-to-r from-[#1d0042] to-[#400c7c] bg-clip-text text-transparent`}
            >
              {originalQuizData.name}
            </h1>

            <div className="grid grid-cols-3 gap-4 mb-8">
              <div
                className={`${colors.primary} rounded-2xl p-4 transform hover:scale-105 transition-all duration-300`}
              >
                <Target className="w-8 h-8 mx-auto mb-2" />
                <p className="text-sm font-semibold">Questions</p>
                <p className="text-2xl font-bold">
                  {originalQuizData.questions.length}
                </p>
              </div>
              <div
                className={`${colors.secondary} rounded-2xl p-4 transform hover:scale-105 transition-all duration-300`}
              >
                <Award className="w-8 h-8 mx-auto mb-2" />
                <p className="text-sm font-semibold">Total Marks</p>
                <p className="text-2xl font-bold">
                  {originalQuizData.totalMarks}
                </p>
              </div>
              <div
                className={`${colors.accent} rounded-2xl p-4 transform hover:scale-105 transition-all duration-300`}
              >
                <Timer className="w-8 h-8 mx-auto mb-2" />
                <p className="text-sm font-semibold text-[#1d0042]">
                  Per Question
                </p>
                <p className="text-2xl font-bold text-[#1d0042]">30s</p>
              </div>
            </div>

            <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl p-6 mb-8">
              <div className="flex items-center justify-center mb-4">
                <Volume2 className={`w-6 h-6 ${colors.secondaryText} mr-2`} />
                <p className={`font-bold ${colors.secondaryText}`}>
                  Audio Enabled Quiz
                </p>
              </div>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                  <span className={colors.tertiaryText}>
                    Question: 5 seconds
                  </span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                  <span className={colors.tertiaryText}>
                    Options: 25 seconds
                  </span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
                  <span className={colors.tertiaryText}>Random Order</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-purple-500 rounded-full mr-2"></div>
                  <span className={colors.tertiaryText}>Sound Effects</span>
                </div>
              </div>
            </div>
          </div>

          <button
            onClick={startQuiz}
            className={`${colors.accent} hover:bg-[#e6b038] font-bold py-5 px-12 rounded-2xl text-2xl transition-all duration-300 transform hover:scale-110 shadow-xl flex items-center gap-4 mx-auto group`}
          >
            <Play className="w-8 h-8 group-hover:animate-pulse" />
            Start Quiz
          </button>
        </div>
      </div>
    );
  }

  if (quizCompleted) {
    const percentage = (score / randomizedQuestions.length) * 100;
    return (
      <div
        className={`min-h-screen ${colors.background} flex items-center justify-center p-4 relative overflow-hidden`}
      >
        {/* Celebration animation */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-[#ffc33e] rounded-full animate-ping"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${1 + Math.random()}s`,
              }}
            ></div>
          ))}
        </div>

        <div className="bg-white rounded-3xl shadow-2xl p-12 text-center max-w-2xl w-full border border-gray-100 relative z-10">
          <div
            className={`w-32 h-32 ${colors.accent} rounded-full flex items-center justify-center mx-auto mb-10 shadow-xl animate-bounce`}
          >
            <Trophy className="w-16 h-16 text-[#1d0042]" />
          </div>

          <h2
            className={`text-5xl font-bold ${colors.primaryText} mb-8 bg-gradient-to-r from-[#1d0042] to-[#400c7c] bg-clip-text text-transparent`}
          >
            Quiz Completed!
          </h2>

          <div className="mb-10">
            <div
              className={`text-8xl font-bold ${colors.secondaryText} mb-6 animate-pulse`}
            >
              {score}/{randomizedQuestions.length}
            </div>

            <div className="grid grid-cols-2 gap-6 mb-8">
              <div className={`${colors.primary} rounded-2xl p-6`}>
                <p className="text-sm font-semibold mb-2">Accuracy</p>
                <p className="text-3xl font-bold">{percentage.toFixed(1)}%</p>
              </div>
              <div className={`${colors.secondary} rounded-2xl p-6`}>
                <p className="text-sm font-semibold mb-2">Grade</p>
                <p className="text-3xl font-bold">
                  {percentage >= 90
                    ? "A+"
                    : percentage >= 80
                    ? "A"
                    : percentage >= 70
                    ? "B"
                    : percentage >= 60
                    ? "C"
                    : "D"}
                </p>
              </div>
            </div>

            <div
              className={`${
                percentage >= 80
                  ? colors.success
                  : percentage >= 60
                  ? colors.accent
                  : colors.error
              } rounded-2xl p-8 transform hover:scale-105 transition-all duration-300`}
            >
              {percentage >= 80 ? (
                <div>
                  <CheckCircle className="w-12 h-12 mx-auto mb-4" />
                  <p className="text-2xl font-bold">
                    Outstanding Performance! 🎉
                  </p>
                </div>
              ) : percentage >= 60 ? (
                <div>
                  <Award className="w-12 h-12 mx-auto mb-4 text-[#1d0042]" />
                  <p className="text-2xl font-bold text-[#1d0042]">
                    Great Effort! 👏
                  </p>
                </div>
              ) : (
                <div>
                  <Target className="w-12 h-12 mx-auto mb-4" />
                  <p className="text-2xl font-bold">Keep Learning! 💪</p>
                </div>
              )}
            </div>
          </div>

          <button
            onClick={resetQuiz}
            className={`${colors.secondary} hover:bg-[#351066] font-bold py-5 px-12 rounded-2xl text-xl transition-all duration-300 transform hover:scale-110 shadow-xl flex items-center gap-4 mx-auto group`}
          >
            <RotateCcw className="w-8 h-8 group-hover:animate-spin" />
            Take Quiz Again
          </button>
        </div>
      </div>
    );
  }

  if (!currentQuestionData) return null;

  return (
    <div
      className={`min-h-screen ${colors.background} p-4 relative overflow-hidden`}
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute top-20 left-20 w-32 h-32 bg-[#1d0042] rounded-full animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-24 h-24 bg-[#400c7c] rounded-full animate-bounce"></div>
        <div className="absolute top-1/2 left-10 w-16 h-16 bg-[#ffc33e] rounded-full animate-ping"></div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Enhanced Header */}
        <div className="bg-white rounded-3xl shadow-xl p-8 mb-8 border border-gray-100 backdrop-blur-sm">
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center space-x-6">
              <div
                className={`w-16 h-16 ${colors.accent} rounded-2xl flex items-center justify-center shadow-lg`}
              >
                <Trophy className="w-8 h-8 text-[#1d0042]" />
              </div>
              <div>
                <h1 className={`text-4xl font-bold ${colors.primaryText} mb-2`}>
                  {originalQuizData.name}
                </h1>
                <p className={`${colors.tertiaryText} text-xl`}>
                  Question {currentQuestion + 1} of {randomizedQuestions.length}
                </p>
              </div>
            </div>

            <div className="text-right">
              <div className="flex items-center gap-4 mb-4">
                <div className={`${timeLeft <= 5 ? "animate-pulse" : ""}`}>
                  <Clock
                    className={`w-10 h-10 ${
                      timeLeft <= 5 ? "text-red-500" : colors.accentText
                    }`}
                  />
                </div>
                <div
                  className={`text-6xl font-bold ${
                    timeLeft <= 5
                      ? "text-red-500 animate-bounce"
                      : colors.secondaryText
                  }`}
                >
                  {timeLeft}
                </div>
              </div>
              <div
                className={`${colors.accent} rounded-xl px-6 py-3 shadow-lg`}
              >
                <p className="text-xl font-bold">
                  Score: {score}/{currentQuestion + (showResult ? 1 : 0)}
                </p>
              </div>
            </div>
          </div>

          {/* Enhanced Progress Bar */}
          <div className="relative">
            <div className="bg-gray-200 rounded-full h-6 shadow-inner">
              <div
                className={`${colors.secondary} h-6 rounded-full transition-all duration-700 relative overflow-hidden`}
                style={{
                  width: `${
                    ((currentQuestion + (showResult ? 1 : 0)) /
                      randomizedQuestions.length) *
                    100
                  }%`,
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30 animate-pulse"></div>
              </div>
            </div>
            <div className="flex justify-between mt-3">
              <p className={`${colors.tertiaryText} font-medium`}>
                Progress:{" "}
                {Math.round(
                  ((currentQuestion + (showResult ? 1 : 0)) /
                    randomizedQuestions.length) *
                    100
                )}
                %
              </p>
              <p className={`${colors.secondaryText} font-bold`}>
                {questionPhase === "question"
                  ? "Reading Question..."
                  : "Choose Answer"}
              </p>
            </div>
          </div>
        </div>

        {/* Enhanced Question Card */}
        <div className="bg-white rounded-3xl shadow-xl p-12 border border-gray-100 backdrop-blur-sm">
          <div className="mb-12">
            <div
              className={`${colors.primary} rounded-3xl p-8 mb-10 shadow-lg transform hover:scale-105 transition-all duration-300`}
            >
              <h2 className="text-3xl font-bold text-center leading-relaxed">
                {currentQuestionData.question}
              </h2>
            </div>

            {questionPhase === "question" && !showOptions && (
              <div className="text-center py-20">
                <div className="animate-pulse">
                  <div
                    className={`w-32 h-32 ${colors.accent} rounded-full flex items-center justify-center mx-auto mb-8 shadow-xl`}
                  >
                    <Timer className="w-16 h-16 text-[#1d0042] animate-spin" />
                  </div>
                  <div
                    className={`${colors.secondary} rounded-3xl p-8 max-w-lg mx-auto shadow-lg`}
                  >
                    <p className="text-2xl font-bold mb-2">Get Ready!</p>
                    <p className="text-xl">Options in {timeLeft} seconds...</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Enhanced Options */}
          {showOptions && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {currentQuestionData.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(index)}
                  disabled={showResult}
                  className={`p-8 rounded-3xl border-3 text-left font-bold text-xl transition-all duration-300 ${getOptionStyle(
                    index
                  )} ${
                    showResult
                      ? "cursor-default"
                      : "cursor-pointer hover:shadow-2xl active:scale-95"
                  } relative overflow-hidden group`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <span className="font-black text-2xl mr-4 inline-block w-10 h-10 rounded-full bg-current bg-opacity-20 flex items-center justify-center">
                        {String.fromCharCode(65 + index)}
                      </span>
                      <span className="flex-1">{option}</span>
                    </div>
                    <div className="ml-4">{getOptionIcon(index)}</div>
                  </div>

                  {!showResult && (
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20 transition-opacity duration-300 transform -skew-x-12"></div>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuizApp;
