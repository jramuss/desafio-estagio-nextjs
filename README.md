# TaskFlow

Aplicação web para gerenciamento de tarefas de uma equipe, feita com **Next.js (App Router)**, **React** e **JavaScript**, consumindo a API REST [JSONPlaceholder](https://jsonplaceholder.typicode.com/).

## Funcionalidades

- Listagem de tarefas com título, status e responsável (cruzando `todos.userId` com `users.id`)
- Pesquisa por título
- Filtro por status: todas, pendentes e concluídas
- Cadastro de tarefa (título + responsável) com validação (`POST /todos`)
- Alternar status entre pendente e concluída (`PATCH /todos/:id`)
- Exclusão de tarefa (`DELETE /todos/:id`)
- Estados de interface: carregando, erro (com botão "Tentar novamente") e lista vazia
- Paginação simples (10 por página) — funcionalidade opcional
- Layout responsivo (desktop e celular) e foco visível nos controles

## Como executar

Pré-requisito: Node.js 18.18 ou superior.

```bash
npm install
npm run dev
```

Abra http://localhost:3000.

Para gerar a versão de produção:

```bash
npm run build
npm start
```

## Estrutura

```
app/                  # App Router: layout, página e CSS global
components/           # Componentes reutilizáveis (TaskBoard, TaskForm, TaskItem...)
lib/api.js            # Camada de acesso à API (fetch isolado)
store/tasks-context.js# Estado global (Context API + useReducer)
postman/              # Coleção Postman exportada
```

## Decisões técnicas

- **App Router:** `app/page.js` é um Server Component simples; só os componentes que precisam de estado e eventos usam `"use client"`.
- **fetch nativo:** dispensa dependência extra. Todas as chamadas ficam em `lib/api.js`, com tratamento de status HTTP em um único lugar.
- **Estado com Context + useReducer:** o app tem poucas ações bem definidas (carregar, adicionar, alterar status, remover), então o reducer deixa as transições explícitas sem precisar de biblioteca externa.
- **Filtros derivados:** pesquisa e filtro de status são calculados a partir da lista (`useMemo`), sem duplicar estado.
- **CSS puro:** um único `globals.css` com variáveis CSS e *media query* para telas pequenas.

## Sobre a persistência (JSONPlaceholder)

A API **simula** `POST`, `PATCH` e `DELETE`: responde com sucesso, mas não grava nada. Por isso a interface mantém as alterações em estado local durante a sessão (ao atualizar a página, os dados voltam ao original — conforme o enunciado).

Dois cuidados decorrentes disso:

1. O `POST` sempre devolve `id: 201`. Para evitar ids repetidos ao cadastrar várias tarefas, a aplicação gera um id local único.
2. Tarefas criadas localmente não existem na API; por isso `PATCH` e `DELETE` nelas só alteram o estado local (chamar a API retornaria erro).

Nas tarefas vindas da API, a alteração de status e a exclusão são **otimistas**: a tela muda na hora e a mudança é desfeita, com mensagem de erro, se a requisição falhar.

## Postman

A coleção está em `postman/taskflow.postman_collection.json`, com as seis requisições do desafio (GET /todos, GET /todos/1, GET /users, POST /todos, PATCH /todos/1, DELETE /todos/1) e testes simples de status e corpo. Para usar: *Import* no Postman e execute a coleção.

## Dificuldades e pendências


> Preencha com suas palavras antes de abrir o Pull Request.

- Dificuldades encontradas: entender o funcionamento do código e conseguir explicá-lo com as minhas palavras, principalmente o estado global com Context e useReducer e o fato de a JSONPlaceholder apenas simular as gravações.
- 
- Funcionalidades pendentes: testes automatizados, persistência das tarefas no navegador (localStorage) e deploy.
