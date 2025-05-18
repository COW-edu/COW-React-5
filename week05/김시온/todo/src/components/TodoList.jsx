import React from 'react';
import './css/TodoList.css';
import TodoItem from './TodoItem';

function TodoList({ todoList, deleteTodo, toggleComplete }) {
  return (
    <div id='todoListContainer'>
      <ul>
        {todoList.map((item) => (
          <TodoItem key={item.id} item={item} deleteTodo={deleteTodo} toggleComplete={toggleComplete} />
        ))}
      </ul>
    </div>
  );
}

export default TodoList;
