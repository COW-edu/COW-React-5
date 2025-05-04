import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [todos, setTodos] = useState(saveTodos);

  const deleteTodo = (id) => {
    setTodos(todos => todos.filter((todo) => todo.id !== id));
  }

  const checkTodo = (id) => {
    setTodos(prev =>
      prev.map(todo =>
        todo.id === id ? {...todo, checked: !todo.checked} : todo
      )
    )
  }

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  return (
    <>
      <TodoInput
        setTodos = {setTodos}
      />
      <ul>
        {todos.map((todo) => (
          <TodoList
            key = {todo.id}
            todo = {todo}
            deleteTodo = {deleteTodo}
            checkTodo = {checkTodo}
          />
        ))}
      </ul>
    </>
  )
}

const saveTodos = () => {
  const saved = localStorage.getItem("todos");
  return saved ? JSON.parse(saved) : [];
}

const TodoInput = ({setTodos}) => {
  const [input, setInput] = useState("");

  const addTodo = () => {
    if (input.trim() === "") return;
    const newTodo = {
      id: Date.now(),
      text: input,
      checked: false
    }
    setTodos((prev) => [...prev, newTodo]);
    setInput("");
  };

  return(
    <div>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter'){
            addTodo();
          }
        }}
        placeholder="할 일을 입력하세요"
      />
      <button onClick={addTodo}>추가</button>
    </div>
  )
}

const TodoList = ({todo, deleteTodo, checkTodo}) => {
  const isChecked = () => {
    checkTodo(todo.id);
  }

  return (
    <li>
      <input type="checkbox" onChange={isChecked} checked={todo.checked}/>
      {todo.checked === true ? <del>{todo.text}</del> : todo.text}
      <button onClick={() => deleteTodo(todo.id)}>삭제</button>
    </li>
  )
}

export default App