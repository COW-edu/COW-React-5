import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

function TodoItem({ item, deleteTodo, toggleComplete }) {
  return (
    <li className={`bg-[#333] mt-[10px] p-[10px] rounded-lg flex justify-between items-center text-white list ${item.completed ? 'line-through opacity-[0.6]' : ''}`} key={item.id}>
      <input type='checkbox' className='mr-[10px]' checked={item.completed} onChange={() => toggleComplete(item.id)} />
      {item.text}
      <button
        className='bg-[#f9f9f9] dark:bg-black dark:text-white border-none px-[10px] py-[6px] rounded-[5px] cursor-pointer hover:outline hover:outline-2 hover:outline-white '
        onClick={() => deleteTodo(item.id)}>
        <FontAwesomeIcon icon={faTrash} />
      </button>
    </li>
  );
}

export default TodoItem;
