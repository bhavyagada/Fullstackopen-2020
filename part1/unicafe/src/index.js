import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const Statistic = (props) => {
  if(props.text === "positive") {
    return (
      <tr>
        <td>{props.text}</td>
        <td>{props.value}%</td>
      </tr>
    )  
  }
  else {
    return (
      <tr>
        <td>{props.text}</td>
        <td>{props.value}</td>
      </tr>
    )
  }
}

const Statistics = (props) => {
  if(props.total === 0) {
    return (
      <p>No feedback given</p>
    )
  }
  else {
    return (
      <>
        <Statistic text="good" value={props.good}></Statistic>
        <Statistic text="neutral" value={props.neutral}></Statistic>
        <Statistic text="bad" value={props.bad}></Statistic>
        <Statistic text="total" value={props.total}></Statistic>
        <Statistic text="average" value={props.average}></Statistic>
        <Statistic text="positive" value={props.positive}></Statistic>
      </>
    )
  }
}

const Button = (props) => {
  return (
    <button onClick={props.event}>{props.text}</button>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  
  const total = good + neutral + bad
  const average = (good*1 + bad*-1)/total
  const positive = (good/total)*100

  const handleGood = () => setGood(good + 1)
  const handleNeutral = () => setNeutral(neutral + 1)
  const handleBad = () => setBad(bad + 1)

  return (
    <div>
      <h1>give feedback</h1>
        <div>
          <Button event={handleGood} text="good" />
          <Button event={handleNeutral} text="neutral"/>
          <Button event={handleBad} text="bad"/>
        </div>
      <h1>statistics</h1>
      <div>
        <Statistics good={good} neutral={neutral} bad={bad} total={total} average={average} positive={positive}/>
      </div>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'));