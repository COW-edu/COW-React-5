import axios from "axios";
import { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPen, faXmark, faCheck } from "@fortawesome/free-solid-svg-icons";

export default function TodoList({url, todo, setTodos}) {
  const [isEdit, setIsEdit] = useState(false);
  const [updateTodo, setUpdateTodo] = useState(todo.content);

  const deleteTodo = async (id) => {
    await axios.delete(`${url}/${id}`);
    setTodos(todos => todos.filter((todo) => todo.id !== id));
  }
  
  const completeTodo = async (id) => {
    await axios.put(`${url}/${id}`, {
      content: todo.content,
      isComplete: !todo.isComplete
    })

    setTodos(prev =>
      prev.map(todo =>
        todo.id === id ? {...todo, isComplete: !todo.isComplete} : todo
      )
    )
  }

  const contentUpdateTodo = async (id) => {
    if (todo.content != updateTodo) {
      await axios.put(`${url}/contents/${id}`, {
        content: updateTodo,
        isComplete: todo.isComplete
      })
  
      setTodos(prev =>
        prev.map(todo =>
          todo.id === id ? {...todo, content: updateTodo} : todo
        )
      )
    }

    cancleEdit(); 
  }

  const isChecked = () => {
    completeTodo(todo.id);
  }
  
  const editTodo = () => {
    setIsEdit(true);
  }

  const cancleEdit = () => {
    setIsEdit(false);
  }
  
  const trueButton = "rounded-lg py-2 px-4 bg-red-300 hover:bg-red-500 hover:text-white";
  const falseButton = "rounded-lg py-2 px-4 bg-gray-300 hover:bg-gray-500 hover:text-white";
  const liStyle = "rounded-xl px-4 py-4 flex justify-between items-center mb-4"

  return (
    <li className={todo.isComplete ? `${liStyle} bg-red-100` : `${liStyle} bg-gray-100`}>
      {isEdit ? <></>
      : <input type="checkbox" onChange={isChecked} checked={todo.isComplete}/>}

      {isEdit ? (
        <input
          className="rounded-lg px-4 py-2 w-60"
          type="text"
          value={updateTodo}
          onChange={(e) => setUpdateTodo(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              contentUpdateTodo(todo.id);
            }
          }}
        />
      ) : todo.isComplete ? (
        <del>{todo.content}</del>
      ) : (
        <>{todo.content}</>
      )
      }

      <div>
        <button 
          className={
            todo.isComplete === true
              ? trueButton + " mr-2"
              : falseButton + " mr-2"
          } onClick={() => {
            if (isEdit) {
              cancleEdit();
            } else {
              editTodo();
            }
          }}
        >
          {isEdit ? <FontAwesomeIcon icon={faXmark} />
          : <FontAwesomeIcon icon={faPen} />}
        </button>
        <button 
          className={todo.isComplete === true? trueButton : falseButton} 
          onClick={() => {
            if (isEdit) {
              contentUpdateTodo(todo.id);
            } else {
              deleteTodo(todo.id);
            }
          }}
        >
          {isEdit ? <FontAwesomeIcon icon={faCheck} />
          : <FontAwesomeIcon icon={faTrash} />}
        </button>
      </div>
    </li>
  )
}