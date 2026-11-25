const BASE_URL = "https://jsonplaceholder.typicode.com";

// Função base: centraliza URL, headers e tratamento de erro HTTP.
async function request(path, options = {}) {
  const headers = options.body
    ? { "Content-Type": "application/json; charset=UTF-8" }
    : undefined;

  const response = await fetch(`${BASE_URL}${path}`, { ...options, headers });

  if (!response.ok) {
    throw new Error(`Falha na requisição (HTTP ${response.status})`);
  }
  return response.json();
}

export const getTodos = () => request("/todos");

export const getUsers = () => request("/users");

export const createTodo = (data) =>
  request("/todos", { method: "POST", body: JSON.stringify(data) });

export const updateTodo = (id, data) =>
  request(`/todos/${id}`, { method: "PATCH", body: JSON.stringify(data) });

export const deleteTodo = (id) => request(`/todos/${id}`, { method: "DELETE" });
