import React, { useEffect, useState } from 'react'
import Question from './quesions'
const URL = 'https://restcountries.eu/rest/v2/all';
function App() {
  const [countries, setCountry] = useState([]);
  const [randomCountry, setrandomCountry] = useState({});
  const [randomOptions, setrandomOptions] = useState([]);
  const [capitals, setCapitals] = useState(" ");
  const [isCapital, setIsCapial] = useState(false)

  async function fetchURL() {
    const res = await fetch(URL);
    const data = await res.json();
    console.log(data)
    setCountry(data);
  }
  console.log(countries.capital)
  const getRandom = () => {
    const random = countries[Math.floor(Math.random() * countries.length)];
    const randomOpt1 = countries[Math.floor(Math.random() * countries.length)];
    const randomOpt2 = countries[Math.floor(Math.random() * countries.length)];
    const randomOpt3 = countries[Math.floor(Math.random() * countries.length)];
    const randomOptions = [random.name, randomOpt1.name, randomOpt2.name, randomOpt3.name];
    const randomCapital = [random.capital]
    setCapitals(randomCapital)
    console.log(randomCapital);
    console.log(randomOptions);
    setrandomOptions(randomOptions);
  }

  function me() {
    const countryName = countries.name;
    const targets = e.target.value;
    console.log(targets);
    if (countryName === targets) {
      console.log('hiiii');
    } else {
      console.log('me');
    }
  }

  console.log(randomOptions);

  useEffect(() => {
    fetchURL();
  }, []);

  useEffect(() => {
    if (countries.length) {
      getRandom()
    }
  }, [countries])

  return (
    <div className="quiz">
      <p className="capitalName">{capitals} is capital of : </p>
      <div className="options">
        {randomOptions.map(options => {
          return <button onClick={(e) => me(e)} value={capitals}>{options}</button>
        })}
      </div>
      <button onClick={getRandom}>text</button>
    </div>
  )
}


export default App;