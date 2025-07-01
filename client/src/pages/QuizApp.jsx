import React, { useState, useEffect, useRef, useCallback } from "react";
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
  HelpCircle,
  BarChart2,
} from "lucide-react";
import confetti from "canvas-confetti";
import correctAnswerSound from "../sounds/correctAnswer.mp3";
import wrongAnswerSound from "../sounds/wrongAnswer.mp3";
import timer from '../sounds/timer.mp3';
import quizEnd from '../sounds/quizEnd.mp3'
// --- Audio Functions ---

const createAudioContext = () => {
  const AudioContext = window.AudioContext || window.webkitAudioContext;
  return new AudioContext();
};

const playTone = (type) => {
  try {
    const audioContext = createAudioContext();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.type = "sine";
    gainNode.gain.value = 0.2;

    // Set frequency and duration based on sound type
    switch (type) {
      case "correct":
        oscillator.frequency.value = 880; // A5
        break;
      case "wrong":
        oscillator.frequency.value = 220; // A3
        break;
      case "alert":
        oscillator.frequency.value = 660; // E5
        break;
      case "timeup":
        oscillator.frequency.value = 440; // A4
        break;
      default:
        oscillator.frequency.value = 440; // Default to A4
    }

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    // Start the oscillator
    oscillator.start();

    // Stop the oscillator after a short duration
    oscillator.stop(audioContext.currentTime + 0.3);

    // Resume audio context if it was suspended
    if (audioContext.state === "suspended") {
      audioContext
        .resume()
        .catch((e) => console.error("AudioContext resume failed:", e));
    }

    return true;
  } catch (error) {
    console.error("Error playing sound:", error);
    return false;
  }
};

const shuffleArray = (array) => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

// --- UI Components ---

const WelcomeScreen = ({ onStartQuiz }) => (
  <div className="text-center p-8 text-white">
    <Trophy className="mx-auto h-20 w-20 text-yellow-400 mb-6 animate-bounce" />
    <h1 className="text-5xl md:text-6xl font-bold mb-4 drop-shadow-lg">
      Advanced Knowledge Quiz
    </h1>
    <p className="text-lg text-white/80 mb-8">
      Test your knowledge and challenge yourself!
    </p>

    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8 max-w-3xl mx-auto">
      <InfoCard icon={<Target size={28} />} title="Questions" value="10" />
      <InfoCard icon={<Award size={28} />} title="Total Marks" value="10" />
      <InfoCard icon={<Clock size={28} />} title="Per Question" value="30s" />
    </div>

    <div className="bg-white/10 rounded-lg p-6 max-w-2xl mx-auto mb-10 text-left">
      <h2 className="text-xl font-bold mb-4 flex items-center">
        <HelpCircle className="mr-3 text-yellow-400" />
        Quiz Instructions
      </h2>
      <ul className="list-disc list-inside text-white/80 space-y-2">
        <li>Each question has a 30-second time limit.</li>
        <li>You get 5 seconds to read the question before options appear.</li>
        <li>An alert sound will play in the last 5 seconds.</li>
        <li>The questions will appear in a random order.</li>
      </ul>
    </div>

    <button
      onClick={onStartQuiz}
      className="flex items-center justify-center w-full sm:w-auto mx-auto px-10 py-4 bg-yellow-400 text-gray-900 font-bold text-xl rounded-lg shadow-lg hover:bg-yellow-500 transition-all duration-300 transform hover:scale-105"
    >
      <Play className="mr-3" />
      Start Quiz
    </button>
  </div>
);

const InfoCard = ({ icon, title, value }) => (
  <div className="bg-white/10 p-4 rounded-lg shadow-md flex flex-col items-center justify-center transition-all duration-300 transform hover:scale-105 hover:bg-white/25">
    <div className="mb-2 text-yellow-400">{icon}</div>
    <p className="text-sm font-semibold text-white/80">{title}</p>
    <p className="text-3xl font-bold">{value}</p>
  </div>
);

const ResultScreen = ({ score, totalQuestions, onResetQuiz }) => (
  <div className="text-center p-8 text-white">
    <Award className="mx-auto h-20 w-20 text-yellow-400 mb-6" />
    <h1 className="text-4xl md:text-5xl font-bold mb-2">Quiz Completed!</h1>
    <p className="text-lg text-white/80 mb-8">Here's how you performed.</p>

    <div className="bg-white/10 rounded-lg p-8 max-w-sm mx-auto mb-10">
      <p className="text-white/80 text-lg mb-2">Your Score</p>
      <div className="flex items-center justify-center text-6xl font-bold">
        <BarChart2 size={48} className="mr-4 text-yellow-400" />
        {score} / {totalQuestions}
      </div>
    </div>

    <button
      onClick={onResetQuiz}
      className="flex items-center justify-center w-full sm:w-auto mx-auto px-10 py-4 bg-accent text-primary font-bold text-xl rounded-lg shadow-lg hover:bg-tertiary hover:text-accent transition-all transform hover:scale-105"
    >
      <RotateCcw className="mr-3" />
      Play Again
    </button>
  </div>
);

const QuizHeader = ({ current, total, timeLeft }) => (
  <div className="p-4 mb-4">
    <div className="flex justify-between items-center text-white/80 font-semibold mb-2">
      <p>
        Question {current + 1} / {total}
      </p>
      <div className="flex items-center">
        <Clock
          size={18}
          className={`mr-2 ${timeLeft <= 5 ? "text-red-400" : ""}`}
        />
        <span>{timeLeft}s</span>
      </div>
    </div>
    <div className="w-full bg-white/20 rounded-full h-2.5">
      <div
        className={`h-2.5 rounded-full transition-all duration-500 ${
          timeLeft <= 5 ? "bg-red-500 animate-pulse" : "bg-green-400"
        }`}
        style={{ width: `${(timeLeft / 30) * 100}%` }}
      ></div>
    </div>
  </div>
);

const QuizScreen = ({
  questionData,
  onAnswerSelect,
  onNextQuestion,
  timeLeft,
  phase,
  currentQuestionIndex,
  totalQuestions,
  showResult,
  getOptionStyle,
  getOptionIcon,
}) => {
  if (!questionData)
    return (
      <div className="text-center p-8 text-white">Loading question...</div>
    );

  return (
    <div className="p-4 md:p-6 max-w-3xl mx-auto">
      <QuizHeader
        current={currentQuestionIndex}
        total={totalQuestions}
        timeLeft={timeLeft}
      />

      <div className="bg-white/10 p-6 rounded-lg my-6 min-h-[120px] flex items-center justify-center">
        <h2 className="text-2xl md:text-3xl font-bold text-white text-center leading-tight">
          {questionData.question}
        </h2>
      </div>

      {phase === "question" && !showResult && (
        <div className="text-center py-10">
          <div className="animate-pulse flex flex-col items-center text-white">
            <Timer className="w-12 h-12 text-yellow-400 mb-4" />
            <p className="text-lg font-semibold">Get Ready!</p>
            <p className="text-md text-white/80">
              Options will appear in {timeLeft} seconds...
            </p>
          </div>
        </div>
      )}

      {phase === "options" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {questionData.options.map((option, index) => (
            <button
              key={index}
              onClick={() => onAnswerSelect(index)}
              disabled={showResult}
              className={`p-4 rounded-lg border-2 text-left font-semibold text-lg transition-all duration-300 ${getOptionStyle(
                index
              )} ${
                showResult
                  ? "cursor-not-allowed"
                  : "cursor-pointer transform hover:scale-105"
              }`}
            >
              <div className="flex items-center">
                <span className="font-bold text-lg mr-4 flex items-center justify-center w-8 h-8 rounded-md bg-black/20">
                  {String.fromCharCode(65 + index)}
                </span>
                <span className="flex-1">{option}</span>
                <div className="ml-4 w-6 h-6">{getOptionIcon(index)}</div>
              </div>
            </button>
          ))}
        </div>
      )}

      {showResult && (
        <div className="text-center mt-8 text-white/80">
          <p>Next question in a moment...</p>
        </div>
      )}
    </div>
  );
};

// --- Main App Component ---

const QuizApp = () => {
  const [gameState, setGameState] = useState("welcome");
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [phase, setPhase] = useState("question");
  const [timeLeft, setTimeLeft] = useState(5);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
 const correctSoundRef = useRef(new Audio(correctAnswerSound));
 const wrongSoundRef = useRef(new Audio(wrongAnswerSound));
 const alertSoundRef = useRef(new Audio(timer));
 const endSoundRef=useRef(new Audio(quizEnd))
  // const correctSoundRef = useRef(null);
  // const wrongSoundRef = useRef(null);
  const timeUpSoundRef = useRef(null);

  const originalQuizData = {
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
      { question: "What is 2 + 2?", options: ["3", "4", "5", "6"], correct: 1 },
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
          "J.K. Rowling",
          "Jane Austen",
        ],
        correct: 1,
      },
      {
        question: "What is the chemical symbol for gold?",
        options: ["Ag", "Au", "G", "Go"],
        correct: 1,
      },
      {
        question: "How many continents are there?",
        options: ["5", "6", "7", "8"],
        correct: 2,
      },
    ],
  };

  useEffect(() => {
    // Initialize audio context on first user interaction
    const initAudio = () => {
      try {
        const audioContext = createAudioContext();
        // Just creating the context is enough to warm it up
        if (audioContext.state === "suspended") {
          document.addEventListener(
            "click",
            () => {
              audioContext
                .resume()
                .catch((e) => console.error("AudioContext resume failed:", e));
            },
            { once: true }
          );
        }
      } catch (e) {
        console.error("Audio initialization failed:", e);
      }
    };

    // Initialize audio on first user interaction
    const initOnInteraction = () => {
      document.removeEventListener("click", initOnInteraction);
      document.removeEventListener("keydown", initOnInteraction);
      initAudio();
    };

    document.addEventListener("click", initOnInteraction, { once: true });
    document.addEventListener("keydown", initOnInteraction, { once: true });
  }, []);

  useEffect(() => {
    if (gameState !== "playing" || showResult) return;

    if (timeLeft === 0) {
      if (phase === "question") {
        setPhase("options");
        setTimeLeft(30);
      } else {
        handleTimeout();
      }
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        const newTime = prev - 1;
        if (phase === "options" && newTime <= 5 && newTime > 0) {
          playAudio("alert");
        }
        return newTime;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [gameState, timeLeft, phase, showResult]);

  useEffect(() => {
    if (showResult) {
      const timer = setTimeout(() => {
        nextQuestion();
      }, 2000); // Auto-advance after 2 seconds

      return () => clearTimeout(timer);
    }
  }, [showResult]);

  const randomizeQuiz = useCallback(() => {
    const shuffledQuestions = shuffleArray(originalQuizData.questions).map(
      (q) => {
        const originalQuestion = originalQuizData.questions.find(
          (oq) => oq.question === q.question
        );
        const correctOptionValue =
          originalQuestion.options[originalQuestion.correct];
        const shuffledOptions = shuffleArray(q.options);
        const newCorrectIndex = shuffledOptions.findIndex(
          (opt) => opt === correctOptionValue
        );
        return { ...q, options: shuffledOptions, correct: newCorrectIndex };
      }
    );
    setQuestions(shuffledQuestions);
  }, [originalQuizData.questions]);

  const startQuiz = () => {
    randomizeQuiz();
    setCurrentQuestionIndex(0);
    setScore(0);
    setGameState("playing");
    setPhase("question");
    setTimeLeft(5);
    setShowResult(false);
    setSelectedAnswer(null);
  };
const playAudio = (type) => {
  try {
    if (type === "correct" && correctSoundRef.current) {
      correctSoundRef.current.currentTime = 0;
      correctSoundRef.current.play().catch((e) => console.warn("Playback failed:", e));
      return;
    }
     if (type === "wrong" && wrongSoundRef.current) {
      wrongSoundRef.current.currentTime = 0;
      wrongSoundRef.current.play().catch((e) => console.warn("Wrong sound failed:", e));
      return;
    }
     if (type === "alert" && alertSoundRef.current) {
      alertSoundRef.current.currentTime = 0;
      alertSoundRef.current.play().catch((e) => console.warn("Wrong sound failed:", e));
      return;
    }

    // fallback oscillator for other sounds
    const played = playTone(type);
    if (!played) {
      console.warn(`Could not play ${type} sound`);
    }
  } catch (error) {
    console.error("Error playing audio:", error);
  }
};


  const handleTimeout = () => {
    playAudio("timeup");
    setShowResult(true);
  };

  const handleAnswerSelect = (answerIndex) => {
    if (showResult) return;

    setSelectedAnswer(answerIndex);
    setShowResult(true);

    if (answerIndex === questions[currentQuestionIndex].correct) {
      setScore((prev) => prev + 1);
      playAudio("correct");
    } else {
      playAudio("wrong");
    }
  };

  const nextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setPhase("question");
      setTimeLeft(5);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      setGameState("finished");
    }
  };

  const resetQuiz = () => setGameState("welcome");

  const getOptionStyle = (optionIndex) => {
    if (!showResult) {
      return "bg-white/10 border-transparent text-white hover:bg-white/20";
    }

    const currentQuestion = questions[currentQuestionIndex];
    const isCorrect = optionIndex === currentQuestion.correct;
    const isSelected = optionIndex === selectedAnswer;

    if (isCorrect) {
      return "bg-green-500 border-green-400 text-white font-bold scale-105";
    }
    if (isSelected && !isCorrect) {
      return "bg-red-500 border-red-400 text-white font-bold scale-105";
    }
    return "bg-white/10 border-transparent text-white/50 opacity-70";
  };

  const getOptionIcon = (optionIndex) => {
    if (!showResult) return null;
    const isCorrect = optionIndex === questions[currentQuestionIndex].correct;
    if (isCorrect) return <CheckCircle />;
    if (optionIndex === selectedAnswer) return <XCircle />;
    return null;
  };
const fireConfetti = useCallback(() => {
  const duration = 2 * 1000;
  const animationEnd = Date.now() + duration;
  const defaults = {
    startVelocity: 30,
    spread: 360,
    ticks: 60,
    zIndex: 1000,
    colors: ["#FFC33E", "#FBFBFB", "#400C7C", "#1D0042", "#4F4F4F"], // Deep Purple & Gold palette
  };
 if (endSoundRef.current) {
    endSoundRef.current.currentTime = 0;
    endSoundRef.current.play().catch((e) => console.error("Error playing quiz end sound:", e));
  }
  const interval = setInterval(() => {
    const timeLeft = animationEnd - Date.now();

    if (timeLeft <= 0) {
      return clearInterval(interval);
    }

    const particleCount = 50 * (timeLeft / duration);

    // Left side
    confetti({
      ...defaults,
      particleCount,
      origin: { x: 0, y: 0.6 },
    });

    // Right side
    confetti({
      ...defaults,
      particleCount,
      origin: { x: 1, y: 0.6 },
    });
  }, 250);
}, []);
useEffect(() => {
  if (gameState === "finished") {
    fireConfetti();
  }
}, [gameState, fireConfetti]);

  const renderGameState = () => {
    switch (gameState) {
      case "playing":
        return (
          <QuizScreen
            questionData={questions[currentQuestionIndex]}
            onAnswerSelect={handleAnswerSelect}
            onNextQuestion={nextQuestion}
            timeLeft={timeLeft}
            phase={phase}
            currentQuestionIndex={currentQuestionIndex}
            totalQuestions={questions.length}
            showResult={showResult}
            getOptionStyle={getOptionStyle}
            getOptionIcon={getOptionIcon}
          />
        );
      case "finished":
        return (
          <ResultScreen
            score={score}
            totalQuestions={questions.length}
            onResetQuiz={resetQuiz}
          />
        );
      case "welcome":
      default:
        return <WelcomeScreen onStartQuiz={startQuiz} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900 flex items-center justify-center font-sans p-4">
      <div className="w-full max-w-3xl mx-auto bg-black/20 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/10">
        {renderGameState()}
        <audio ref={endSoundRef} src={quizEnd} preload="auto" />

      </div>
    </div>
  );
};

export default QuizApp;











