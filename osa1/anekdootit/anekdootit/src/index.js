import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = (props) => {
  return (
    <button onClick={props.handleClick}>
      {props.text}
    </button>
  )
}

 


const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(Array.apply(null, new Array(6)).map(Number.prototype.valueOf, 0))

  const setRandom = () => setSelected(Math.floor(Math.random() * 5))

  const copy = [...points]

  const plusPoints = () => {
    copy[selected] += 1
    setPoints(copy)
  }

  var maxVotesIndex = copy.indexOf(Math.max(...copy));

  
  return (
    <div>
      <h1>Anecdote of the day</h1>
      {props.anecdotes[selected]}
      <p></p>
      has {copy[selected]} votes
      <p></p>
      <Button handleClick={setRandom} text='next anecdote' />
      <Button handleClick={plusPoints} text='vote' />
      <h1> Anecdote with the most votes</h1>
      {props.anecdotes[maxVotesIndex]}
      <p>has {copy[maxVotesIndex]} votes </p>
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)