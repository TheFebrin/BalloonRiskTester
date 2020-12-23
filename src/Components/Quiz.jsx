import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import "./Quiz.css";
import { Button } from "@material-ui/core";
import dictionary from "../dictionary.json";

const getQuestions = (language) => {
  const questions = [
    {
      questionText: dictionary[language].question1,
      answerOptions: [
        { answerText: dictionary[language].answers1[0], isCorrect: false },
        { answerText: dictionary[language].answers1[1], isCorrect: false },
        { answerText: dictionary[language].answers1[2], isCorrect: true },
        { answerText: dictionary[language].answers1[3], isCorrect: false },
      ],
    },
  ];

  return questions;
};

export default function Quiz({ nextPagePath, language }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const [score, setScore] = useState(0);

  const questions = getQuestions(language);

  if (redirect) {
    return <Redirect to={nextPagePath} />;
  }
  const handleAnswerOptionClick = (isCorrect) => {
    if (isCorrect) {
      setScore(score + 1);
    }

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowScore(true);
    }
  };

  return (
    <div className="quiz">
      <div className="app">
        {showScore ? (
          <div className="score-section">
            {dictionary[language].youScored}
            <Button
              onClick={() => setRedirect(true)}
              variant="contained"
              color="primary"
              id="confirmbutton"
            >
            OK
            </Button>
          </div>
        ) : (
          <>
            <div className="question-section">
              <div className="question-count">
                <span>{currentQuestion + 1}</span>/{questions.length}
              </div>
              <div className="question-text">
                {questions[currentQuestion].questionText}
              </div>
            </div>
            <div className="answer-section">
              {questions[currentQuestion].answerOptions.map((answerOption) => (
                <Button
                  onClick={() =>
                    handleAnswerOptionClick(answerOption.isCorrect)
                  }
                  variant="contained"
                  color="primary"
                >
                  {answerOption.answerText}
                </Button>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
