import React, { useState, useEffect } from 'react'
import service from './services/persons'

const Filter = (props) => (
  <div>filter shown with:<input value={props.value} onChange={props.onChange} /></div>
)

const PersonForm = (props) => (
  <div>{props.text}<input value={props.value} onChange={props.onChange} /></div>
)

const Button = (props) => (
  <button type={props.type}> {props.text} </button>
)


const Notification = ({ message, style }) => {
  if (message === null) {
    return null
  }

  return (
    <div className={style}>
      {message}
    </div>
  )
}



const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchTerm, setSearchTerm] = useState("")
  const [alert, setAlert] = useState(null)
  const [style, setStyle] = useState('alert')

  useEffect(() => {
    service
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [persons])


  const addPerson = (event) => {
    event.preventDefault()

    if (persons.map(person => person.name).includes(newName)) {
      if (window.confirm(`${newName} is already added to phonebook, replace old number with a new one?`)) {
        return (infoChange(newName, newNumber))
      }
    }
    else {
      const personObject = {
        name: newName,
        number: newNumber,


      }
      service
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
          setStyle('alert')
          setAlert(`Added ${returnedPerson.name}`)
          setTimeout(() => { setAlert(null) }, 2000)
        })
    }
  }

  const handleRemove = (event, person) => {
    event.preventDefault()
    console.log(event)
    console.log(person)
    console.log("button pressed")

    if (window.confirm(`Delete ${person.name}?`)) {
      return (

        service
          .del(person.id)
          .then(returnedPerson => {
            console.log("Person: ", returnedPerson)
            setPersons(persons.filter(p => p.id !== returnedPerson))
            setStyle('alert')
            setAlert(`Deleted ${person.name}`)
            setTimeout(() => { setAlert(null) }, 2000)
          }).catch(error => {
            console.log('fail')
          })
      )
    }
  }

  const infoChange = (newName, newNumber) => {
    const findId = persons.find(p => p.name === newName).id
    console.log(findId)
    const personObject = {
      name: newName,
      number: newNumber,
      id: findId
    }
    return (

      service
        .update(findId, personObject)
        .then(
          setNewName(''),
          setNewNumber(''),
          setStyle('alert'),
          setAlert(`Changed the number of ${personObject.name}`),
          setTimeout(() => { setAlert(null) }, 2000)

        )
        .catch(error => {
          setStyle('error')
          setAlert(
            `Information of '${personObject.name}' was already removed from server`
          )
          setTimeout(() => {
            setAlert(null)
          }, 5000)
        })
    )


  }






  const handlePersonsName = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handlePersonsNumber = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }


  const handleChange = event => {
    setSearchTerm(event.target.value)
  }



  const results = !searchTerm
    ? persons
    : persons.filter(person =>
      person.name.includes(searchTerm)
    )






  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={alert} style={style} />
      <form onSubmit={addPerson}>
        <Filter
          value={searchTerm}
          onChange={handleChange}
        />
        <div>
          <h2>add a new</h2>
          <PersonForm
            text="name:"
            value={newName}
            onChange={handlePersonsName}
          />

          <PersonForm
            text="number"
            value={newNumber}
            onChange={handlePersonsNumber}
          />

        </div>
        <div>
          <Button type="submit" text="add" />
        </div>
      </form>
      <h2>Numbers</h2>
      <form>
        <div>
          {results.map(person =>
            <p key={person.name}> {person.name} {person.number}
              <button onClick={e => handleRemove(e, person)}>Delete</button>
            </p>
          )}
        </div>
      </form>
    </div>
  )


}

export default App
