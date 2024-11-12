import React, { useState } from 'react';
import { Loader2 } from 'lucide-react';

export const StartMenu = ({ data, setData, setQuizStarted }) => {
    const [apiCall, setApiCall] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    const handleStartClick = () => {
        setIsLoading(true);

        fetch(apiCall)
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

                setQuizStarted(prevQuizStarted => !prevQuizStarted);
                setData(prevData => prevData.map(question => ({
                    ...question,
                    answers: shuffle(question.answers)
                })));
            })
            .catch((error) => {
                console.error("Error fetching data:", error);

            })
            .finally(() => {
                setIsLoading(false);
            });
    }

    return (
        <>
        <div className='quizzical--startmenu'>
            <h1 >Quizzical</h1>
            <span >Select a topic:</span>
            <select className='quizzical--startmenu--selector'
                onChange={(e) => setApiCall(e.target.value)}
                disabled={isLoading}
            >
                <option value="">Choose a category</option>
                <option value="https://opentdb.com/api.php?amount=10">All</option>
                <option value="https://opentdb.com/api.php?amount=10&category=23">History</option>
                <option value="https://opentdb.com/api.php?amount=10&category=20">Mythology</option>
                <option value="https://opentdb.com/api.php?amount=10&category=24">Politics</option>
                <option value="https://opentdb.com/api.php?amount=10&category=17">Science & Nature</option>
            </select>
            <button
                className='quizzical--submit__button quizzical--answer__button' 
                onClick={handleStartClick}
                disabled={apiCall === "" || isLoading}
                >
                {isLoading ? (
                    <>
                        <Loader2 className="animate-spin mr-2" size={20} />
                        Loading...
                    </>
                ) : (
                    'Start Quiz'
                )}
            </button>
            
        </div>
        <footer>Powered by <a href="https://opentdb.com/" target="_blank" rel="noreferrer" >https://opentdb.com/</a></footer>
        </>
    );
}

export default StartMenu;