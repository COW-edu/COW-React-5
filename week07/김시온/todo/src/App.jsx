import { useState, useEffect, useCallback } from 'react';
import TodoInput from './components/TodoInput';
import TodoList from './components/TodoList';
import * as api from './api/TodoApi';

function App() {
  const [todo, setTodo] = useState('');
  const [todoList, setTodoList] = useState([]);

  const fetchTodos = useCallback(async () => {
    try {
      const todosFromApi = await api.getTodos();
      setTodoList(todosFromApi);
    } catch (err) {
      console.log(err);
    }
  }, []);

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]); // useCallback에 감싸져 배열 사용 가능

  const addTodo = async () => {
    if (todo.trim() !== '') {
      try {
        const newTodoFromApi = await api.postTodos(todo);
        setTodoList([...todoList, newTodoFromApi]);
        setTodo('');
      } catch (err) {
        console.error(err);
      }
    }
  };

  const updateTodoContent = async (id, newContent) => {
    try {
      const updatedTodoFromApi = await api.putContent(id, newContent);
      setTodoList((prevTodoList) => prevTodoList.map((todo) => (todo.id === id ? updatedTodoFromApi : todo)));
    } catch (err) {
      console.error(err);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await api.deleteTodo(id);
      setTodoList((prevTodoList) => prevTodoList.filter((item) => item.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const toggleComplete = async (id) => {
    try {
      const updatedTodoFromApi = await api.putIsComplete(id);
      setTodoList((prevTodoList) => prevTodoList.map((item) => (item.id === id ? updatedTodoFromApi : item)));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h1 id='listName' className='text-[3.2em] leading-[1.1] mt-0 mb-[25px]'>
        Todo List
      </h1>
      <TodoInput todo={todo} setTodo={setTodo} addTodo={addTodo} />
      <TodoList todoList={todoList} deleteTodo={deleteTodo} toggleComplete={toggleComplete} updateTodoContent={updateTodoContent} />
    </div>
  );
}

export default App;
