import { useState, useEffect } from 'react'
import "tailwindcss/tailwind.css";
import TodoInput from './components/TodoInput';
import TodoList from './components/TodoList';

function App() {
  const [todos, setTodos] = useState(saveTodos);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  return (
    <div className='flex flex-col min-h-screen w-full items-center justify-center'>
      <TodoInput
        setTodos = {setTodos}
      />
      <ul className="mt-4 w-72">
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

const saveTodos = () => {
  const saved = localStorage.getItem("todos");
  return saved ? JSON.parse(saved) : [];
}

export default App