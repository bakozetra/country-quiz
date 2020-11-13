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
  const useref = useRef(null);

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
    let randomCapital = [random.capital];
    const randomCountrys = [random.name];
    const randomFlagAndCapital = [random.flag, random.capital];
    const randoms = randomFlagAndCapital[Math.floor(Math.random() * randomFlagAndCapital.length)]
    setrandomCountry(randomCountrys);
    setCapitalName(randomCapital)
    setrandomOptions(randomOptions);
    setRandomQuestion(randoms);
  }

  
  function handleClick(e) {
    e.preventDefault()
    const trueCapital = e.target.value;
    console.log(trueCapital);
    if (randomCountry == trueCapital) {
      setscore(score + 1);
      useref.current.backgroundColor = "red";
      setToggle(!toggle)
    } else {
      setIsCapial(true);
    }
  }
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
  console.log(randomCountry);
  return (
    <div className="container">
      {isCapital ? <div className="Score">
        <p><img src={ScoreImage}></img></p>
        <h2>Results</h2>
        <p>You got {score} correct answers</p>
        <button onClick={bacToQuiz}>Try again</button>
      </div> :
        <div className="quiz">
          <div className="CapitalText">
            {randomQuestion == capitalName ?
              <p className="capitalName"> {randomQuestion} is capital of </p> :
              <div>
                <p><img src={randomQuestion} className="flag"></img></p>
                <p className="flag-Question">Which country does it flag belonges to</p>
              </div>}
            <p className="decription-trip"><img src={Image}></img></p>
          </div>
          <div className="options">
            <form onClick ={(e) => handleClick(e)}>
              <button value={randomOptions[0]}  ref={useref}>{randomOptions[0]}</button>
              <button value={randomOptions[1]} ref={useref}>{randomOptions[1]}</button>
              <button value={randomOptions[2]} ref={useref}>{randomOptions[2]}</button>
              <button value={randomOptions[3]} ref={useref}>{randomOptions[3]}</button>
            </form>
          </div>
          {toggle ? <button onClick={getRandomAll}>text</button> : " "}
        </div>
      }
    </div>
  )
}
export default App;