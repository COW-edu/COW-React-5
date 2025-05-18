import { useState } from 'react'

export default function TodoInput({setTodos}) {
  const [input, setInput] = useState("");

  const addTodo = () => {
    if (input.trim() === "") return;
    const newTodo = {
      id: Date.now(),
      text: input,
      checked: false
    }
    setTodos((prev) => [...prev, newTodo]);
    setInput("");
  };

  return(
    <div className='flex justify-center'>
      <input
        className="w-52 py-2 px-4 mr-4 rounded-lg border-2 border-blue-500"
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter'){
            addTodo();
          }
        }}
        placeholder="할 일을 입력하세요"
      />
      <button className="w-16 py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-700" onClick={addTodo}>추가</button>
    </div>
  )
}