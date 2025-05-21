import axios from 'axios';
import { useState } from 'react'

export default function TodoInput({setTodos, url}) {
  const [input, setInput] = useState("");
  
  const postTodo = async () => {
    if (input.trim() === "") return;
    const res = await axios.post(`${url}`, {
      content: input,
      isComplete: false
    })
    setTodos((prev) => [...prev, res.data]);
    setInput("");
  }

  return(
    <div className='flex justify-center'>
      <input
        className="w-80 py-2 px-4 rounded-tl-xl rounded-bl-xl border-2 border-blue-500"
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter'){
            postTodo();
          }
        }}
        placeholder="할 일을 입력하세요"
      />
      <button className="w-16 py-2 px-4 bg-blue-500 text-white rounded-tr-xl rounded-br-xl hover:bg-blue-700" onClick={postTodo}>추가</button>
    </div>
  )
}