import React from "react";

function TodoInput({ inputValue, onInputChange, onAddTodo }) {
  return (
    <div className="mb-6">
      <div className="flex rounded shadow-sm">
        <input
          type="text"
          value={inputValue}
          onChange={onInputChange}
          className="flex-1 px-4 py-2 border border-gray-300 rounded-l"
          placeholder="할 일을 입력하세요"
        />
        <button
          onClick={onAddTodo}
          className="bg-blue-500 text-white px-4 py-2 rounded-r hover:bg-blue-600"
        >
          추가
        </button>
      </div>
    </div>
  );
}

export default TodoInput;
