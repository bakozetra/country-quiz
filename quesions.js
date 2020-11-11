import React, { useEffect, useState } from 'react'
function Question() {
  const questions = [
    {
      question: "Kabul is capital of ",
      answers: [
        { answerText: "Åland Islands", isCorrect: false },
        { answerText: "Afghanistan", isCorrect: true },
        { answerText: " Albania", isCorrect: false },
        { answerText: "Austria", isCorrect: false },
      ],
    },
    {
      question: "Mariehamn is capital of  ",
      answers: [
        { answerText: "Åland Islands ", isCorrect: true },
        { answerText: "Andorra", isCorrect: false },
        { answerText: "Angola", isCorrect: false },
        { answerText: "Anguilla", isCorrect: false },
      ]
    },
    {
      question: "Andorra la Vella is capital of ",
      answers: [
        { answerText: " Andorra", isCorrect: true },
        { answerText: "Anguilla ", isCorrect: false },
        { answerText: "Argentina", isCorrect: false },
        { answerText: "Armenia ", isCorrect: false },
      ]
    },
    {
      question: "Vienna is capital of ",
      answers: [
        { answerText: "Austria ", isCorrect: true },
        { answerText: "Azerbaijan", isCorrect: false },
        { answerText: "Bahamas", isCorrect: false },
        { answerText: "Bahamas ", isCorrect: false },
      ]
    },
    {
      question: " Manama is capital of ",
      answers: [
        { answerText: " Bahrain", isCorrect: true },
        { answerText: " Bangladesh", isCorrect: false },
        { answerText: " American Samoa", isCorrect: false },
        { answerText: "Argentina", isCorrect: false },
      ]
    }
  ]
  console.log(questions);
 const [currentText , setCurrentText] = useState(0);
 const handleClick = () => {
   const nextText = currentText + 1;
   setCurrentText(nextText);
 }

  return (
    <div>
      {false ? <div>{questions[0]}</div> :
        <>
          <div>
            <p>{questions[currentText].question}</p>
          </div>
          <div className="answers">
            {questions[currentText].answers.map(answer => {
              return <button>{answer.answerText}</button>
            })}
           
          </div>
          <button onClick = {handleClick}>text</button>
        </>} 
    </div>
  )
}
export default Question