import TodoItem from './TodoItem';

function TodoList({ todoList, deleteTodo, toggleComplete, updateTodoContent }) {
  return (
    <div id='todoListContainer' className='mt-[10px] max-h-[370px] overflow-y-scroll scrollbar-none'>
      <ul className='p-0'>
        {todoList.map((item) => (
          <TodoItem key={item.id} item={item} deleteTodo={deleteTodo} toggleComplete={toggleComplete} updateTodoContent={updateTodoContent} />
        ))}
      </ul>
    </div>
  );
}

export default TodoList;
