import { useState, useEffect } from "react";
import "./App.css";
import "tailwindcss/tailwind.css";
import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";

const API_BASE_URL = "http://localhost:8080/todos";

async function apiCall(url, options = {}) {
  const defaultHeaders = {
    "Content-Type": "application/json",
    Accept: "application/json",
  };

  const mergedOptions = {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
  };

  try {
    const response = await fetch(url, mergedOptions);

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `HTTP error! status: ${response.status}, message: ${errorText}`
      );
    }

    const text = await response.text();
    // 응답 본문이 비어있는 경우 처리 (DELETE 같은 요청은 응답 본문이 없을 수 있음)
    return text ? JSON.parse(text) : null; // null 또는 빈 객체 {} 등으로 바꿔도 됨
  } catch (error) {
    console.error("API 호출 중 에러 발생:", error);
    throw error; // 에러를 다시 던져서 호출한 쪽에서 처리하게 함
  }
}

function App() {
  const [inputValue, setInputValue] = useState("");
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const data = await apiCall(API_BASE_URL);
      setTodos(data);
    } catch (error) {
      console.error("Failed to fetch todos:", error);
      setTodos([]);
    }
  };

  const changeTodoInput = (e) => {
    setInputValue(e.target.value);
  };

  const addTodo = async () => {
    if (inputValue.trim() === "") return;

    try {
      const data = await apiCall(API_BASE_URL, {
        method: "POST",
        body: JSON.stringify({
          content: inputValue,
          isComplete: false,
        }),
      });
      setTodos([...todos, data]);
      setInputValue("");
    } catch (error) {
      console.error("Failed to add todo:", error);
      const newTodo = {
        id: Date.now(),
        content: inputValue,
        isComplete: false,
      };
      setTodos([...todos, newTodo]);
      setInputValue("");
    }
  };

  const deleteTodo = async (id) => {
    try {
      await apiCall(`${API_BASE_URL}/${id}`, { method: "DELETE" });
      setTodos(todos.filter((todo) => todo.id !== id));
    } catch (error) {
      console.error("Failed to delete todo:", error);
      setTodos(todos.filter((todo) => todo.id !== id));
    }
  };

  const toggleComplete = async (id) => {
    try {
      const data = await apiCall(`${API_BASE_URL}/${id}`, { method: "PUT" });
      setTodos(todos.map((todo) => (todo.id === id ? data : todo)));
    } catch (error) {
      console.error("Failed to toggle todo:", error);
      setTodos(
        todos.map((todo) =>
          todo.id === id ? { ...todo, isComplete: !todo.isComplete } : todo
        )
      );
    }
  };

  const updateContent = async (id, newContent) => {
    try {
      const data = await apiCall(`${API_BASE_URL}/contents/${id}`, {
        method: "PUT",
        body: JSON.stringify({ content: newContent }),
      });
      setTodos(todos.map((todo) => (todo.id === id ? data : todo)));
    } catch (error) {
      console.error("Failed to update todo content:", error);
      setTodos(
        todos.map((todo) =>
          todo.id === id ? { ...todo, content: newContent } : todo
        )
      );
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 mt-8 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold text-center mb-6 text-blue-600">
        할 일 목록
      </h1>
      <TodoInput
        inputValue={inputValue}
        onInputChange={changeTodoInput}
        onAddTodo={addTodo}
      />
      <TodoList
        todos={todos}
        onDeleteTodo={deleteTodo}
        onToggleComplete={toggleComplete}
        onUpdateContent={updateContent}
      />
    </div>
  );
}

export default App;
