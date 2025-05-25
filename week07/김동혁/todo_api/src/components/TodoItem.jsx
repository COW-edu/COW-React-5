import React, { useState } from "react";

function TodoItem({ todo, onDelete, onToggleComplete, onUpdateContent }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(todo.content);

  const handleEdit = () => {
    setIsEditing(true);
    setEditValue(todo.content);
  };

  const handleSave = () => {
    if (editValue.trim() === "") {
      // 선택: 빈 값일 경우 원래 값으로 되돌리거나 사용자에게 알림
      setEditValue(todo.content);
      setIsEditing(false);
      return;
    }
    onUpdateContent(todo.id, editValue);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditValue(todo.content);
    setIsEditing(false);
  };

  return (
    <li className="flex items-center justify-between p-3 bg-gray-50 rounded">
      <div className="flex items-center flex-1">
        <input
          type="checkbox"
          checked={todo.isComplete}
          onChange={onToggleComplete}
          className="mr-3"
        />
        {isEditing ? (
          <input
            type="text"
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSave();
              } else if (e.key === "Escape") {
                handleCancel();
              }
            }}
            className="flex-1 px-2 py-1 border border-gray-300 rounded"
            autoFocus
          />
        ) : (
          <span
            className={`flex-1 cursor-pointer ${
              todo.isComplete ? "line-through text-gray-500" : "text-black"
            }`}
            onClick={handleEdit} // 텍스트 클릭 시 수정 모드 진입 (선택적 UX 개선)
          >
            {todo.content}
          </span>
        )}
      </div>
      <div className="flex gap-2">
        {isEditing ? (
          <>
            <button
              onClick={handleSave}
              className="bg-green-500 text-white px-3 py-1 rounded text-sm hover:bg-green-600"
            >
              저장
            </button>
            <button
              onClick={handleCancel}
              className="bg-gray-500 text-white px-3 py-1 rounded text-sm hover:bg-gray-600"
            >
              취소
            </button>
          </>
        ) : (
          <button
            onClick={handleEdit}
            className="bg-yellow-500 text-white px-3 py-1 rounded text-sm hover:bg-yellow-600"
          >
            수정
          </button>
        )}
        <button
          onClick={onDelete}
          className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600"
        >
          삭제
        </button>
      </div>
    </li>
  );
}

export default TodoItem;
