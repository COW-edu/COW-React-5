import TodoItem from './TodoItem';

function TodoList({ todoList, updateTodo, deleteTodo, toggleComplete }) {
  return (
    <div id='todoListContainer' className='mt-[10px] max-h-[370px] overflow-y-scroll scrollbar-none'>
      <ul className='p-0'>
        {todoList.map((todo) => (
          <TodoItem key={todo.id} todo={todo} updateTodo={updateTodo} deleteTodo={deleteTodo} toggleComplete={toggleComplete} />
        ))}
      </ul>
    </div>
  );
}

export default TodoList;
