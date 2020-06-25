import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const MostVotes = (props) => {
  const max = Math.max(...props.votes)
  let index = props.votes.indexOf(max)

  if(max === 0) {
    return (
      <p>no votes given</p>
    )
  }
  return (
    <p>{props.anecdotes[index]}</p>
  )
}

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [votes, incrementVotes] = useState(new Array(5).fill(0))

  const handleVotes = (selected) => {
    const copy = [...votes]
    copy[selected] += 1
    incrementVotes(copy)
  }

  const handleAnecdote = () => setSelected(Math.floor(Math.random() * 5))

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{props.anecdotes[selected]}</p>
      <p>has {votes[selected]} votes</p>
      <button onClick={() => handleVotes(selected)}>vote</button>
      <button onClick={handleAnecdote}>next anecdote</button>
      <h1>Anecdote with most votes</h1>
      <MostVotes votes={votes} anecdotes={props.anecdotes}/>
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

ReactDOM.render(<App anecdotes={anecdotes} />, document.getElementById('root'));