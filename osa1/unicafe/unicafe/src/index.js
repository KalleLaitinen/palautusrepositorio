import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({handleClick, text}) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const Statistics = (props) => {
  return (
    <div>
      <h1>statistics</h1>
      <StatisticLine text='good' value={props.good}/>
      <StatisticLine text='neutral' value={props.neutral}/>
      <StatisticLine text='bad' value={props.bad}/>
      <StatisticLine text='all' value={props.all}/> 
      <StatisticLine text='average' value={(props.good-1*props.bad)/(props.good + props.neutral + props.bad)}/>
      <StatisticLine text='positive' value={(props.good/(props.good + props.neutral + props.bad))*100} text2='%'/> 
    </div>
    
  )
}

const StatisticLine = ({text, value, text2}) => <p>{text} {value}{text2}</p> 

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)
  
  
  const handleGood = () => {
    setGood(good+1)
    setAll(all+1)
  }
  
  const handleNeutral = () => {
    setNeutral(neutral+1)
    setAll(all+1)
  }
  
  const handleBad = () => {
    setBad(bad+1)
    setAll(all+1)
  } 

  if (all===0){
  return (
    <div>
      <h1>Give feedback</h1>
      <Button handleClick={handleGood} text='good'/>
      <Button handleClick={handleNeutral} text='neutral'/>
      <Button handleClick={handleBad} text='bad'/>
      <p>No feedback given</p>
    </div>
  )
  }
  
  return (  
    <div>
      <h1>Give feedback</h1>
      <Button handleClick={handleGood} text='good'/>
      <Button handleClick={handleNeutral} text='neutral'/>
      <Button handleClick={handleBad} text='bad'/>
      <Statistics good={good} neutral={neutral} bad={bad} all={all}/>
    </div>
  )
}


ReactDOM.render(<App />, 
  document.getElementById('root')
)