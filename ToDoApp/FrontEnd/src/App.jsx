import { useState, React, useEffect } from 'react'
import './Styles/App.scss'
import { CreateTodo } from './Components/CreateTodo'
import { Todo } from './Components/Todo'

function App() {
  const [todos, setTodos] = useState([]);
  useEffect(() => {
    fetch("http://localhost:3000/")
      .then((response) => response.json())
      .then((data) => setTodos(data));
  }, [])

  return (
    <div className='main_div'>
      <h1 className='heading'>Todo App</h1>
      <CreateTodo></CreateTodo>
      <Todo todos={todos}></Todo>
    </div>

  )
}

export default App
