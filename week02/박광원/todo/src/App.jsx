import { useState } from 'react'
import './App.css'

function App() {
    const [input, setInput] = useState("");
    const [todos, setTodos] = useState([]);

    const handleAddTodo = () => {
        if (input.trim() === "") return;
        setTodos([...todos, input]);
        setInput("");
    };
    return (
        <>
            <TodoInput
                input = {input}
                setInput = {setInput}
                handleAddTodo= {handleAddTodo}
            />
            <TodoList
                todos = {todos}
            />
        </>
    )
}

const TodoInput = ({input, setInput, handleAddTodo}) => {
    return(
        <div>
            <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="할 일을 입력하세요"
            />
            <button onClick={handleAddTodo} >추가</button>
        </div>
    )
}

const TodoList = ({todos}) => {
    return (
        <ul>
            {todos.map((todo, index) => (
                <li key={index}>
                    {todo}
                </li>
            ))}
        </ul>
    )
}

export default App