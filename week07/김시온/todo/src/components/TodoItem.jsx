import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPenToSquare, faFloppyDisk, faTimes } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';

function TodoItem({ todo, updateTodo, deleteTodo, toggleComplete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [content, setContent] = useState(todo.content);

  function handleChange(e) {
    setContent(e.target.value);
  }

  function handleKeyDown(e) {
    if (e.key == 'Enter') {
      handleSave();
    } else if (e.key == 'Escape') {
      handleCancel();
    }
  }

  async function handleSave() {
    if (content.trim() === '') {
      alert('내용을 입력해주세요');
      return;
    }
    updateTodo(todo.id, content);
    setIsEditing(false);
  }

  function handleCancel() {
    setIsEditing(false);
  }

  function handleEdit() {
    setIsEditing(true);
    setContent(todo.content);
  }

  return (
    <li className={`bg-[#333] mt-[10px] p-[10px] rounded-lg flex justify-between items-center text-white list ${todo.isComplete ? 'line-through text-opacity-60 ' : ''}`}>
      <input type='checkbox' className='mr-[10px]' checked={todo.isComplete} onChange={() => toggleComplete(todo.id, todo.isComplete)} disabled={isEditing} />

      {isEditing ? (
        <input
          type='text'
          value={content}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          className='dark:bg-[#444] border dark:border-white rounded justify-between mr-1 w-40 h-8 pl-1'
          autoFocus></input>
      ) : (
        <span className={`${isEditing ? 'cursor-default' : 'cursor-pointer'}`} onClick={() => !isEditing && toggleComplete(todo.id, todo.isComplete)}>
          {todo.content}
        </span>
      )}

      <div>
        {isEditing ? (
          <>
            {' '}
            <button
              className='bg-[#f9f9f9] dark:bg-green-500 dark:text-white border-none px-[8px] py-[6px] rounded-[5px] cursor-pointer hover:outline hover:bg-green-600 mr-1 hover:outline-2 hover:outline-white '
              onClick={() => handleSave()}>
              <FontAwesomeIcon icon={faFloppyDisk} />
            </button>
            <button
              className='bg-[#f9f9f9] dark:bg-red-500 dark:text-white border-none px-[8px] py-[6px] rounded-[5px] cursor-pointer hover:outline hover:bg-red-600 hover:outline-2 hover:outline-white '
              onClick={() => handleCancel(todo.id)}>
              <FontAwesomeIcon icon={faTimes} />
            </button>
          </>
        ) : (
          <>
            {' '}
            <button
              className={`bg-[#f9f9f9] dark:bg-blue-500 dark:text-white border-none px-[8px] py-[6px] rounded-[5px] mr-1 ${
                !todo.isComplete ? 'cursor-pointer hover:outline hover:bg-blue-600 hover:outline-2 hover:outline-white' : ''
              } ${todo.isComplete ? ' opacity-60' : ''}`}
              onClick={() => handleEdit()}
              disabled={todo.isComplete}>
              <FontAwesomeIcon icon={faPenToSquare} />
            </button>
            <button
              className='bg-[#f9f9f9] dark:bg-stone-900 dark:text-white border-none px-[8px] py-[6px] rounded-[5px] cursor-pointer  hover:bg-stone-950 hover:outline hover:outline-2 hover:outline-white '
              onClick={() => deleteTodo(todo.id)}>
              <FontAwesomeIcon icon={faTrash} />
            </button>
          </>
        )}
      </div>
    </li>
  );
}

export default TodoItem;
