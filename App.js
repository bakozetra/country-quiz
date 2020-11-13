import React, { useEffect, useRef, useState } from 'react'
import ScoreImage from './undraw_winners.svg'
import Image from './undraw_adventure_4hum.svg'

const URL = 'https://restcountries.eu/rest/v2/all';
function App() {
  const [countries, setCountry] = useState([]);
  const [randomCountry, setrandomCountry] = useState('');
  const [randomOptions, setrandomOptions] = useState([]);
  const [capitalName, setCapitalName] = useState('');
  const [isCapital, setIsCapial] = useState(false);
  const [score, setscore] = useState(0);
  const [randomQuestion, setRandomQuestion] = useState([]);
  const [toggle, setToggle] = useState(false);
  let useref = useRef(null);
  console.log(useref);

  // Fetcch the data
  async function fetchURL() {
    const res = await fetch(URL);
    const data = await res.json();
    console.log(data)
    setCountry(data);
  }

  // Get the countries randomly
  const getRandomAll = () => {
    const random = countries[Math.floor(Math.random() * countries.length)];
    console.log(random.flag);
    const randomOpt1 = countries[Math.floor(Math.random() * countries.length)];
    const randomOpt2 = countries[Math.floor(Math.random() * countries.length)];
    const randomOpt3 = countries[Math.floor(Math.random() * countries.length)];
    let randomOptions = [random.name, randomOpt1.name, randomOpt2.name, randomOpt3.name];
    randomOptions.sort(() => { return 0.5 - Math.random() });
    const randomCapital = [random.capital];
    const randomCountrys = [random.name];
    const randomFlagAndCapital = [random.flag, random.capital];
    const randoms = randomFlagAndCapital[Math.floor(Math.random() * randomFlagAndCapital.length)]
    setrandomCountry(randomCountrys);
    setCapitalName(randomCapital)
    setrandomOptions(randomOptions);
    setRandomQuestion(randoms);
  }

  // To handle the Click button on form 
  function handleClick(e) {
    e.preventDefault()
    const trueCapital = e.target.value;
    console.log(trueCapital);
    if (randomCountry == trueCapital) {
      //Adding Score 
      setscore(score + 1);
      useref.current.backgroundColor = "green";
      console.log(useref);
      setToggle(!toggle)
    } else {
      setIsCapial(true);
      useref.current.backgroundColor = 'red';
    }
  }

  //function to back to the country quiz
  function bacToQuiz() {
    if (isCapital == true) {
      setIsCapial(false);
      getRandomAll()
    }
    else {
      setIsCapial(true);
    }
  }

  useEffect(() => {
    fetchURL();
  }, []);

  useEffect(() => {
    if (countries.length) {
      getRandomAll()
    }
  }, [countries])


  return (
    <div className="container">
      {isCapital ? <div className="Score">
        <p><img src={ScoreImage}></img></p>
        <h2>Results</h2>
        <p>You got {score} correct answers</p>
        <button onClick={bacToQuiz} className="TryAgain">Try again</button>
      </div> :
        <div className="quiz">
          <div className="CapitalText">
            {randomQuestion == capitalName ?
              <p className="capital-question"> {randomQuestion} is capital of </p> :
              <div>
                <p><img src={randomQuestion} className="flag"></img></p>
                <p className="flag-Question">Which country does it flag belonges to</p>
              </div>
            }
            <p className="decription-trip"><img src={Image}></img></p>
          </div>
          <div className="options">
            <form>
              <button value={randomOptions[0]} ref={useref} onClick={(e) => handleClick(e)}> <b>A</b> {randomOptions[0]}</button>
              <button value={randomOptions[1]} ref={useref} onClick={(e) => handleClick(e)}> <b>B</b> {randomOptions[1]}</button>
              <button value={randomOptions[2]} ref={useref} onClick={(e) => handleClick(e)}> <b>C</b> {randomOptions[2]}</button>
              <button value={randomOptions[3]} ref={useref} onClick={(e) => handleClick(e)}> <b>D</b> {randomOptions[3]}</button>
            </form>
          </div>
          {toggle ? <button onClick={getRandomAll} className="next-country">text</button> : " "}
        </div>
      }
    </div>
  )
}
export default App;