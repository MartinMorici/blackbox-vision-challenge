import { useEffect, useState } from 'react';
import './App.scss';
import Answers from './components/Answers';


export interface Question {
  category: string;
  type: 'boolean' | 'multiple';
  difficulty: 'medium' | 'hard' | 'easy';
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}

function App() {
  const [questions, setQuestions] = useState<Question[]>();
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [showResults, setShowResults] = useState<boolean>(false)
  const [points, setPoints] = useState<number>(0)
  const [totalPoints, setTotalPoints] = useState(0)

  
  const getQuestions = async () => {
    const res = await fetch('https://opentdb.com/api.php?amount=10');
    const { results } = await res.json();
    setQuestions(results);
    console.log(results);
    
  };
  
  useEffect(() => {
    getQuestions();
  }, []);
  
  
  if(!questions){
    return <div>Loading...</div>
  }
  
  const question = questions[currentQuestion]
  
  
  if(showResults){
    return <main className='App'>
      <div className="container">
        <div className="question">
          <h1 className='score'>Your score was {points} out of {totalPoints}</h1>
        </div>
      </div>
    </main>
  }

  return (
    <main className='App'>
      <section className='container'>
        <article className='question'>
          <header>
            <div className='question-info'>
              <span className='question-number'>
                Question {currentQuestion+1} / {questions?.length}
              </span>
              <span className='question-category'>{question.category}</span>
            </div>
            <h1 className='question-text' dangerouslySetInnerHTML={{__html: question.question}}></h1>
          </header>
          
          <Answers type={question.type} correctAnswer={question.correct_answer} incorrectAnswers={question.incorrect_answers} setPoints={setPoints} currentQuestion={currentQuestion} setCurrentQuestion={setCurrentQuestion} points={points} setShowResults={setShowResults} totalPoints={totalPoints} setTotalPoints={setTotalPoints}/>
          
        </article>
      </section>
    </main>
  );
}

export default App;
