import { useState, useEffect, useCallback } from 'react';
import TodoInput from './components/TodoInput';
import TodoList from './components/TodoList';
import * as api from './api/TodoFetchApi';

function App() {
  const [content, setContent] = useState('');
  const [todoList, setTodoList] = useState([]);

  const fetchTodos = useCallback(async () => {
    try {
      const data = await api.getTodos();
      setTodoList(() => [...data]);
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  const addTodo = async () => {
    if (content.trim() !== '') {
      try {
        const newTodo = await api.postTodo(content);
        setTodoList((prevList) => [...prevList, newTodo]);
        setContent('');
      } catch (error) {
        console.error(error);
      }
    }
  };

  const deleteTodo = async (id) => {
    try {
      const res = await api.deleteTodo(id);
      setTodoList((prevTodoList) => prevTodoList.filter((todo) => todo.id !== res.id));
    } catch (error) {
      console.error(error);
    }
  };

  const updateTodo = async (id, content) => {
    try {
      const res = await api.putTodo(id, content);
      setTodoList((prevTodoList) => prevTodoList.map((todo) => (todo.id === res.id ? res : todo)));
    } catch (error) {
      console.error(error);
    }
  };

  const toggleComplete = async (id, isComplete) => {
    try {
      const res = await api.patchTodo(id, isComplete);
      setTodoList((prevTodoList) => prevTodoList.map((todo) => (todo.id === res.id ? res : todo)));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1 id='listName' className='text-[3.2em] leading-[1.1] mt-0 mb-[25px]'>
        Todo List
      </h1>
      <TodoInput content={content} setContent={setContent} addTodo={addTodo} />
      <TodoList todoList={todoList} updateTodo={updateTodo} deleteTodo={deleteTodo} toggleComplete={toggleComplete} />
    </div>
  );
}

export default App;
