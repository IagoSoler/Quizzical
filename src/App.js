import React, { useState, useEffect } from "react";
import "./App.css";
import { Question } from "./components/Question";
import { StartMenu } from "./components/StartMenu";
import questions from "./data";

function App() {
  const [data, setData] = useState([]);
  const [quizStarted, setQuizStarted] = useState(false);
  
  return (
    <div className="quizzical">
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
