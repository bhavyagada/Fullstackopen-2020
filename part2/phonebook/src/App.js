import React, { useState, useEffect } from 'react'
import personService from './services/persons'
import './index.css'

const Filter = (props) => <div>filter shown with <input value={props.name} onChange={props.SearchChange}/></div>

const Notification = ({text}) => {
  if(text.message === null) {
    return null
  }
  return (
    <div className={text.category}>{text}</div>
  )
}

const Persons = ({persons, serachName, deletePerson}) => {
  let filterPersons = persons
  if(serachName) {
    filterPersons = persons.filter(person => person.name.toLowerCase().includes(serachName.toLowerCase()))
    return filterPersons.map(person => <div key={person.id}> {person.name} {person.number}</div>)
  }
  
  return filterPersons.map(person => 
    <div key={person.id}> 
      {person.name} {person.number} 
      <button onClick={() => deletePerson(person.id)} >delete</button> 
    </div>
  )
}

const PersonFrom = (props) => {
  return (
    <form onSubmit={props.add}>
      name : <input value={props.name} onChange={props.PChange} />
      <br></br>
      number : <input value={props.num} onChange={props.NChange} /> 
      <br></br>
      <button type="submit">add</button>
    </form>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  useEffect(() => {
    personService.getAll().then(response => {
      setPersons(response)
    })
  }, [])

  const [newName, setNewName] = useState('')
  const [newNum, setNewNumber] = useState('')
  const [serachName, setResults] = useState('')
  const [messageText, setMessage] = useState(
    { message: null, category: null }
  )

  const addPerson = (event) => {
    event.preventDefault()

    const newPerson = {
      name: newName,
      number: newNum,
      key: newName
    }
    
    if (persons.find(person => person.name === newPerson.name)) {
      if(window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const id = persons.find(person => person.name === newPerson.name).id
        const newObject = {
          name: newName,
          number: newNum
        }
        personService.update(id, newObject).then(response => {
          const messageText = {
            message:`Successfully added ${response.name} with number ${response.number}`, 
            category:'success'
          }
          setMessage(messageText.message)
          setTimeout(() => {setMessage({...messageText, message:null})}, 5000)
          const newPerson = persons.filter(person => person.id !== id ? person : response)
          setPersons(newPerson)
        }).catch(error => {
          const messageText = {
            message:`${newObject.name} has already been removed from the database`, 
            category:'error'
          }
          setMessage(messageText.message)
          setTimeout(() => {setMessage({...messageText, message:null})}, 5000)
        })
      }
    }
    else {
      personService.create(newPerson).then(returnPerson => {
        const messageText = {
          message: `Successfully added ${returnPerson.name} with number ${returnPerson.number}`,
          category: 'success'
        }
        setMessage(messageText.message)
        setTimeout(() => {setMessage({...messageText ,message:null})}, 5000)
        setPersons(persons.concat(returnPerson))
        setNewName('')
        setNewNumber('')
      }).catch(error => {
        const messageText = {
          message:`${error.name} has already been removed from the database`,
          category:'error'
        }
        setMessage(messageText.message)
        setTimeout(() => {setMessage({...messageText ,message:null})}, 5000)
      })
    }
  }

  const handlePersonChange = (event) => setNewName(event.target.value)
  const handleNumberChange = (event) => setNewNumber(event.target.value)
  const handleSearchChange = (event) => setResults(event.target.value)
  const handleDeletePerson = (id) => {
    const person = persons.find(key => key.id === id)
    if (window.confirm(`Delete ${person.name} ?`)) {
      personService.remove(id).then(response => {
        setPersons(persons.filter(person => person.id !== id))
      })
    }
  }

  return (
    <div>
      <Notification text={messageText} />
      <h1>Phonebook</h1>
      <Filter name={serachName} SearchChange={handleSearchChange} />
      <h2>Add a new</h2>
      <PersonFrom add={addPerson} name={newName} num={newNum} PChange={handlePersonChange} NChange={handleNumberChange} />
      <h2>Numbers</h2>
      <Persons persons={persons} serachName={serachName} deletePerson={handleDeletePerson}/>
    </div>
  )
}

export default App;