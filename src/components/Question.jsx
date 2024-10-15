import React, { useMemo, useCallback } from 'react';


export const Question = (props) => {
  const [submitted,setSubmitted] = React.useState(false)

  const questions = props.data.map((element, questionIndex) => {
    return (
      <div key={questionIndex} className='questions'>
        <h3 dangerouslySetInnerHTML={{ __html: element.question }} />
        {element.answers.map((answer, answerIndex) => (
          <button
            className={`answer--button ${answer === element.selectedAnswer ? "selected" : ""}`}
            onClick={() => selectAnswer(element.question, answer)}
            id={[element.question, answer]} key={[questionIndex, answerIndex]}>
            {answer}</button>
        ))}
      </div>
    )
  })
  function selectAnswer(question, answer) {
    if(submitted) {return}
    props.setData(prevData => prevData.map(item =>
      item.question === question
        ? { ...item, selectedAnswer: answer }
        : item
    ));
  }
  function submitAnswers() {
    setSubmitted(true);
    props.data.map(element => {
      document.getElementById([element.question, element.correctAnswer]).classList.add("correct")
      if (element.selectedAnswer && element.selectedAnswer !== element.correctAnswer) {
        document.getElementById([element.question, element.selectedAnswer]).classList.add("incorrect")
      }

    });
  }


  return (
    <div>{questions}
     {!submitted && <button id="submitButton" onClick={submitAnswers} className='submit--button answer--button' >Submit</button>}
      {submitted && <button id="restartButton" onClick = {()=>props.setQuizStarted(false)}   className='submit--button answer--button'>Restart</button>}
    </div>

  )
}
