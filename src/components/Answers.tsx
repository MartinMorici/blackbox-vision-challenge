import React, { useEffect, useState } from 'react';
import './Answers.scss';

interface Props {
  type: 'boolean' | 'multiple';
  correctAnswer: string;
  incorrectAnswers: string[];
  currentQuestion: number;
  points: number;
  totalPoints: number;
  setCurrentQuestion: (value: number) => void;
  setPoints: (value: number) => void;
  setTotalPoints: (value: number) => void;
  setShowResults: (value: boolean) => void;
}
const Answers = ({ type, correctAnswer, incorrectAnswers, setCurrentQuestion, setPoints, points, currentQuestion, setShowResults, totalPoints, setTotalPoints }: Props) => {
  const [isCorrect, setIsCorrect] = useState<boolean>();
  const [isWrong, setIsWrong] = useState<boolean>();
  const shuffleArray = (array: string[]) => {
    array.sort(() => Math.random() - 0.5);
  };

  const handleAnswer = (answer: string) => {
    if(type === 'multiple'){
      setTotalPoints(totalPoints + 10)
    }
    if(type === 'boolean'){
      setTotalPoints(totalPoints + 5)
    }

    if (answer.trim() === correctAnswer.trim()) {
      setIsCorrect(true);
      if (type === 'boolean') {
        setPoints(points + 5);
      }
      if (type === 'multiple') {
        setPoints(points + 10);
      }
    } else {
      setIsWrong(true);
    }
  };

  const handleNext = () => {
    setCurrentQuestion(currentQuestion + 1);
    setIsCorrect(false);
    setIsWrong(false);
  };

  const respuestas = [correctAnswer, ...incorrectAnswers];
  shuffleArray(respuestas);

  return (
    <>
      <main>
        {type === 'multiple' ? (
          <div className='respuestas'>
            {respuestas.map((resp, index) => {
              return (
                <div className={`resp ${(isCorrect || isWrong) && 'disable'}`} key={index} onClick={() => {handleAnswer(resp);}} dangerouslySetInnerHTML={{__html: resp}}>
                </div>
              );
            })}
          </div>
        ) : (
          <div className='respuestas'>
            <div className={`resp ${(isCorrect || isWrong) && 'disable'}`} onClick={() => handleAnswer('True')}>
              True
            </div>
            <div className={`resp ${(isCorrect || isWrong) && 'disable'}`} onClick={() => handleAnswer('False')}>
              False
            </div>
          </div>
        )}
      </main>

      {isCorrect && (
        <div className='answer'>
          <h2 className='correct'>Correct answer!</h2>
          {currentQuestion !== 9 && (
            <button className='btn' onClick={() => { handleNext()}} >
              Next Question
            </button>
          )}
        </div>
      )}
      {isWrong && (
        <div className='answer'>
          <h2 className='wrong'>Wrong answer</h2>
          <h3>The right answer was:</h3>
          <h3 className='correctAnswer'>{correctAnswer}</h3>
          {currentQuestion !== 9 && (
            <button className='btn' onClick={() => { handleNext()}}>
              Next Question
            </button>
          )}
        </div>
      )}
      {
        currentQuestion === 9 && (isWrong || isCorrect) && <button className='btn' onClick={() => {setShowResults(true)}}>See Results</button>
      }
    </>
  );
};

export default Answers;
