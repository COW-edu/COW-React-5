import React from "react";
import TodoItem from "./TodoItem";

function TodoList({ todos, onDeleteTodo, onToggleComplete, onUpdateContent }) {
  return (
    <ul className="space-y-3">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onDelete={() => onDeleteTodo(todo.id)}
          onToggleComplete={() => onToggleComplete(todo.id)}
          onUpdateContent={(newContent) => onUpdateContent(todo.id, newContent)}
        />
      ))}
    </ul>
  );
}

export default TodoList;
