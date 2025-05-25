import axios from 'axios';

const BASE_URL = 'http://localhost:8080';

export const getTodos = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/todos`);
    console.log('getTodo 성공', res.data);
    return res.data;
  } catch (error) {
    console.error(error.response.status);
    console.error(error.response.data);
  }
};

export const postTodo = async (content) => {
  try {
    const res = await axios.post(`${BASE_URL}/todos`, { content });
    console.log('postTodo 성공', res.data);
    return res.data;
  } catch (error) {
    console.error(error.response.status);
    console.error(error.response.data);
  }
};

export const putTodo = async (id, content) => {
  try {
    const res = await axios.put(`${BASE_URL}/todos/contents/${id}`, { content });
    console.log('putTodo 성공', res.data);
    return res.data;
  } catch (error) {
    console.error(error.response.status);
    console.error(error.response.data);
  }
};

export const patchTodo = async (id, isComplete) => {
  try {
    const res = await axios.put(`${BASE_URL}/todos/${id}`, { isComplete });
    console.log('patchTodo 성공', res.data);
    return res.data;
  } catch (error) {
    console.error(error);
  }
};

export const deleteTodo = async (id) => {
  try {
    const res = await axios.delete(`${BASE_URL}/todos/${id}`);
    console.log('deleteTodo 성공', res.data);
    return res.data;
  } catch (error) {
    console.error(error);
  }
};
