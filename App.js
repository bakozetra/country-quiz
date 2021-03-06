import React, { useEffect, useRef, useState } from 'react'
import ScoreImage from './undraw_winners.svg'
import Image from './undraw_adventure_4hum.svg'
import Check from './check.svg'
import Cross from './crossCircula.svg'

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
  const [disablebutton, setDisbleButton] = useState(false);
  console.log(disablebutton);
  const [wrongToggle, setWrongToggle] = useState(false);
  let useref = useRef(null);


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
    const randomCountrys = random.name;
    const randomFlagAndCapital = [random.flag, random.capital];
    const randoms = randomFlagAndCapital[Math.floor(Math.random() * randomFlagAndCapital.length)]
    setToggle(false);
    setWrongToggle(false);
    setrandomCountry(randomCountrys);
    setCapitalName(randomCapital)
    setrandomOptions(randomOptions);
    setRandomQuestion(randoms);
    setDisbleButton(false)
  }

  // To handle the Click button on form 
  function handleClick(e) {
    e.preventDefault()
    const trueCapital = e.target.value;
    console.log(trueCapital);

    console.log(useref.current.value)
    if (randomCountry == trueCapital) {
      //Adding Score 
      setscore(score + 1);
      setToggle(!toggle);
      e.target.style.backgroundColor = "rgba(96, 191, 136, 1)"
      e.target.style.backgroundImage = `url(${Check})`
      e.target.style.backgroundRepeat = `no-repeat`;
      e.target.style.backgroundPosition = `96% 0.5rem`;
      setDisbleButton(true);
    } else {
      e.target.style.backgroundColor = "rgba(234, 130, 130, 1)"
      e.target.style.backgroundImage = `url(${Cross})`
      e.target.style.backgroundRepeat = `no-repeat`;
      e.target.style.backgroundPosition = `96% 0.5rem`;
      useref.current.style.backgroundColor = "rgba(96, 191, 136, 1)"
      useref.current.style.backgroundImage = `url(${Check})`
      useref.current.style.backgroundRepeat = 'no-repeat'
      useref.current.style.backgroundPosition = `96% 0.5rem`;
      setWrongToggle(!toggle);
      setDisbleButton(true);
    }

  }
  function handleClickNext() {
    getRandomAll();
    useref.current.style.backgroundColor = 'transparent';
    useref.current.style.backgroundImage = "none"
  }

  function handleClickNextScore() {
    setWrongToggle(!wrongToggle);
    setIsCapial(true);
    setDisbleButton(false);
  }

  console.log(toggle);
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
  console.log(randomCountry);

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
        <p>You got <b className="number">{score}</b>correct answers</p>
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
              <button
                value={randomOptions[0]}
                disabled={disablebutton}
                ref={randomCountry === randomOptions[0] ? useref : null}
                onClick={(e) => handleClick(e)}>

                <b>A</b> {randomOptions[0]}</button>
              <button value={randomOptions[1]}
                disabled={disablebutton}
                ref={randomCountry === randomOptions[1] ? useref : null}
                onClick={(e) => handleClick(e)}> <b>B</b> {randomOptions[1]}</button>
              <button
                value={randomOptions[2]}
                disabled={disablebutton}
                ref={randomCountry === randomOptions[2] ? useref : null}
                onClick={(e) => handleClick(e)}> <b>C</b> {randomOptions[2]}</button>
              <button
                value={randomOptions[3]}
                disabled={disablebutton}
                ref={randomCountry === randomOptions[3] ? useref : null}
                onClick={(e) => handleClick(e)}> <b>D</b> {randomOptions[3]}</button>
            </form>
          </div>
          {toggle ? <button onClick={handleClickNext} className="next-country">Next</button> : ""}
          {wrongToggle ? <button onClick={handleClickNextScore} className="next-country">Next</button> : ""}
        </div>
      }
      <p className="about">HANITRINIAINA Nomenjanahary Synthia @ DevChallenges.io</p>
    </div>
  )
}
export default App;