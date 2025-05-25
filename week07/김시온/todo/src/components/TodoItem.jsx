import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPenToSquare, faFloppyDisk, faTimes } from '@fortawesome/free-solid-svg-icons';

function TodoItem({ item, deleteTodo, toggleComplete, updateTodoContent }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(item.content);

  const handleEdit = () => {
    setIsEditing(true);
    setEditText(item.content);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleSave = () => {
    if (editText.trim() === '') {
      alert('내용을 입력해주세요.');
      return;
    }
    updateTodoContent(item.id, editText);
    setIsEditing(false); // 저장 후 보기 모드로 전환
  };

  const handleInputChange = (e) => {
    setEditText(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSave();
    } else if (e.key === 'Escape') {
      handleCancel();
    }
  };

  return (
    <li className={`bg-[#333] mt-[10px] p-[10px] rounded-lg flex justify-between items-center text-white list ${item.isComplete ? 'line-through opacity-[0.6]' : ''}`}>
      <input type='checkbox' className='mr-[10px] flex-shrink-0' checked={item.isComplete} onChange={() => toggleComplete(item.id)} disabled={isEditing} />

      {isEditing ? (
        <input type='text' value={editText} onChange={handleInputChange} onKeyDown={handleKeyDown} className='flex-grow bg-[#444] text-white p-1 rounded border border-gray-500 mr-2' autoFocus />
      ) : (
        <span className='flex-grow break-all mr-2' onClick={() => !isEditing && toggleComplete(item.id)} style={{ cursor: isEditing ? 'default' : 'pointer' }}>
          {item.content}
        </span>
      )}

      <div className='flex-shrink-0'>
        {' '}
        {/* 버튼 그룹을 div로 묶음 */}
        {isEditing ? (
          <>
            <button title='저장' className='bg-green-500 text-white border-none px-[8px] py-[6px] rounded-[5px] cursor-pointer hover:bg-green-600 mr-1' onClick={handleSave}>
              <FontAwesomeIcon icon={faFloppyDisk} />
            </button>
            <button title='취소' className='bg-gray-500 text-white border-none px-[8px] py-[6px] rounded-[5px] cursor-pointer hover:bg-gray-600' onClick={handleCancel}>
              <FontAwesomeIcon icon={faTimes} />
            </button>
          </>
        ) : (
          <>
            <button title='수정' className='bg-blue-500 text-white border-none px-[8px] py-[6px] rounded-[5px] cursor-pointer hover:bg-blue-600 mr-1' onClick={handleEdit}>
              <FontAwesomeIcon icon={faPenToSquare} />
            </button>
            <button title='삭제' className='bg-red-500 text-white border-none px-[8px] py-[6px] rounded-[5px] cursor-pointer hover:bg-red-600' onClick={() => deleteTodo(item.id)}>
              <FontAwesomeIcon icon={faTrash} />
            </button>
          </>
        )}
      </div>
    </li>
  );
}

export default TodoItem;
