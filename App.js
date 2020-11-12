import React, { useEffect, useState } from 'react'
import Image from './undraw_adventure_4hum.svg'
const URL = 'https://restcountries.eu/rest/v2/all';
function App() {
  const [countries, setCountry] = useState([]);
  const [randomCountry, setrandomCountry] = useState({});
  const [randomOptions, setrandomOptions] = useState([]);
  const [capitalName, setCapitalName] = useState('');
  const [isCapital, setIsCapial] = useState(true)
  const [score, setscore] = useState(0)
  const [callingCodes, setcallingCodes] = useState([]);

  async function fetchURL() {
    const res = await fetch(URL);
    const data = await res.json();
    console.log(data)
    setCountry(data);
  }
  console.log(callingCodes);
  const getRandomAll = (e) => {
    const random = countries[Math.floor(Math.random() * countries.length)];
    const randomOpt1 = countries[Math.floor(Math.random() * countries.length)];
    const randomOpt2 = countries[Math.floor(Math.random() * countries.length)];
    const randomOpt3 = countries[Math.floor(Math.random() * countries.length)];
    let randomOptions = [random.name, randomOpt1.name, randomOpt2.name, randomOpt3.name];
    randomOptions.sort(() => { return 0.5 - Math.random() });
    let randomCapital = [random.capital];
    const code = [random.callingCodes];
    console.log(code);
    setcallingCodes(code);
    setCapitalName(randomCapital)
    console.log(randomCapital);
    console.log(randomOptions);
    setrandomOptions(randomOptions);
  }
  console.log(countries);
  function handleClick(e) {
    const countryCapital = !setIsCapial(capitalName);
    console.log(countryCapital);
    const trueCapital = e.target.value;
    console.log(trueCapital);
    if (countryCapital == trueCapital) {
      console.log('true');
    } else {
      console.log('wrong');
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
      <div className="quiz">
        <div className="CapitalText">
        <p className="capitalName"> {capitalName} is capital of : </p>
          <p><img src={Image}></img></p>
        </div>
        <div className="options">
          {randomOptions.map(options => {
            return <button
              className="countryOptions"
              value={isCapital}
              onClick={(e) => handleClick(e)}>
              {options}
            </button>
          })}
        </div>
        <button onClick={getRandomAll}>text</button>
      </div>
    </div>
  )
}
export default App;