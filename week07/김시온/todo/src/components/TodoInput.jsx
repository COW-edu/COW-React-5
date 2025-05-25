function TodoInput({ content, setContent, addTodo }) {
  return (
    <div id='inputBlock' className='flex'>
      <input
        className='p-2.5 mr-1.5 border-none border-r-[5px] bg-[#2e2e2e] rounded-[5px] text-white'
        autoFocus
        id='listInput'
        value={content}
        onChange={(e) => setContent(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            addTodo();
          }
        }}
      />
      <button className='hover:outline hover:outline-2   hover:outline-white px-5 py-2.5 bg-black text-white border-none rounded-[5px] cursor-pointer' id='addBtn' onClick={addTodo}>
        추가
      </button>
    </div>
  );
}

export default TodoInput;
