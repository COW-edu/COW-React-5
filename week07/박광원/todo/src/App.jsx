import { useState, useEffect } from 'react'
import axios from "axios";
import "tailwindcss/tailwind.css";
import TodoInput from './components/TodoInput';
import TodoList from './components/TodoList';

function App() {
  const [todos, setTodos] = useState([]);
  const url = 'http://localhost:8080/todos';

  useEffect(() => {
    postTodos
  }, [todos]);

  useEffect(() => {
    getTodos
  }, [])
  
  const getTodos = async () => {
    try {
      const response = await axios.get(url);
      setTodos(response.data);
    } catch(err) {
      console.log(err);
    }
  }

  const postTodos = async () => {
    try {
      const response = await axios.post(url);
      // 나중에
    }
  }

  return (
    <div className='flex flex-col min-h-screen w-full items-center justify-center'>
      <TodoInput
        setTodos = {setTodos}
      />
      <ul className="mt-4 w-96">
        {todos.map((todo) => (
          <TodoList
            key = {todo.id}
            todo = {todo}
            setTodos = {setTodos}
          />
        ))}
      </ul>
    </div>
  )
}
/*
const saveTodos = () => {
  const saved = localStorage.getItem("todos");
  return saved ? JSON.parse(saved) : [];
}*/

export default App