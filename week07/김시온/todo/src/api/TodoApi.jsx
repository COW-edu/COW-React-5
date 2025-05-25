import axios from 'axios';

const BASE_URL = 'http://localhost:8080';

export const getTodos = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/todos`);
    console.log('getTodos 성공', res.data);
    return res.data;
  } catch (err) {
    console.error('getTodos 실패:', err.response?.data || err.message);
  }
};

export const postTodos = async (newTodo) => {
  try {
    const res = await axios.post(`${BASE_URL}/todos`, { content: newTodo, isComplete: false });
    console.log('postTodos 성공:', res.data);
    return res.data;
  } catch (err) {
    console.error('postTodos 실패:', err.response?.data || err.message);
  }
};

export const putIsComplete = async (id) => {
  try {
    const res = await axios.put(`${BASE_URL}/todos/${id}`);
    console.log('putIsComplete 성공:', res.data);
    return res.data;
  } catch (err) {
    console.error('putIsComplete 실패:', err.response?.data || err.message);
  }
};

export const putContent = async (id, content) => {
  try {
    const res = await axios.put(`${BASE_URL}/todos/contents/${id}`, { content: content });
    console.log('putContent 성공:', res.data);
    return res.data;
  } catch (err) {
    console.error('putContent 실패:', err.response?.data || err.message);
  }
};

export const deleteTodo = async (id) => {
  try {
    const res = await axios.delete(`${BASE_URL}/todos/${id}`);
    console.log('deleteTodoAPI 성공:', res.data);
  } catch (err) {
    console.error('deleteTodoAPI 실패:', err.response?.data || err.message);
  }
};
