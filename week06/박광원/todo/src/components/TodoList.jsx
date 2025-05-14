export default function TodoList({todo, setTodos}) {
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
  
  const isChecked = () => {
    checkTodo(todo.id);
  }
  
  return (
    <li className={todo.checked === true? "rounded-xl px-4 py-4 flex justify-between items-center mb-4 bg-red-100" : "rounded-xl px-4 py-4 flex justify-between items-center mb-4 bg-gray-100"}>
      <input type="checkbox" onChange={isChecked} checked={todo.checked}/>
      {todo.checked === true ? <del>{todo.text}</del> : todo.text}
      <button className={todo.checked === true? "rounded-lg py-2 px-4 bg-red-300 hover:bg-red-500 hover:text-white" : "rounded-lg py-2 px-4 bg-gray-300 hover:bg-gray-500 hover:text-white"} onClick={() => deleteTodo(todo.id)}>삭제</button>
    </li>
  )
}