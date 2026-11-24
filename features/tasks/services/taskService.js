const BASE_URL =
  process.env.NEXT_PUBLIC_TASKFLOW_API_URL || 'https://jsonplaceholder.typicode.com';

// Técnico: centraliza todas as chamadas REST e transforma respostas HTTP em erros utilizáveis.
// Humano: daqui o restante da aplicação não precisa saber como a internet ou o JSONPlaceholder funcionam.
async function request(endpoint, options = {}) {
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      ...options.headers,
    },
    ...options,
  });

  // Técnico: o fetch não rejeita respostas HTTP de erro, por isso status não-2xx é validado manualmente.
  // Humano: assim uma falha como 404 vira uma mensagem clara em vez de parecer que deu certo.
  if (!response.ok) {
    throw new Error(`Erro na requisição (${response.status}): ${response.statusText}`);
  }

  // Técnico: DELETE pode responder sem corpo; nesse caso não tenta fazer parse de JSON inexistente.
  // Humano: evita quebrar a aplicação em respostas vazias, comuns em exclusões.
  if (response.status === 204) {
    return null;
  }

  return response.json();
}

// Técnico: API orientada a operações que encapsula os métodos HTTP usados pelas telas.
// Humano: funciona como uma caixa de ferramentas específica para tarefas e usuários.
export const taskService = {
  async getTasks(limit = 20) {
    return request(`/todos?_limit=${limit}`);
  },

  async getUsers() {
    return request('/users');
  },

  async createTask(payload) {
    return request('/todos', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  },

  async updateTask(id, payload) {
    return request(`/todos/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(payload),
    });
  },

  async deleteTask(id) {
    return request(`/todos/${id}`, {
      method: 'DELETE',
    });
  },
};
