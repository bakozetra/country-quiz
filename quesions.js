import React, { useEffect, useState } from 'react'
function Question() {

  var allQuestion = [
    {
      question: "Kabul is capital of ",
      answers: ["Åland Islands", "Afghanistan", " Albania", "Austria"],
      correct: "Afghanistan",
      questionId: "099099"
    },

    {
      question: "Mariehamn is capital of  ",
      answers: ["Åland Islands ", "Andorra", "Angola", "Anguilla"],
      correct: "Åland Islands",
      answered: false,
      questionId: Date.now,
    },
    {
      question: "Andorra la Vella is capital of ",
      answers: [" Andorra", "Anguilla ", "Argentina", "Armenia "],
      correct: "Andorra",
      answered: false,
      questionId: Date.now,
    },
    {
      question: "Vienna is capital of ",
      answers: ["Austria ", "Azerbaijan", "Bahamas", "Bahamas "],
      correct: "Austria",
      answered: false,
      questionId: Date.now,
    },
    {
      question: " Manama is capital of ",
      answers: [" Bahrain", " Bangladesh", " American Samoa", "Argentina"],
      correct: "Bahrain",
      answered: false,
      questionId: Date.now,
    },
  ]

  let [Quiz, setQuiz] = useState([]);

  function handleClick(index) {
    const generateRandom = Math.floor(Math.random() * allQuestion.length)
    console.log(generateRandom);
    var allQuestionGenerate = allQuestion[generateRandom];
    console.log(allQuestionGenerate)
    return setQuiz({...allQuestionGenerate });
  }
  // function addPlayer(index) {
  //   setQuiz(prevTeams => {
  //     return [ ...prevTeams.slice(0, index), {...prevTeams[index], answers: [...prevTeams[index].answers, "c"] }, ...prevTeams.slice(index+1)];
  //   });
  // }
  useEffect(()=> {
    handleClick()
  } , [])
  console.log(Quiz)
  return (
    <div>
      <p>{Quiz.question}</p>
      <button>{Quiz.answers}</button>
      {allQuestion.map(p => {
        {p.answers.map(p => {
        <button>{p}</button>
        })}
      })}
      <button onClick = {handleClick}>text</button>
    </div >
)
}
export default Question