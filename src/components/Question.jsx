import React from 'react';


export const Question = (props) => {
  const [submitted, setSubmitted] = React.useState(false)

  const questions = props.data.map((element, questionIndex) => {
    return (
      <div key={questionIndex} className='quizzical--questions'>
        <h3 dangerouslySetInnerHTML={{ __html: element.question }} />
        {element.answers.map((answer, answerIndex) => (
          <button
            className={`quizzical--answer__button ${answer === element.selectedAnswer ? "quizzical--selected__option" : ""}`}
            onClick={() => selectAnswer(element.question, answer)}
            id={[element.question, answer]} 
            key={[questionIndex, answerIndex]}
            dangerouslySetInnerHTML={{ __html: answer }}>
            </button>
        ))}
      </div>
    )
  })
  function selectAnswer(question, answer) {
    if (submitted) { return }
    props.setData(prevData => prevData.map(item =>
      item.question === question
        ? { ...item, selectedAnswer: answer }
        : item
    ));
  }
  function submitAnswers() {
    setSubmitted(true);
    props.data.forEach(element => {
      document.getElementById([element.question, element.correctAnswer]).classList.add("quizzical--correct__blank__option")
      if (element.selectedAnswer && element.selectedAnswer === element.correctAnswer) {
        document.getElementById([element.question, element.selectedAnswer]).classList.add("quizzical--correct__option")
      }
      if (element.selectedAnswer && element.selectedAnswer !== element.correctAnswer) {
        document.getElementById([element.question, element.selectedAnswer]).classList.add("quizzical--incorrect__option")
      }

    });
  }


  return (
    <div>{questions}
      {!submitted && <button id="submitButton" onClick={submitAnswers}
        className='quizzical--submit__button quizzical--answer__button' >Submit</button>}
      {submitted && <button id="restartButton" onClick={() => props.setQuizStarted(false)}
        className='quizzical--submit__button quizzical--answer__button'>Play Again!</button>}
    </div>

  )
}
