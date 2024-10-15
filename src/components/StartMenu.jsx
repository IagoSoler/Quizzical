import React from 'react'

export const StartMenu = (props) => {
    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]]; // Intercambiar elementos
        }
        return array;
    }
    const handleStartClick = () => {
        props.setQuizStarted(prevQuizStarted => !prevQuizStarted)
        props.setData(props.data.map(question => ({
            ...question, answers: shuffle(question.answers)
        })))

    }
    return (
        <div className='startmenu'>
            <h1>Quizzical</h1>
            <button className='submit--button answer--button' onClick={handleStartClick}>Start Quiz</button>
        </div>
    )
}
