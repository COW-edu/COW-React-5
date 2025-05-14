import { useState, useEffect } from 'react';
import TodoInput from './components/TodoInput';
import TodoList from './components/TodoList';

function App() {
  const [todo, setTodo] = useState('');
  const [todoList, setTodoList] = useState(() => {
    const saved = localStorage.getItem('todos');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todoList));
  }, [todoList]);

  const addTodo = () => {
    if (todo.trim() !== '') {
      const newTodo = {
        id: Date.now(),
        text: todo,
        completed: false,
      };
      setTodoList([...todoList, newTodo]);
      setTodo('');
    }
  };

  const deleteTodo = (id) => {
    setTodoList(todoList.filter((item) => item.id !== id));
  };

  const toggleComplete = (id) => {
    setTodoList(todoList.map((item) => (item.id === id ? { ...item, completed: !item.completed } : item)));
  };

  return (
    <div>
      <h1 id='listName' className='text-[3.2em] leading-[1.1] mt-0 mb-[25px]'>
        Todo List
      </h1>
      <TodoInput todo={todo} setTodo={setTodo} addTodo={addTodo} />
      <TodoList todoList={todoList} deleteTodo={deleteTodo} toggleComplete={toggleComplete} />
    </div>
  );
}

export default App;
