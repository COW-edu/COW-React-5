import { useState, useEffect } from 'react'
import axios from 'axios';
import "tailwindcss/tailwind.css";
import TodoInput from './components/TodoInput';
import TodoList from './components/TodoList';

function App() {
  const [todos, setTodos] = useState(null);
  const url = 'http://localhost:8080/todos';

  useEffect(() => {
    getTodos();
  }, [])

  const getTodos = async () => {
    const response = await axios.get(`${url}`);
    setTodos(response.data);
  }  

  return (
    <div className='flex flex-col min-h-screen w-full items-center justify-center p-4'>
      <TodoInput
        url = {url}
        setTodos = {setTodos}
      />
      <ul className="mt-4 w-96">
        {todos && todos.map((todo) => (
          <TodoList
            key = {todo.id}
            url = {url}
            todo = {todo}
            setTodos = {setTodos}
          />
        ))}
      </ul>
    </div>
  )
}

export default App