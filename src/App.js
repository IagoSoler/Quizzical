import React, { useState, useEffect } from "react";
import "./App.css";
import { Question } from "./components/Question";
import { StartMenu } from "./components/StartMenu";
import questions from "./data";

function App() {
  const [data, setData] = useState([]);
  const [quizStarted, setQuizStarted] = useState(false);


  useEffect(() => {
    if (!quizStarted) { // Solo ejecuta el efecto si quizStarted es false
      console.log("buscando");
      fetch("https://opentdb.com/api.php?amount=10&category=23")
        .then((response) => response.json())
        .then((data) => {
          setData(
            data.results.map((result) => ({
              question: result.question,
              correctAnswer: result.correct_answer,
              answers: [...result.incorrect_answers, result.correct_answer],
              selectedAnswer: ""
            }))
          );
        })
        .catch((error) => console.error("Error fetching data:", error));
    }
  }, [quizStarted]); // Mantiene quizStarted como dependencia
  //////////////////////////

  //////////////////////////
  return (
    <div className="App">
      {quizStarted ? (
        <Question 
        data={data}
        setQuizStarted={setQuizStarted}
        setData={setData} />
      ) : (
        <StartMenu
          setQuizStarted={setQuizStarted}
          data={data}
          setData={setData}
        />
      )}
    </div>
  );
}

export default App;
