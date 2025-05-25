const BASE_URL = 'http://localhost:8080';

export async function getTodos() {
  try {
    const res = await fetch(`${BASE_URL}/todos`);
    if (!res.ok) {
      throw new Error(`getTodo 에러 발생: ${res.status} / ${res.statusText}`);
    }
    const data = await res.json();
    console.log('getTodos 성공', data);
    return data;
  } catch (error) {
    console.error(error);
  }
}

export async function postTodo(content) {
  try {
    const res = await fetch(`${BASE_URL}/todos`, {
      method: 'POST',
      body: JSON.stringify({ content }),
      headers: { 'Content-Type': 'application/json' },
    });
    if (!res.ok) {
      throw new Error(`postTodo 에러 발생: ${res.status} / ${res.statusText}`);
    }
    const data = await res.json();
    console.log('postTodo 성공', data);
    return data;
  } catch (error) {
    console.error(error);
  }
}

export async function putTodo(id, content) {
  try {
    const res = await fetch(`${BASE_URL}/todos/contents/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ content }),
      headers: { 'Content-Type': 'application/json' },
    });
    if (!res.ok) {
      throw new Error(`putTodo 에러 발생: ${res.status} / ${res.statusText}`);
    }
    const data = await res.json();
    console.log('putTodo 성공', data);
    return data;
  } catch (error) {
    console.error(error);
  }
}

export async function patchTodo(id, isComplete) {
  try {
    const res = await fetch(`${BASE_URL}/todos/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ isComplete }),
      headers: { 'Content-Type': 'application/json' },
    });
    if (!res.ok) {
      throw new Error(`patchTodo 에러 발생: ${res.status} / ${res.statusText}`);
    }
    const data = await res.json();
    console.log('patchTodo 성공', data);
    return data;
  } catch (error) {
    console.error(error);
  }
}

export async function deleteTodo(id) {
  try {
    const res = await fetch(`${BASE_URL}/todos/${id}`, {
      method: 'DELETE',
    });
    if (!res.ok) {
      throw new Error(`deleteTodo 에러 발생: ${res.status} / ${res.statusText}`);
    }
    const data = await res.json();
    console.log('deleteTodo 성공', data);
    return data;
  } catch (error) {
    console.error(error);
  }
}
