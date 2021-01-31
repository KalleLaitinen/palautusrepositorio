import React from 'react';
import ReactDOM from 'react-dom';


const Header = ({ course }) => {
    return (
      <h1>{course.name}</h1>
    )
  }
  
  const Total = ({ course }) => {
    const exrList = course.parts.map(part => part.exercises)
    const reducer = (a,b) => a+b
    return(
      <p>total of {exrList.reduce(reducer)} exercises</p>
    ) 
  }
  
  const Part = (props) => {
    return (
      <p>
        {props.part.name} {props.part.exercises}
      </p>    
    )
  }
  
  const Content = ({ course }) => {
    return (
      <div>
        <ul>
          {course.parts.map(part => 
          <li key={part.id}>
            < Part part={part} />
          </li>
          )}
        </ul>
      </div>
    )
  }
  
  const Course = ({course}) => {
    return (
      <div>
        <Header course={course} />
        <Content course={course} />
        <Total course={course} />
      </div>
    )
  }

  export default Course